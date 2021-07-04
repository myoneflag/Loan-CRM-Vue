<template>
  <div v-if="customerInfo !== null">
    <b-overlay
      id="overlay-background"
      :show="saveSpinner"
      opacity="0.6"
      variant="transparent"
      blur="2px"
      rounded="sm"
      style="background-color: #161d31 !important;"
    >
      <b-row>
        <b-col lg="8">
          <b-card no-body class="pt-2 px-2" style="min-height: 149px;">
            <b-row no-gutters>
              <!--
                Customer's profile
                * Avatar
                * Name
                * Acount ID
                * Status
              -->
              <b-col md="5">
                <b-media no-body class="mb-2">
                  <b-media-aside
                    class="mr-1"
                  >
                    <label for="fileInput">
                      <input type="file" hidden id="fileInput" @change="fileChange" accept="image/*"/>
                      <b-avatar
                        :src="imgFile ? imgFile : customerInfo.photoURL"
                        size="5.5rem"
                      />
                    </label>
                  </b-media-aside>
                  <b-media-body class="my-auto">
                    <b-card-text  class="font-small-4 font-weight-bolder mb-0">
                      {{ customerInfo.basicInfo.fullName || '' }}
                    </b-card-text >
                    <b-card-text class="font-small-3 mb-50">
                      {{ customerInfo.basicInfo.accountNumber }}
                    </b-card-text>
                    <b-dropdown
                      v-if="customerInfo.status"
                      :text="$t(statusItems.find(d => d.key === customerInfo.status).name)"
                      :variant="`flat-${statusItems.find(d => d.key === customerInfo.status).type}`"
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      size="sm"
                      style="width: 100px;"
                    >
                      <b-dropdown-item
                        v-for="item in statusItems" :key="item.key"
                        :active="item.key === customerInfo.status"
                        @click="changeStatus(item.key)"
                      >
                        {{ $t(item.name) }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-media-body>
                </b-media>
              </b-col>

              <!--
                Customer's payment summary
                * Total Received
                * Total Penalty
                * Total Notes
                * Loan Amount
                * Next Payment(15 days)
                * Next Payment Amount
              -->
              <b-col md="7">
                <b-row>
                  <b-col cols="3" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.totalReceived }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ $t('Total Received') }}
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.totalPenalty }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ $t('Total Penalty') }}
                    </b-card-text>
                  </b-col>
                  <b-col cols="5" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.promissory.amount + ' (' + $t(financeSummary.promissory.note) + ')' }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ $t('Total Notes') }}
                    </b-card-text>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="3" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.loanAmount }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ $t('Loan Amount') }}
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.nextPayment.date }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ `${$t('Next payment')}（${financeSummary.nextPayment.days}days）` }}
                    </b-card-text>
                  </b-col>
                  <b-col cols="5" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.nextPayment.amount }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ $t('Next payment amount') }}
                    </b-card-text>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <!--
          Lending History
        -->
        <b-col lg="4">
          <b-card style="height: 149px;">
            <b-card-text  class="font-weight-bolder mb-50">
              {{ $t('Lending history') }}
            </b-card-text >
            <div class="font-small-3 overflow-auto pr-1" style="height: 80px;">
              <history-list
                :data="historyList"
              />
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-card>
            <div class="d-flex">

              <!--
                Botton group
                Return a key emitted from a button clicked
              -->
              <loan-button-group
                :buttons="groupButtons"
                :activeKey="activeInfoBtnGroup"
                variant='primary'
                @activeKey="setActiveInfoBtnGroup"
              />

              <!--
                Dropdown menu - Actions for a customer
                * Edit // Edit a customer's note (Modal view)
                * Delete // Delete a current customer from db (Modal confirm)
                * Show only if active button is transaction
              -->
              <div
                class="flex-grow-1 text-right"
                v-show="activeInfoBtnGroup === 'transaction'"
              >
                <b-dropdown
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  toggle-class="px-0 py-50 bg-transparent"
                  variant="flat-dark"
                  no-caret
                  right
                >
                  <template
                    v-slot:button-content
                  >
                    <feather-icon
                      id="customer-action"
                      icon="MoreVerticalIcon"
                      size="18"
                      class="cursor-pointer"
                    />
                  </template>
                  <b-dropdown-item
                    v-b-modal.customer-add-loan-modal
                  >
                    {{ $t('Add loan') }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-b-modal.customer-interest-rate-modal
                  >
                    {{ $t('Interest rate') }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-b-modal.customer-delete-modal
                  >
                    {{ $t('Delete') }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>

            <!--
              Component for a Section selected by group button
              Transaction, Basic Info, Family Info, Guarantor, Credit-related, Debt-related
              * is: A section component
              * items: The fields diplayed in each section (type: object)
              * validations: Array of the validation(key, validate) for each field in a section selected
              * validateAction: Boolean value to indicate either a section will be validates or not
              * editDisabled: Boolean value to inticate either a section is editable or not
              * change: Function called whenever each field is changed in a section
            -->
            <component
              :is="groupButtons.find(d => d.key === activeInfoBtnGroup).component"
              :items="customerInfo[activeInfoBtnGroup]"
              :validations="validations"
              :validateAction="validateAction"
              :editDisabled="editDisabled"
              @change="changeValue"
              @changeArray="changeArray"
            />

            <!--
              Edit or Save, Cancel buttons of a section selected
              * Edit // Active editable status
              * Save // Save the changes of the currect section
              * Cancel // Return to disable the active status of the current section
              Hide for a Transaction section
            -->
            <div v-show="activeInfoBtnGroup !== 'transaction'">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                @click="editActionClick"
              >
                {{ !editDisabled ? $t('Save') : $t('Edit') }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-dark"
                @click="cancelActionClick"
              >
                {{ $t('Cancel') }}
              </b-button>
            </div>

          </b-card>
        </b-col>
      </b-row>

      <!--------------------- Customer add loan Modal --------------------->
      <b-modal
        id="customer-add-loan-modal"
        :title="$t('Add loan')"
        :hide-header-close="true"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :ok-title="$t('Save')"
        :cancel-title="$t('Cancel')"
        cancel-variant="outline-primary"
        footer-class="justify-content-end flex-row-reverse"
        centered
      >
        <b-form-group
          :label="$t('Loan Start Date')"
          label-for="loan-start-date"
        >
          <b-form-datepicker
            id="loan-start-date"
            v-model="addLoan.startDate"
            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit', }"
          />
        </b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-group
              :label="$t('Loan Amount')"
              label-for="loan-amount"
            >
              <b-form-input
                id="loan-amount"
                :placeholder="$t('Loan Amount')"
                v-model="addLoan.amount"
              />
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              :label="$t('Payment Duration')"
              label-for="payment-duration"
            >
              <b-dropdown
                id="payment-duration"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="addLoan.durations.values.find(d => d === addLoan.duration).toString() + ' ' + $t(addLoan.durations.unit)"
                variant="outline-primary"
                class="w-100 mb-1 full-width-dropdown"
              >
                <b-dropdown-item
                  v-for="duration in addLoan.durations.values"
                  :key="duration"
                  @click="addLoan.duration = duration"
                >
                  {{ duration.toString() + ' ' + $t(addLoan.durations.unit) }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group
          label="Note"
          label-for="note-edit"
        >
          <b-form-textarea
            id="note-edit"
            rows="4"
            placeholder="Content"
          />
        </b-form-group>
      </b-modal>

      <!--------------------- Customer interest rate Modal --------------------->
      <b-modal
        id="customer-interest-rate-modal"
        :title="$t('Interest rate')"
        :hide-header-close="true"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :ok-title="$t('Save')"
        :cancel-title="$t('Cancel')"
        cancel-variant="outline-primary"
        footer-class="justify-content-end flex-row-reverse"
        centered
      >
        <b-form-group
          :label="$t('Interest rate')"
          label-for="interest-rate"
        >
          <b-dropdown
            id="interest-rate"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :text="rates.find(d => d === rate).toString() + '%'"
            variant="outline-primary"
            class="w-100 full-width-dropdown"
          >
            <b-dropdown-item
              v-for="item in rates"
              :key="item"
              @click="rate = item"
            >
              {{ item.toString() + '%' }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-modal>

      <!--------------------- Customer delete Modal --------------------->
      <b-modal
        id="customer-delete-modal"
        :hide-header-close="true"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :ok-title="$t('Yes, delete it!')"
        :cancel-title="$t('Cancel')"
        footer-class="justify-content-center flex-row-reverse"
        body-class="text-center"
        cancel-variant="outline-danger"
        size="md"
        hide-header
        centered
        @ok="deleteCustomer"
      >
        <div class="d-flex justify-content-center py-1">
          <feather-icon
            icon="AlertCircleIcon"
            size="80"
            style="color: #FF9F43;"
          />
        </div>
        <h4 class="px-2 mb-2">Are you sure to delete this customer?</h4>
        <h6 class="text-muted">
          You won’t be able to revert this!
        </h6>
      </b-modal>

    </b-overlay>
  </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import {
  BCard, BRow, BCol, BMedia, BMediaAside, BMediaBody, BAvatar, BCardText, BDropdown, BDropdownItem, BButton, BOverlay, BModal, VBModal, BFormGroup, BFormTextarea, BFormDatepicker, BFormInput,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import HistoryList from './components/HistoryList.vue'
import LoanButtonGroup from './components/elements/LoanButtonGroup.vue'
import TransactionInfo from './components/TransactionInfo.vue'
import BasicInfo from './components/customer-steps/BasicInfo.vue'
import FamilyInfo from './components/customer-steps/FamilyInfo.vue'
import Guarantor from './components/customer-steps/Guarantor.vue'
import CreditRelated from './components/customer-steps/CreditRelated.vue'
import DebtRelated from './components/customer-steps/DebtRelated.vue'

const validationKeys = ['basicInfo', 'familyInfo', 'guarantorInfo', 'creditInfo', 'debtInfo']

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    BCardText,
    BDropdown,
    BDropdownItem,
    BButton,
    BOverlay,
    BModal,
    BFormGroup,
    BFormTextarea,
    BFormInput,
    BFormDatepicker,

    HistoryList,
    LoanButtonGroup,
    BasicInfo,
    FamilyInfo,
    Guarantor,
    CreditRelated,
    DebtRelated,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      customerInfo: null, // Customer's all information

      customerId: '', // Customer's id

      /**
        Collection of the cusotmer's finance statistic information included
        'total received', 'total penalty', 'promissory', 'loan amount', 'next payment infomation', 'currency'
      */
      financeSummary: {
        totalReceived: 3000,
        totalPenalty: 2000,
        promissory: {
          amount: 35500,
          note: 'Kept',
        },
        loanAmount: 50000,
        nextPayment: {
          date: '2021/06/11',
          days: 15,
          amount: 5000,
        },
        currency: '$',
      },

      /** processing, observed, closed, bad_debt */
      statusItems: [
        {
          key: 'processing',
          name: 'Processing',
          type: 'primary',
        },
        {
          key: 'observed',
          name: 'Observed',
          type: 'warning',
        },
        {
          key: 'closed',
          name: 'Closed',
          type: 'success',
        },
        {
          key: 'bad_debt',
          name: 'Bad debt',
          type: 'danger',
        },
        {
          key: 'active',
          name: 'Active',
          type: 'info',
        },
        {
          key: 'inactive',
          name: 'Inactive',
          type: 'secondary',
        },
      ],

      /**
        Lending history Array
        - each element has the properties of date, amount, currency, type(color variant)
      */
      historyList: [
        {
          date: '2020/04/30',
          amount: 15000,
          currency: '$',
          type: 'danger',
        },
        {
          date: '2020/05/05',
          amount: 5000,
          currency: '$',
          type: 'warning',
        },
        {
          date: '2020/05/10',
          amount: 15000,
          currency: '$',
          type: 'success',
        },
        {
          date: '2020/05/12',
          amount: 15000,
          currency: '$',
          type: 'primary',
        },
        {
          date: '2020/04/30',
          amount: 15000,
          currency: '$',
          type: 'danger',
        },
        {
          date: '2020/05/05',
          amount: 5000,
          currency: '$',
          type: 'warning',
        },
        {
          date: '2020/05/10',
          amount: 15000,
          currency: '$',
          type: 'success',
        },
        {
          date: '2020/05/12',
          amount: 15000,
          currency: '$',
          type: 'primary',
        },
      ],

      /**
        Array of the buttons to category the customer information
        - transaction, basic, family, guarantor, credit, debt -
        This button group has the radio feature
      */
      groupButtons: [
        {
          key: 'transaction',
          name: 'Transactions',
          component: TransactionInfo,
        },
        {
          key: 'basicInfo',
          name: 'Basic info',
          component: BasicInfo,
        },
        {
          key: 'familyInfo',
          name: 'Family info',
          component: FamilyInfo,
        },
        {
          key: 'guarantorInfo',
          name: 'Guarantor',
          component: Guarantor,
        },
        {
          key: 'creditInfo',
          name: 'Credit-related',
          component: CreditRelated,
        },
        {
          key: 'debtInfo',
          name: 'Debt-related',
          component: DebtRelated,
        },
      ],

      /** Array of all the VALIDATIONS for all the fields in a category in customer information */
      validations: [],

      customerInfoNoRequiredFields: store.state.app.customerInfoNoRequiredFields,

      /** Key of a button activated(clicked) */
      activeInfoBtnGroup: 'transaction',
      actionSectionKey: '',

      /** Variable to indicate if all the field controls in a current category would show/hide the validation property when 'Save' button will be clicked */
      validateAction: false,

      /** Variable to indicate if all the field controls in a current category would be edit disabled/enabled the validation property when 'Edit' button will be clicked */
      editDisabled: true,

      imgFile: null, // Avatar image

      saveSpinner: false, // Ovrelay and Spinner durring access to db

      /**
       Add loan data
       * Loan start date
       * Loan amount
       * Payment duration
       * note
      */
      addLoan: {
        startDate: moment().toDate(),
        amount: 0,
        duration: 15,
        durations: {
          values: [15, 30, 45],
          unit: 'days',
        },
        note: '',
      },
      rates: [10, 15, 20, 25, 30, 35, 40],
      rate: 15,
    }
  },
  watch: {
    getCustomerInfo(newVal) {
      this.$set(this, 'customerInfo', { ...newVal })

      /** Set State (validations) from customerInfo for a validation of each field */
      if (validationKeys.includes(this.activeInfoBtnGroup)) {
        let validations = []
        const stepInfo = newVal[this.activeInfoBtnGroup]
        switch (Array.isArray(stepInfo)) {
          case false:
            Object.keys(stepInfo).forEach(itemKey => {
              if (this.customerInfoNoRequiredFields[this.activeInfoBtnGroup].indexOf(itemKey) === -1) {
                validations.push({
                  key: itemKey,
                  validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '',
                })
              }
            })
            break
          case true:
            validations = stepInfo.map((item, index) => Object.keys(item).map(itemKey => ({
              key: itemKey,
              validate: stepInfo[index][itemKey] !== '',
            })))
            break
          default:
        }
        this.$set(this, 'validations', validations)
        /* this.$set(this, 'validations', Object.keys(newVal[this.activeInfoBtnGroup]).map(itemKey => ({
          key: itemKey,
          validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '' && this.customerInfoNoRequiredFields[this.activeInfoBtnGroup].indexOf(itemKey) === -1,
        }))) */
      }

      if (this.actionSectionKey !== '') {
        this.$set(this, 'activeInfoBtnGroup', this.actionSectionKey)
        this.$set(this, 'actionSectionKey', '')
      }
    },

    activeInfoBtnGroup(newValue) { // When each button is clicked
      if (validationKeys.includes(newValue)) {
        let validations = []
        const stepInfo = this.customerInfo[newValue]
        switch (Array.isArray(stepInfo)) {
          case false:
            Object.keys(stepInfo).forEach(itemKey => {
              if (this.customerInfoNoRequiredFields[this.activeInfoBtnGroup].indexOf(itemKey) === -1) {
                validations.push({
                  key: itemKey,
                  validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '',
                })
              }
            })
            break
          case true:
            validations = stepInfo.map((item, index) => Object.keys(item).map(itemKey => ({
              key: itemKey,
              validate: stepInfo[index][itemKey] !== '',
            })))
            break
          default:
        }
        this.$set(this, 'validations', validations)
        /* this.$set(this, 'validations', Object.keys(this.customerInfo[newValue]).map(itemKey => ({
          key: itemKey,
          validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '' && this.customerInfoNoRequiredFields[this.activeInfoBtnGroup].indexOf(itemKey) === -1,
        }))) */
      }

      /**
        validateAction is false when a group button is clicked.
        This'll be updated when Save button is clicked.
      */
      this.$set(this, 'validateAction', false)

      /**
        editDisabled is false when a group button is clicked.
        This'll be updated as ture when a "Edit" button is clicked,
      */
      this.$set(this, 'editDisabled', true)
    },
  },

  created() {
    this.$set(this, 'customerId', this.$route.query.id)
    if (this.$route.query.section && this.$route.query.section !== '') {
      this.$set(this, 'actionSectionKey', this.$route.query.section)
    }
    store.dispatch('app/getCustomerWithIdFromDb', this.$route.query.id)

    /** Set State (customerInfo) from Store for the customerInfo  */
    // this.$set(this, 'customerInfo', { ...this.$store.state.app.customerInfo })

    const file = this.$store.state.app.avatarFile
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.$set(this, 'imgFile', reader.result)
      }
    }
  },
  mounted() {
    /** Set to show in Store for a Back button  */
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: true, backName: 'customers' })
  },
  beforeRouteLeave(to, from, next) {
    /** Set to hide in Store for a Back button  */
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: false, backName: 'customers' })
    next()
  },
  computed: {
    /**
      Call getter function(in store) to get a customer
    */
    ...mapGetters({
      getCustomerInfo: 'app/getCustomerInfo',
    }),

    validate() { // Get a validation for all the fields of the current category
      const arr = []
      this.validations.forEach(d => {
        if (Array.isArray(d)) {
          d.forEach(p => arr.push(p.validate))
        } else {
          arr.push(d.validate)
        }
      })
      return !(arr.indexOf(false) > -1)
    },
  },
  methods: {
    /**
     When customer's status is changed (dropdown menu)
     */
    changeStatus(key) {
      this.$set(this, 'customerInfo', { // Update the state(customerInfo.profile.status) for status(observed, processing, closed, bad debt) of a customer
        ...this.customerInfo,
        status: key,
      })
      this.$set(this, 'saveSpinner', true)
      store.dispatch('app/updateCustomerWithIdFromDb', { id: this.customerInfo.id, update: { status: key } }).then(() => {
        this.$set(this, 'saveSpinner', false)
        this.$bvToast.toast('A status was updated successfully.', {
          title: 'Success',
          variant: 'success',
          solid: true,
          toaster: 'b-toaster-top-center',
        })
      })
    },

    /**
     Update group button key when any button is cliecked in button group
     */
    setActiveInfoBtnGroup(key) {
      this.$set(this, 'activeInfoBtnGroup', key)
    },

    changeValue(key, value, row) {
      let obj = null
      const stepInfo = this.customerInfo[this.activeInfoBtnGroup]
      switch (Array.isArray(stepInfo)) {
        case false:
          this.$set(this, 'customerInfo', { // Update the state for any field changed in the current category
            ...this.customerInfo,
            [this.activeInfoBtnGroup]: {
              ...this.customerInfo[this.activeInfoBtnGroup],
              [key]: value,
            },
          })
          if (value !== '') { // A validation of a field changed is true as that is Not empty
            this.validations.find(d => d.key === key).validate = true
          } else { // A validation of a field changed is false as that is empty
            this.validations.find(d => d.key === key).validate = false
          }
          break
        case true:
          obj = [...stepInfo]
          obj[row] = {
            ...obj[row],
            [key]: value,
          }
          this.$set(this, 'customerInfo', { // Update the state for any field changed in the current step
            ...this.customerInfo,
            [this.activeInfoBtnGroup]: [...obj],
          })
          if (value !== '') { // A validation of a field changed is true as that is Not empty
            this.validations[row].find(d => d.key === key.split('.')[0]).validate = true
          } else { // A validation of a field changed is false as that is empty
            this.validations[row].find(d => d.key === key.split('.')[0]).validate = false
          }
          break
        default:
      }
    },

    /**
     Change that array in the case stepInfo is array
     * index: item's index
     * action: add or remove
     */
    changeArray(index, action) {
      switch (action) {
        case 'add':
          this.$set(this, 'customerInfo', {
            ...this.customerInfo,
            [this.activeInfoBtnGroup]: [
              ...this.customerInfo[this.activeInfoBtnGroup],
              this.$store.state.app.blankCustomerInfo[this.activeInfoBtnGroup][0],
            ],
          })
          this.$set(this, 'validations', [
            ...this.validations,
            Object.keys(this.$store.state.app.blankCustomerInfo[this.activeInfoBtnGroup][0]).map(d => ({
              key: d,
              validate: false,
            })),
          ])
          break
        case 'remove':
          this.customerInfo[this.activeInfoBtnGroup].splice(index, 1)
          this.validations.splice(index, 1)
          this.$set(this, 'customerInfo', {
            ...this.customerInfo,
            [this.activeInfoBtnGroup]: [
              ...this.customerInfo[this.activeInfoBtnGroup],
            ],
          })
          this.$set(this, 'validations', [...this.validations])
          break
        default:
      }
    },

    /**
     When "Edit/Save" button is clicked
     */
    editActionClick() {
      if (this.editDisabled) { // When "Edit" button is clicked
        this.$set(this, 'validateAction', false)
        this.$set(this, 'editDisabled', false)
      } else if (this.validate) { // If a validation for all the fields is true When "Save" button is clicked
        this.$set(this, 'saveSpinner', true)
        const update = {
          [this.activeInfoBtnGroup]: this.customerInfo[this.activeInfoBtnGroup],
        }
        store.dispatch('app/updateCustomerWithIdFromDb', { id: this.customerInfo.id, update }).then(() => {
          this.$set(this, 'saveSpinner', false)
          this.$bvToast.toast('A customer was updated successfully.', {
            title: 'Success',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-top-center',
          })
        })
        this.$set(this, 'validateAction', false)
        this.$set(this, 'editDisabled', true)
      } else { // If a validation for all the fields is false When "Save" button is clicked
        this.$set(this, 'validateAction', true)
        this.$set(this, 'editDisabled', false)
      }
    },

    cancelActionClick() { // When "Cancel" button is clicked
      this.$set(this, 'validateAction', false)
      this.$set(this, 'editDisabled', true)
    },

    /**
     When avatar image is changed (avatar image)
     */
    fileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.$set(this, 'saveSpinner', true)
        store.dispatch('app/setAvatarFile', { file, save: true }).then(res => {
          this.$set(this, 'saveSpinner', false)
          if (res.status === 'success') {
            this.$bvToast.toast('Your profile image was updated successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-center',
            })
          } else {
            this.$bvToast.toast(res.error, {
              title: 'Failed',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-center',
            })
          }
        })
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.$set(this, 'imgFile', reader.result)
        }
      }
    },

    /**
     When "Yes, delete it!" button is clicked
     */
    deleteCustomer() {
      this.$set(this, 'saveSpinner', true)
      store.dispatch('app/deleteCustomer', this.customerInfo).then(res => {
        if (res.status === 'success') {
          this.$bvToast.toast('A customer was deleted successfully.', {
            title: 'Success',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-top-center',
          })
          this.$router.push({ name: 'customers' })
        } else {
          this.$bvToast.toast(res.error, {
            title: 'Failed',
            variant: 'danger',
            solid: true,
            toaster: 'b-toaster-top-center',
          })
        }
        this.$set(this, 'saveSpinner', false)
      })
    },
  },
}
</script>
