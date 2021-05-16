<template>
  <div>
    <b-row>
      <b-col sm="4">
        <!----------------- Total loan amount line chart card Start ---------------->
        <statistic-card-with-area-chart
          :statistic="statisticChartData.analyticsData.total"
          statistic-title="Total loan amount"
          :chart-data="statisticChartData.series"
        />
        <!----------------- Total loan amount line chart card End ---------------->
      </b-col>
      <b-col sm="8">
        <!----------------- Total member card Start ---------------->
        <card-statistics-group
          statistic-title="Total Member"
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
              Member list
            </b-card-text>
          </b-card-header>
          <b-row class="mb-1 px-2">
            <b-col md="2">
              <!-------------------------- Group filter Dropdwon Start --------------------------->
              <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="filterGroupItems.find(d => d.key === group).name"
                variant="outline-primary"
                class="w-100 mb-1 full-width-dropdown"
              >
                <b-dropdown-item
                  v-for="item in filterGroupItems"
                  :key="item.key"
                  @click="handleGroup(item.key)"
                >
                  {{ item.name }}
                </b-dropdown-item>
              </b-dropdown>
              <!-------------------------- Group filter Dropdwon End --------------------------->
            </b-col>
            <b-col md="2">
              <!-------------------------- Status filter Dropdwon Start -------------------------->
              <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="filterStatusItems.find(d => d.key === status).name"
                variant="outline-primary"
                class="w-100 mb-1 full-width-dropdown"
              >
                <b-dropdown-item
                  v-for="item in filterStatusItems"
                  :key="item.key"
                  @click="handleStatus(item.key)"
                >
                  {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}
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
                    placeholder="Search..."
                    class="mb-1"
                    style="min-width: 233px;"
                  />
                </b-form-group>
                <!-------------------------- Search box End -------------------------->
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
                <template #cell(status)="data">
                  <b-badge
                    v-if="statusItems.find(d => d.key === data.value)"
                    :variant="`light-${statusItems.find(d => d.key === data.value).color}`"
                    class="circle-rounded px-1 font-weight-normal mb-50"
                  >
                    {{ statusItems.find(d => d.key === data.value).name }}
                  </b-badge>
                </template>
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
                        to="customer"
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
                <template #cell(rate)="data">
                  {{ data.value + '%' }}
                </template>
                 <template #cell(totalLoan)="data">
                  {{ data.item.currency + data.value }}
                </template>
                <template #cell(action)="data">
                  <feather-icon
                    :id="`box-pop-menu-${data.item.id}`"
                    icon="MoreVerticalIcon"
                    size="18"
                    class="cursor-pointer"
                  />
                </template>
              </b-table>
            </b-col>
            <b-col cols="6">
              <b-card-text class="font-small-3 mb-0 ml-1">
                {{ perPage*(currentPage-1)+perPage > totalRows ?
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
  </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import {
  BRow, BCol, BCard, BCardHeader, BCardText, BDropdown, BDropdownItem, BFormGroup, BFormInput, BButton, BTable, BBadge, BMedia, BMediaAside, BMediaBody, BAvatar, BLink, BPagination,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import _ from 'lodash'
import StatisticCardWithAreaChart from './components/StatisticCardWithAreaChart.vue'
import CardStatisticsGroup from './components/CardStatisticsGroup.vue'
// import { db, firebase } from '../firebase'

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
    StatisticCardWithAreaChart,
    CardStatisticsGroup,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      customers: [],
      statisticChartData: {
        series: [
          {
            name: 'Revenue',
            data: [350, 275, 400, 300, 350, 300, 450],
          },
        ],
        analyticsData: {
          revenue: 97500,
        },
      },
      statisticsItems: [
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: 'Processing',
          value: 15,
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-danger',
          title: 'Bad Debt',
          value: 9,
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-warning',
          title: 'Observed',
          value: 41,
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: 'Closed',
          value: 11,
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
      ],
      customersTableInfo: {
        fields: [
          { key: 'status', label: 'Status' },
          { key: 'user', label: 'User', class: 'text-center' },
          { key: 'phone', label: 'Phone' },
          { key: 'rate', label: 'Interest Rate', class: 'text-right' },
          {
            key: 'nextPayment',
            label: 'Next Payment',
            sortable: true,
            class: 'text-center',
          },
          { key: 'duration', label: 'Duration', class: 'text-right' },
          {
            key: 'lendDate',
            label: 'Lend Date',
            sortable: true,
            class: 'text-center',
          },
          {
            key: 'totalLoan',
            label: 'Total Loan',
            sortable: true,
            class: 'text-right',
          },
          {
            key: 'promissoryNote',
            label: 'Promissory Note',
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
    }
  },
  computed: {
    ...mapGetters({
      getCustomers: 'app/getCustomers',
    }),
    filterStatusItems() {
      return [
        {
          key: 'all',
          name: 'All',
        },
        ...Object.keys(_.groupBy(_.filter(this.customers, customer => customer.status !== ''), 'status')).map(key => ({
          key,
          name: this.statusItems.find(d => d.key === key) ? this.statusItems.find(d => d.key === key).name : '',
        })),
      ]
    },
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
    getCustomers(newVal) {
      const filterCustomers = newVal.map(customer => {
        const row = {
          id: customer.cid,
          status: customer.status,
          group: customer.basic.group,
          user: {
            name: customer.basic.name,
            acountId: customer.basic.acountId,
            group: customer.basic.group,
            avatar: customer.avatar,
          },
          phone: customer.basic.cellPhoneNumber,
          rate: 0,
          nextPayment: 0,
          duration: 0,
          lendDate: '',
          totalLoan: 0,
          promissoryNote: '',
          currency: '$',
        }
        return row
      })
      this.$set(this, 'customers', filterCustomers)
      this.$set(this, 'totalRows', filterCustomers.length)
    },
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
  },
  created() {
    store.dispatch('app/getCustomersFromDb')
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
    handleStatus(key) {
      this.$set(this, 'status', key)
    },
    handleGroup(key) {
      this.$set(this, 'group', key)
    },
    handleAddCustomer() {
      this.$router.push({ name: 'customer-register' })
    },
  },
}
</script>
