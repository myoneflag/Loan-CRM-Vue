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
                      :text="statusItems.find(d => d.key === customerInfo.status).name"
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
                        {{ item.name }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-media-body>
                </b-media>
              </b-col>
              <b-col md="7">
                <b-row>
                  <b-col cols="3" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.totalReceived }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      Total Received
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.totalPenalty }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      Total Penalty
                    </b-card-text>
                  </b-col>
                  <b-col cols="5" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.promissory.amount + ' (' + financeSummary.promissory.note + ')' }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      Promissory Notes
                    </b-card-text>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="3" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.loanAmount }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      Loan Amount
                    </b-card-text>
                  </b-col>
                  <b-col cols="4" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.nextPayment.date }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      {{ `next payment（${financeSummary.nextPayment.days}days）` }}
                    </b-card-text>
                  </b-col>
                  <b-col cols="5" class="mb-2">
                    <b-card-text  class="font-small-4 font-weight-bolder line-height-2 mb-0">
                      {{ financeSummary.currency + financeSummary.nextPayment.amount }}
                    </b-card-text >
                    <b-card-text class="font-small-2 line-height-1 text-muted mb-0">
                      Next payment amount
                    </b-card-text>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col lg="4">
          <b-card style="height: 149px;">
            <b-card-text  class="font-weight-bolder mb-50">
              Lending history
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
              -->
              <div
                class="flex-grow-1 text-right"
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
                    v-b-modal.customer-note-edit-modal
                  >
                    Edit
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-b-modal.customer-delete-modal
                  >
                    Delete
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
                {{ !editDisabled ? 'Save' : 'Edit' }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-dark"
                @click="cancelActionClick"
              >
                Cancel
              </b-button>
            </div>

          </b-card>
        </b-col>
      </b-row>

      <!--------------------- Customer note edit Modal --------------------->
      <b-modal
        id="customer-note-edit-modal"
        title="Edit"
        ok-title="Save"
        cancel-title="Cancel"
        cancel-variant="outline-primary"
        footer-class="justify-content-end flex-row-reverse"
        centered
      >
        <b-form-group
          label="Note"
          label-for="note-edit"
        >
          <b-form-textarea
            id="note-edit"
            rows="6"
            placeholder="Content"
          />
        </b-form-group>
      </b-modal>

      <!--------------------- Customer delete Modal --------------------->
      <b-modal
        id="customer-delete-modal"
        ok-title="Yes, delete it!"
        cancel-title="cancel"
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
  BCard, BRow, BCol, BMedia, BMediaAside, BMediaBody, BAvatar, BCardText, BDropdown, BDropdownItem, BButton, BOverlay, BModal, VBModal, BFormGroup, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
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
          note: 'kept',
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
          key: 'none',
          name: 'None',
          type: 'secondary',
        },
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
          name: 'Transaction',
          component: TransactionInfo,
        },
        {
          key: 'basicInfo',
          name: 'Basic Info',
          component: BasicInfo,
        },
        {
          key: 'familyInfo',
          name: 'Family Info',
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

      /** Key of a button activated(clicked) */
      activeInfoBtnGroup: 'transaction',
      actionSectionKey: '',

      /** Variable to indicate if all the field controls in a current category would show/hide the validation property when 'Save' button will be clicked */
      validateAction: false,

      /** Variable to indicate if all the field controls in a current category would be edit disabled/enabled the validation property when 'Edit' button will be clicked */
      editDisabled: true,

      imgFile: null, // Avatar image

      saveSpinner: false, // Ovrelay and Spinner durring access to db
    }
  },
  watch: {
    getCustomerInfo(newVal) {
      this.$set(this, 'customerInfo', { ...newVal })

      /** Set State (validations) from customerInfo for a validation of each field */
      if (validationKeys.includes(this.activeInfoBtnGroup)) {
        this.$set(this, 'validations', Object.keys(newVal[this.activeInfoBtnGroup]).map(itemKey => ({
          key: itemKey,
          validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '',
        })))
      }

      if (this.actionSectionKey !== '') {
        this.$set(this, 'activeInfoBtnGroup', this.actionSectionKey)
        this.$set(this, 'actionSectionKey', '')
      }
    },

    activeInfoBtnGroup(newValue) { // When each button is clicked
      if (validationKeys.includes(newValue)) {
        this.$set(this, 'validations', Object.keys(this.customerInfo[newValue]).map(itemKey => ({
          key: itemKey,
          validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '',
        })))
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
      return !(this.validations.map(d => d.validate).indexOf(false) > -1)
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

    changeValue(key, value) {
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
