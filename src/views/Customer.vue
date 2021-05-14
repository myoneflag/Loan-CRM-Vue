<template>
  <div>
    <b-row>
      <b-col lg="8">
        <b-card no-body class="pt-2 px-2" style="min-height: 149px;">
          <b-row no-gutters>
            <b-col md="5">
              <b-media no-body class="mb-2">
                <b-media-aside
                  class="mr-1"
                >
                  <b-avatar
                    :src="require('@/assets/images/portrait/small/avatar-s-2.jpg')"
                    size="5.5rem"
                  />
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text  class="font-small-4 font-weight-bolder mb-0">
                    {{ customerInfo.profile.name }}
                  </b-card-text >
                  <b-card-text class="font-small-3 mb-50">
                    {{ customerInfo.profile.email }}
                  </b-card-text>
                  <b-dropdown
                    :text="statusItems.find(d => d.key === customerInfo.profile.status).name"
                    :variant="`flat-${statusItems.find(d => d.key === customerInfo.profile.status).type}`"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    size="sm"
                    style="width: 100px;"
                  >
                    <b-dropdown-item
                      v-for="item in statusItems" :key="item.key"
                      :active="item.key === customerInfo.profile.status"
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
            <loan-button-group
              :buttons="groupButtons"
              variant='primary'
              @activeKey="setActiveInfoBtnGroup"
            />
            <div class="flex-grow-1 text-right">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                size="sm"
                class="btn-icon mb-1"
              >
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="18"
                  class="cursor-pointer"
                />
              </b-button>
            </div>
          </div>
          <component
            :is="groupButtons.find(d => d.key === activeInfoBtnGroup).component"
            :items="customerInfo[activeInfoBtnGroup]"
            :validations="validations"
            :validateAction="validateAction"
            :editDisabled="editDisabled"
            @change="changeValue"
          />
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
  </div>
</template>
<script>
import store from '@/store'
import {
  BCard, BRow, BCol, BMedia, BMediaAside, BMediaBody, BAvatar, BCardText, BDropdown, BDropdownItem, BButton,
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
    HistoryList,
    BButton,
    LoanButtonGroup,
    BasicInfo,
    FamilyInfo,
    Guarantor,
    CreditRelated,
    DebtRelated,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      customerInfo: Object,
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
      ],
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
      groupButtons: [
        {
          key: 'transaction',
          name: 'Transaction',
          component: TransactionInfo,
        },
        {
          key: 'basic',
          name: 'Basic Info',
          component: BasicInfo,
        },
        {
          key: 'family',
          name: 'Family Info',
          component: FamilyInfo,
        },
        {
          key: 'guarantor',
          name: 'Guarantor',
          component: Guarantor,
        },
        {
          key: 'credit',
          name: 'Credit-related',
          component: CreditRelated,
        },
        {
          key: 'debt',
          name: 'Debt-related',
          component: DebtRelated,
        },
      ],
      validations: [],
      activeInfoBtnGroup: 'transaction',
      validateAction: false,
      editDisabled: true,
    }
  },
  watch: {
    activeInfoBtnGroup(newValue) {
      this.$set(this, 'validations', Object.keys(this.customerInfo[newValue]).map(itemKey => ({
        key: itemKey,
        validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '',
      })))
      this.$set(this, 'validateAction', false)
      this.$set(this, 'editDisabled', true)
    },
  },
  created() {
    this.$set(this, 'customerInfo', { ...this.$store.state.app.customerInfo })
    this.$set(this, 'validations', Object.keys(this.customerInfo[this.activeInfoBtnGroup]).map(itemKey => ({
      key: itemKey,
      validate: this.customerInfo[this.activeInfoBtnGroup][itemKey] !== '',
    })))
  },
  mounted() {
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: true, backName: 'customers' })
  },
  beforeRouteLeave(to, from, next) {
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: false, backName: 'customers' })
    next()
  },
  computed: {
    validate() {
      return !(this.validations.map(d => d.validate).indexOf(false) > -1)
    },
  },
  methods: {
    changeStatus(key) {
      this.$set(this, 'customerInfo', {
        ...this.customerInfo,
        profile: {
          ...this.customerInfo.profile,
          status: key,
        },
      })
    },
    setActiveInfoBtnGroup(key) {
      this.$set(this, 'activeInfoBtnGroup', key)
    },
    changeValue(key, value) {
      this.$set(this, 'customerInfo', {
        ...this.customerInfo,
        [this.activeInfoBtnGroup]: {
          ...this.customerInfo[this.activeInfoBtnGroup],
          [key]: value,
        },
      })
      if (value !== '') {
        this.validations.find(d => d.key === key).validate = true
      } else {
        this.validations.find(d => d.key === key).validate = false
      }
    },
    editActionClick() {
      if (this.editDisabled) {
        this.$set(this, 'validateAction', false)
        this.$set(this, 'editDisabled', false)
      } else if (this.validate) {
        this.$set(this, 'validateAction', false)
        this.$set(this, 'editDisabled', true)
      } else {
        this.$set(this, 'validateAction', true)
        this.$set(this, 'editDisabled', false)
      }
    },
    cancelActionClick() {
      this.$set(this, 'validateAction', false)
      this.$set(this, 'editDisabled', true)
    },
  },
}
</script>
