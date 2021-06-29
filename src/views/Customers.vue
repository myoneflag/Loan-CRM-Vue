<template>
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
      <b-col sm="4">
        <!----------------- Total loan amount line chart card Start ---------------->
        <statistic-card-with-area-chart
          :statistic-title="$t('Total loan amount')"
          :chart-data="statisticChartData.series"
        />
        <!----------------- Total loan amount line chart card End ---------------->
      </b-col>
      <b-col sm="8">
        <!----------------- Total member card Start ---------------->
        <card-statistics-group
          :statistic-title="$t('Total members')"
          :statisticsItems="statisticsItems"
        />
        <!----------------- Total member card End ---------------->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card no-body>
          <b-card-header>
            <b-card-text class="font-weight-bolder mb-0">
              {{ $t('Member list') }}
            </b-card-text>
          </b-card-header>
          <b-row class="mb-1 px-2">
            <b-col md="2">
              <!-------------------------- Group filter Dropdwon Start --------------------------->
              <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="$t(filterGroupItems.find(d => d.key === group).name)"
                variant="outline-primary"
                class="w-100 mb-1 full-width-dropdown"
              >
                <b-dropdown-item
                  v-for="item in filterGroupItems"
                  :key="item.key"
                  @click="handleGroup(item.key)"
                >
                  {{ $t(item.name) }}
                </b-dropdown-item>
              </b-dropdown>
              <!-------------------------- Group filter Dropdwon End --------------------------->
            </b-col>
            <b-col md="2">
              <!-------------------------- Status filter Dropdwon Start -------------------------->
              <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="$t(filterStatusItems.find(d => d.key === status).name)"
                variant="outline-primary"
                class="w-100 mb-1 full-width-dropdown"
              >
                <b-dropdown-item
                  v-for="item in filterStatusItems"
                  :key="item.key"
                  @click="handleStatus(item.key)"
                >
                  {{ $t(item.name.charAt(0).toUpperCase() + item.name.slice(1)) }}
                </b-dropdown-item>
              </b-dropdown>
              <!-------------------------- Status filter Dropdwon End -------------------------->
            </b-col>
            <b-col md="4" offset-md="4">
              <div class="demo-inline-spacing float-right">
                <!-------------------------- Search box Start -------------------------->
                <b-form-group class="m-0">
                  <b-form-input
                    id="search_input"
                    :placeholder="$t('Search') + '...'"
                    class="mb-1"
                    style="min-width: 233px;"
                  />
                </b-form-group>
                <!-------------------------- Search box End -------------------------->

                <!--
                  Button to add a customer
                -->
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="btn-icon m-0 mb-1 ml-1"
                  v-b-modal.modal-add
                  @click="handleAddCustomer"
                >
                  <feather-icon icon="PlusIcon" />
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table
                id="all-table"
                responsive
                :items="filteredRows"
                :fields="customersTableInfo.fields"
                :per-page="perPage"
                :current-page="currentPage"
                table-class="custom-table"
              >
                <!------------------- Status column ----------------->
                <template #cell(status)="data">
                  <b-badge
                    v-if="statusItems.find(d => d.key === data.value)"
                    :variant="`light-${statusItems.find(d => d.key === data.value).color}`"
                    class="circle-rounded px-1 font-weight-normal mb-50"
                  >
                    {{ $t(statusItems.find(d => d.key === data.value).name) }}
                  </b-badge>
                </template>
                <!------------------- User column ------------------->
                <template #cell(user)="data">
                  <b-media no-body style="width: 130px;">
                    <b-media-aside
                      class="mr-1"
                    >
                      <b-avatar
                        :src="data.value.avatar"
                      />
                    </b-media-aside>
                    <b-media-body class="my-auto text-left">
                      <b-link
                        :to="{ path: 'customer', query: { id: data.item.id } }"
                      >
                        <h6 class="font-weight-bolder mb-0 text-primary">
                          {{ data.value.name }}
                        </h6>
                      </b-link>
                      <b-card-text class="font-small-3 mb-0">
                        {{ data.value.acountId }}
                      </b-card-text>
                    </b-media-body>
                  </b-media>
                </template>
                <!------------------- Rate column ------------------->
                <template #cell(rate)="data">
                  {{ data.value + '%' }}
                </template>
                <!------------------- TotalLoan column -------------->
                 <template #cell(totalLoan)="data">
                  {{ data.item.currency + data.value }}
                </template>
                <!------------------- Action column ----------------->
                <template #cell(action)="data">
                  <b-dropdown
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    toggle-class="px-0 py-50 bg-transparent"
                    variant="flat-dark"
                    no-caret
                    right
                    @show="customerSelectHandle(data.item.id)"
                  >
                    <template
                      v-slot:button-content
                    >
                      <feather-icon
                        :id="`box-pop-menu-${data.item.id}`"
                        icon="MoreVerticalIcon"
                        size="18"
                        class="cursor-pointer"
                      />
                    </template>
                    <b-dropdown-item
                      v-b-modal.customer-payment-edit-modal
                    >
                      {{ $t('Payment') }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-b-modal.customer-loan-edit-modal
                    >
                      {{ $t('Loan') }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="editClickHandle(data.item.id)"
                    >
                      {{ $t('Edit') }}
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
                <template #head()="data">
                  <div style="min-width: 30px;">
                    {{ $t(data.label) }}
                  </div>
                </template>
              </b-table>
            </b-col>
            <b-col cols="6">
              <b-card-text class="font-small-3 mb-0 ml-1">
                {{ totalRows === 0 ? `Showing 0 - ${totalRows} of ${totalRows} entries` :
                  perPage*(currentPage-1)+perPage > totalRows ?
                  `Showing ${perPage*(currentPage-1)+1} - ${totalRows} of ${totalRows} entries` :
                  `Showing ${perPage*(currentPage-1)+1} - ${perPage*(currentPage-1)+perPage} of ${totalRows} entries`
                }}
              </b-card-text>
            </b-col>
            <b-col cols="6">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="right"
                size="sm"
                class="mt-0 mb-1 mr-1"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!--
      Modal to edit the payment of each customer in the customer table
    -->
    <b-modal
      id="customer-payment-edit-modal"
      title="Lending"
      ok-title="Save"
      cancel-title="cancel"
      cancel-variant="outline-primary"
      footer-class="justify-content-end flex-row-reverse"
      centered
    >
      <b-form-group
        label="Date"
        label-for="lending-datepicker"
      >
        <b-form-datepicker
          id="lending-datepicker"
          class="mb-1"
        />
      </b-form-group>
      <b-form-group
        label="Amount"
        label-for="lending-amount"
      >
        <b-input-group
          id="lending-amount"
          prepend="$"
          append=".00"
          class="input-group-merge"
        >
          <b-form-input placeholder="Amount" />
        </b-input-group>
      </b-form-group>
    </b-modal>

    <!--
      Modal to edit the loan of each customer in the customer table
    -->
    <b-modal
      id="customer-loan-edit-modal"
      title="Loan"
      ok-title="Save"
      cancel-title="cancel"
      cancel-variant="outline-primary"
      footer-class="justify-content-end flex-row-reverse"
      centered
      @ok="loanEditHandle"
    >
      <b-form-group
        label="Date"
        label-for="loan-datepicker"
      >
        <b-form-datepicker
          id="loan-datepicker"
          class="mb-1"
          @input="onChangeLoanDate"
        />
      </b-form-group>
      <b-form-group
        label="Amount"
        label-for="loan-amount"
      >
        <b-input-group
          id="loan-amount"
          prepend="$"
          append=".00"
          class="input-group-merge"
        >
          <b-form-input
            placeholder="Amount"
            @change="onChangeLoanAmount"
          />
        </b-input-group>
      </b-form-group>
    </b-modal>

  </b-overlay>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import {
  BRow, BCol, BCard, BCardHeader, BCardText, BDropdown, BDropdownItem, BFormGroup, BInputGroup, BFormInput, BButton, BTable, BBadge, BMedia, BMediaAside, BMediaBody, BAvatar, BLink, BPagination, BModal, VBModal, BFormDatepicker, BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import _ from 'lodash'
import StatisticCardWithAreaChart from './components/StatisticCardWithAreaChart.vue'
import CardStatisticsGroup from './components/CardStatisticsGroup.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardText,
    BDropdown,
    BDropdownItem,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BButton,
    BTable,
    BBadge,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    BLink,
    BPagination,
    BModal,
    BFormDatepicker,
    BOverlay,
    StatisticCardWithAreaChart,
    CardStatisticsGroup,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      customers: [],
      statisticChartData: {
        series: [
          {
            name: 'Revenue',
            data: [],
          },
        ],
        analyticsData: {
          total: 0,
        },
      },
      statisticsItems: [
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: 'Processing',
          value: 0,
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-danger',
          title: 'Bad Debt',
          value: 0,
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-warning',
          title: 'Observed',
          value: 0,
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: 'Closed',
          value: 0,
          customClass: '',
        },
      ],
      groupItems: [
        {
          key: 'all',
          name: 'All',
        },
        {
          key: 'group1',
          name: 'Group 1',
        },
        {
          key: 'group2',
          name: 'Group 2',
        },
        {
          key: 'group3',
          name: 'Group 3',
        },
      ],
      statusItems: [
        {
          key: 'processing',
          name: 'Processing',
          color: 'primary',
          icon: 'TrendingUpIcon',
        },
        {
          key: 'observed',
          name: 'Observed',
          color: 'warning',
          icon: 'BoxIcon',
        },
        {
          key: 'closed',
          name: 'Closed',
          color: 'success',
          icon: 'DollarSignIcon',
        },
        {
          key: 'bad_debt',
          name: 'Bad debt',
          color: 'danger',
          icon: 'UserIcon',
        },
        {
          key: 'active',
          name: 'Active',
          color: 'info',
          icon: 'UserIcon',
        },
        {
          key: 'inactive',
          name: 'Inactive',
          color: 'secondary',
        },
      ],
      customersTableInfo: {
        fields: [
          { key: 'status', label: 'Status' },
          { key: 'user', label: 'User', class: 'text-center' },
          { key: 'phone', label: 'Phone', class: 'text-center' },
          { key: 'rate', label: 'Interest rate', class: 'text-right' },
          {
            key: 'nextPayment',
            label: 'Next payment',
            sortable: true,
            class: 'text-center',
          },
          { key: 'duration', label: 'Duration', class: 'text-right' },
          {
            key: 'lendDate',
            label: 'Lend date',
            sortable: true,
            class: 'text-center',
          },
          {
            key: 'totalLoan',
            label: 'Total loan',
            sortable: true,
            class: 'text-right',
          },
          {
            key: 'promissoryNote',
            label: 'Promissory note',
            class: 'text-center',
          },
          {
            key: 'action',
            label: 'Action',
            class: 'text-center',
          },
        ],
        items: [
          {
            id: '0',
            status: 'closed',
            user: {
              id: 'uuid001',
              name: 'Loan',
              uid: 'admin',
              category: 'admin',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            phone: '0930234565',
            rate: 10,
            nextPayment: '2020/03/06 12:20',
            duration: '365',
            lendDate: '2019/03/10 09:23',
            totalLoan: 10000000,
            promissoryNote: '$300000(stay)',
            currency: '$',
          },
          {
            id: '1',
            status: 'observed',
            user: {
              id: 'uuid002',
              name: 'Loan',
              uid: 'admin',
              category: 'admin',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            phone: '0930234565',
            rate: 10,
            nextPayment: '2020/03/06 12:20',
            duration: '365',
            lendDate: '2019/03/10 09:23',
            totalLoan: 10000000,
            promissoryNote: '$300000(stay)',
            currency: '$',
          },
          {
            id: '2',
            status: 'processing',
            user: {
              id: 'uuid003',
              name: 'Loan',
              uid: 'admin',
              category: 'admin',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            phone: '0930234565',
            rate: 10,
            nextPayment: '2020/03/06 12:20',
            duration: '365',
            lendDate: '2019/03/10 09:23',
            totalLoan: 10000000,
            promissoryNote: '$300000(stay)',
            currency: '$',
          },
          {
            id: '3',
            status: 'bad_debt',
            user: {
              id: 'uuid004',
              name: 'Loan',
              uid: 'admin',
              category: 'admin',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            phone: '0930234565',
            rate: 10,
            nextPayment: '2020/03/06 12:20',
            duration: '365',
            lendDate: '2019/03/10 09:23',
            totalLoan: 10000000,
            promissoryNote: '$300000(stay)',
            currency: '$',
          },
        ],
      },
      group: 'all',
      status: 'all',
      perPage: 8,
      pageOptions: [3, 5, 10],
      totalRows: 0,
      currentPage: 1,
      customerIdHandled: '',
      customerLoan: {
        date: '',
        amount: 0,
      },
      saveSpinner: false,
    }
  },
  computed: {
    /**
      Call getter function(in store) to get customers
    */
    ...mapGetters({
      getCustomers: 'app/getCustomers',
    }),

    /**
      Get items(Status dropdown) to filter by status from customer's array
     */
    filterStatusItems() {
      return [
        {
          key: 'all',
          name: 'All',
        },
        ...Object.keys(_.groupBy(_.filter(this.customers, customer => customer.status !== 'none'), 'status')).map(key => ({
          key,
          name: this.statusItems.find(d => d.key === key) ? this.statusItems.find(d => d.key === key).name : '',
        })),
      ]
    },

    /**
      Get items(Group dropdown) to filter by group from customer's array
     */
    filterGroupItems() {
      return [
        {
          key: 'all',
          name: 'All',
        },
        ...Object.keys(_.groupBy(this.customers, 'group')).map(key => ({
          key,
          name: key.charAt(0).toUpperCase() + key.slice(1),
        })),
      ]
    },

    /**
      Filter customers table by status and group chosen
     */
    filteredRows() {
      let filtered = []
      if (this.group !== 'all' && this.status !== 'all') {
        filtered = _.filter(this.customers, { group: this.group, status: this.status })
      } else if (this.group === 'all' && this.status !== 'all') {
        filtered = _.filter(this.customers, { status: this.status })
      } else if (this.group !== 'all' && this.status === 'all') {
        filtered = _.filter(this.customers, { group: this.group })
      } else {
        filtered = [...this.customers]
      }
      return filtered
    },
  },
  watch: {
    /**
     * Map each customer's fields from db to the schema in vuex store when the customers array in store is changed
     * Calculate the customers counts
     */
    getCustomers(newVal) {
      const filterCustomers = _.sortBy(newVal, ['updatedAt']).reverse().map(customer => {
        const row = {
          id: customer.id,
          status: customer.status,
          group: customer.basicInfo.group,
          user: {
            name: customer.basicInfo.fullName,
            acountId: customer.basicInfo.accountNumber,
            group: customer.basicInfo.group,
            avatar: customer.photoURL,
          },
          phone: customer.basicInfo.cellPhoneNumber,
          rate: customer.loan.interestRate,
          nextPayment: 0,
          duration: customer.loan.paymentDuration,
          lendDate: '',
          loanDate: customer.loan.loanDateTime,
          totalLoan: customer.loan.principal,
          promissoryNote: '',
          currency: '$',
        }
        return row
      })
      this.$set(this, 'customers', filterCustomers)
    },

    /**
     Calculate Total loan amount(line chart) and Total member's statistic when the customers array in state is changed
     */
    customers(newVal) {
      const groupByStatus = _.groupBy(newVal, 'status')
      const summaryStatus = this.statusItems.map(item => ({
        icon: item.icon,
        color: `light-${item.color}`,
        title: item.name,
        value: groupByStatus[item.key] ? groupByStatus[item.key].length : 0,
        customClass: 'mb-2 mb-xl-0',
      }))
      this.$set(this, 'statisticsItems', summaryStatus)
      this.$set(this, 'statisticChartData', {
        series: [{
          name: 'Loan amount',
          data: newVal.map(d => d.totalLoan),
        }],
        analyticsData: {
          total: newVal.map(d => d.totalLoan).reduce((a, b) => a.totalLoan + b.totalLoan) || 0,
        },
      })
      // console.log(newVal)
    },

    /**
     * Set the row counts of the table whenever table is filtered by the group and status
     */
    filteredRows(newVal) {
      this.$set(this, 'totalRows', newVal.length)
    },
  },
  created() {
    /**
     Dispatch a getCustomersFromDb() Function in the vuex store to get customers by authenticated user's id from db
     */
    store.dispatch('app/getCustomersFromDb')

    /**
     * Dispatch function that is called manually currently
     * This will be process automatically later
     */
    /* store.dispatch('app/addStore').then(res => {
      console.log(res)
    }) */
  },
  mounted() {
    /* Get Collection Arrray (Realtime) */
    // let customers = []
    // const data = await firebase.db.collection('customers')
    // data.onSnapshot(snapshot => {
    //   customers = snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
    //   console.log('all customers', customers)
    // })

    // /* Get Document by id (Realtime) */
    // let customer
    // const data2 = await firebase.db.collection('customers').doc('NHUxK2w7zttZk1ynFaCw')
    // data2.onSnapshot(snapshot => {
    //   customer = snapshot.data()
    //   console.log('one customer by id', customer)
    // })

    // /* Get Collection Documents Array (Not realtime) */
    // await db.getAllDocs({
    //   collectionName: 'customers',
    // })
    // /* Get a Document (Not realtime) */
    // await db.getOneDoc({
    //   collectionName: 'customers',
    //   id: 'NHUxK2w7zttZk1ynFaCw',
    // })

    // /* Update a Document by id */
    // await db.updateOneDoc({
    //   collectionName: 'customers',
    //   id: 'NHUxK2w7zttZk1ynFaCw',
    //   accountNumber: 1,
    //   'bankInfo.bank_account': 'ABC',
    // })

    // /* Set (Update or Create if not exist id) a Document */
    // await db.setOneDoc({
    //   collectionName: 'customers',
    //   id: 'findOrCreateNewId',
    //   accountNumber: 1,
    //   'bankInfo.bank_account': 'ABC',
    // })

    // /* Create a new Document with auto id */
    // await db.addOneDoc({
    //   collectionName: 'customers',
    //   accountNumber: 1,
    //   'bankInfo.bank_account': 'ABC',
    // })

    // /* Delete docuemnt by id */
    // await db.deleteOneDoc({
    //   collectionName: 'customers',
    //   id: 'findOrCreateNewId',
    // })
  },
  methods: {
    /**
     Trigger when a status filter(dropdown menu) is changed
     */
    handleStatus(key) {
      this.$set(this, 'status', key)
    },

    /**
     Trigger when a group filter(dropdown menu) is changed
     */
    handleGroup(key) {
      this.$set(this, 'group', key)
    },

    /**
     Trigger when a button to add customer is clicked
     */
    handleAddCustomer() {
      this.$router.push({ name: 'customer-register' })
    },

    editClickHandle(customerId) {
      this.$router.push({
        path: 'customer',
        query: {
          id: customerId,
          section: 'basicInfo',
        },
      })
    },

    onChangeLoanDate(e) {
      this.customerLoan.date = e
    },

    onChangeLoanAmount(e) {
      this.customerLoan.amount = e
    },

    /**
     Update loan of a customer in table
     */
    loanEditHandle() {
      const rawCustomer = store.state.app.customers.find(d => d.id === this.customerIdHandled)
      this.$set(this, 'saveSpinner', true)
      store.dispatch('app/updateCustomerWithIdFromDb', {
        id: this.customerIdHandled,
        update: {
          loan: {
            ...rawCustomer.loan,
            loanDateTime: this.customerLoan.date,
            principal: rawCustomer.loan.principal + parseInt(this.customerLoan.amount, 10),
          },
        },
      }).then(res => {
        if (res.status === 'success') {
          this.$bvToast.toast(`A loan of a customer-${rawCustomer.basicInfo.fullName} was updated successfully.`, {
            title: 'Success',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-top-center',
          })
        } else {
          this.$bvToast.toast(`Failed. ${res.error}`, {
            title: 'Failed',
            variant: 'danger',
            solid: true,
            toaster: 'b-toaster-top-center',
          })
        }
        this.$set(this, 'saveSpinner', false)
      })
    },

    customerSelectHandle(cid) {
      this.$set(this, 'customerIdHandled', cid)
    },
  },
}
</script>
