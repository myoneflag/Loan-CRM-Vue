<template>
  <div>
    <b-card
      no-body
      class="px-2 pt-2"
    >
      <b-row no-gutters>
        <!--
          Daterange-picker
        -->
        <b-col sm="4" class="mb-2 pr-1">
          <b-form-datepicker
          />
        </b-col>

        <!--
          Dropdown of feature
        -->
        <b-col sm="2" class="mb-2 pr-1">
          <b-dropdown
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-secondary"
            class="full-width-dropdown w-100"
            :text="$t(featureItems.find(d => d.key === feature).name)"
          >
            <b-dropdown-item
              v-for="item in featureItems"
              :key="item.key"
              @click="handleFeatures(item.key)"
            >
              {{ $t(item.name.charAt(0).toUpperCase() + item.name.slice(1)) }}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>

        <b-col sm="6" class="d-flex flex-row flex-wrap">
          <!--
            Search input
          -->
          <div class="mb-2 flex-grow-1">
            <b-form-input
              id="search_input"
              :placeholder="$t('Search') + '...'"
            />
          </div>

          <!--
            Button to add a transaction
          -->
          <div class="mb-2 pl-1 d-flex flex-row justify-content-center" >
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-secondary"
              class="text-light mr-1"
            >
              <feather-icon
                icon="DownloadIcon"
                class="mr-50"
                size="16"
              />
              <span class="align-middle">{{ $t('Download') }}</span>
            </b-button>

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="btn-icon"
              v-b-modal.add-Expenses-modal
            >
              <feather-icon icon="PlusIcon" />
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-row>
      <!--
        Revenue Line chart
      -->
      <b-col sm="8">
        <b-card no-body>
          <b-card-header>
            <b-card-title>{{ $t('Revenue') }}</b-card-title>
          </b-card-header>

          <b-card-body class="pb-0">
            <div class="d-flex justify-content-start mb-1">
              <div class="mr-2">
                <b-card-text class="mb-50">
                  {{ $t('This month') }}
                </b-card-text>
                <h3 class="font-weight-bolder">
                  <sup class="font-medium-1">$ </sup>
                  <span class="text-primary">{{ revenue.thisMonth }}</span>
                </h3>
              </div>
              <div>
                <b-card-text class="mb-50">
                  {{ $t('Last month') }}
                </b-card-text>
                <h3 class="font-weight-bolder">
                  <sup class="font-medium-1">$ </sup>
                  <span>{{ revenue.lastMonth }}</span>
                </h3>
              </div>
            </div>

            <!-- apex chart -->
            <vue-apex-charts
              type="line"
              height="210"
              :options="revenueComparisonLine.chartOptions"
              :series="revenueComparisonLine.series"
            />
          </b-card-body>
        </b-card>
      </b-col>

      <b-col sm="4">
        <b-card
          no-body
          class="p-2"
        >
          <vue-apex-charts
            height="120"
            :options="incomePieChartOptions"
            :series="incomeValues.map(d => d.value)"
          />
        </b-card>
        <b-row>
          <b-col sm="6">
            <money-view
              :value="59000"
              title="Expenses"
              variant="danger"
              icon="DollarSignIcon"
            />
          </b-col>
          <b-col sm="6">
            <money-view
              :value="706000"
              title="Revenue"
              variant="primary"
              icon="TrendingUpIcon"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-card no-body class="overflow-hidden">
      <b-table
        id="transactions-table"
        responsive
        striped
        hover
        :items="transactionTableItems"
        :fields="transactionTableFields"
        :per-page="perPage"
        :current-page="currentPage"
        table-class="custom-table"
      >
        <template #cell(status)="data">
          {{ data.value.charAt(0).toUpperCase() + data.value.slice(1) }}
        </template>
        <template #cell(customer)="data">
          <b-card-text class="m-0">
            {{ data.value.accountId }}
          </b-card-text>
          <h6 class="font-weight-bolder mb-0 text-primary">
            {{ data.value.name }}
          </h6>
        </template>
        <template #cell(user)="data">
          <b-avatar
            :src="data.value.photoURL"
          />
        </template>
        <template #head()="data">
          <div style="min-width: 30px;">
            {{ $t(data.label) }}
          </div>
        </template>
      </b-table>
      <b-row>
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

    <!--
      Modal to add Expenses
    -->
    <b-modal
      id="add-Expenses-modal"
      title="Expenses"
      ok-title="Add"
      cancel-title="Cancel"
      cancel-variant="outline-primary"
      footer-class="justify-content-end flex-row-reverse"
      centered
    >
      <b-form-group
        :label="$t('Title')"
        label-for="Expenses-title"
      >
        <b-form-input
          id="Expenses-title"
          :placeholder="$t('Title')"
        />
      </b-form-group>
      <b-form-group
        :label="$t('Date')"
        label-for="Expenses-date"
      >
        <b-form-datepicker
          id="Expenses-date"
        />
      </b-form-group>
      <b-form-group
        :label="$t('Amount')"
        label-for="Expenses-amount"
      >
        <b-input-group
          id="Expenses-amount"
          prepend="$"
          append=".00"
          class="input-group-merge"
        >
          <b-form-input :placeholder="$t('Amount')" />
        </b-input-group>
      </b-form-group>
    </b-modal>

  </div>
</template>
<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BCardText, BFormDatepicker, BDropdown, BDropdownItem, BFormInput, BButton, BRow, BCol, BTable, BPagination, BAvatar, BModal, VBModal, BInputGroup, BFormGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import MoneyView from './components/MoneyView.vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BCardText,
    BFormDatepicker,
    BDropdown,
    BDropdownItem,
    BFormInput,
    BButton,
    BRow,
    BCol,
    BTable,
    BPagination,
    BAvatar,
    BModal,
    BInputGroup,
    BFormGroup,

    VueApexCharts,

    MoneyView,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      featureItems: [
        {
          key: 'all',
          name: 'All',
        },
        {
          key: 'revenue',
          name: 'Revenue',
        },
        {
          key: 'expense',
          name: 'Expense',
        },
      ],
      revenueComparisonLine: {
        series: [
          {
            name: 'This Month',
            data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600],
          },
          {
            name: 'Last Month',
            data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000],
          },
        ],
        chartOptions: {
          chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            type: 'line',
            offsetX: -10,
          },
          stroke: {
            curve: 'smooth',
            dashArray: [0, 12],
            width: [3, 2],
          },
          legend: {
            show: false,
          },
          colors: ['#d0ccff', '#ebe9f1'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              inverseColors: false,
              gradientToColors: [$themeColors.primary, '#ebe9f1'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          markers: {
            size: 0,
            hover: {
              size: 5,
            },
          },
          xaxis: {
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '0.8rem',
              },
            },
            axisTicks: {
              show: false,
            },
            categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
            axisBorder: {
              show: false,
            },
            tickPlacement: 'on',
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '0.8rem',
              },
              formatter(val) {
                return val > 999 ? `${(val / 1000).toFixed(0)}k` : val
              },
            },
          },
          grid: {
            borderColor: '#e7eef7',
            padding: {
              top: -20,
              bottom: -10,
              left: 20,
            },
          },
          tooltip: {
            x: { show: false },
          },
        },
      },
      revenue: {
        lastMonth: '73,683',
        thisMonth: '86,589',
      },
      incomeValues: [
        {
          name: 'interest',
          value: 66500,
        },
        {
          name: 'penalty',
          value: 9500,
        },
        {
          name: 'allowance',
          value: 5000,
        },
      ],
      transactionTableFields: [
        {
          key: 'date',
          label: 'Date',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'amount',
          label: 'Amount',
          sortable: true,
          class: 'text-right',
        },
        {
          key: 'customer',
          label: 'Customers',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'user',
          label: 'User',
          class: 'text-center',
        },
      ],
      transactionTableItems: [
        {
          id: '001',
          date: '2021/03/21',
          status: 'income',
          description: 'Interest income',
          amount: 5000,
          customer: {
            id: '001',
            accountId: 'SHKVUNZSVZ08',
            name: 'YangYang',
          },
          user: {
            id: '001',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/beesummer.appspot.com/o/avatarImages%2FSwjtsUnz3TAwVb5WBLV0.png?alt=media&token=37cca3cb-3d92-4081-bd63-03daa0616e99',
          },
        },
        {
          id: '002',
          date: '2021/03/21',
          status: 'income',
          description: 'Interest income',
          amount: 5000,
          customer: {
            id: '002',
            accountId: 'SHKVUNZSVZ08',
            name: 'YangYang',
          },
          user: {
            id: '002',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/beesummer.appspot.com/o/avatarImages%2FSwjtsUnz3TAwVb5WBLV0.png?alt=media&token=37cca3cb-3d92-4081-bd63-03daa0616e99',
          },
        },
      ],
      totalRows: 0,
      perPage: 8,
      currentPage: 1,
      feature: 'all',
      colorSet: { ...$themeColors },
    }
  },
  computed: {
    incomePieChartOptions() {
      return {
        chart: {
          type: 'donut',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: 'left',
          markers: {
            width: 12,
            strokeWidth: '2px',
            strokeColor: undefined,
            fillColors: this.incomeValues.map(() => 'transparent'),
            radius: 12,
          },
          // formatter: seriesName => this.$i18n.messages[this.$i18n.locale][seriesName.charAt(0).toUpperCase() + seriesName.slice(1)],
        },
        comparedResult: [2, -3, 8],
        labels: this.incomeValues.map(d => this.$i18n.messages[this.$i18n.locale][d.name.charAt(0).toUpperCase() + d.name.slice(1)]),
        stroke: { width: 0 },
        colors: [this.colorSet.primary, this.colorSet.info, this.colorSet.danger],
        grid: {
          padding: {
            right: 0,
            bottom: 0,
            top: 0,
            left: 0,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  offsetY: 15,
                  fontSize: '11px',
                  color: '#D0D2D6',
                },
                value: {
                  offsetY: -15,
                  fontSize: '14px',
                  color: '#D0D2D6',
                  formatter(val) {
                    // eslint-disable-next-line radix
                    return parseInt(val)
                  },
                },
                total: {
                  show: true,
                  offsetY: 15,
                  label: this.$i18n.messages[this.$i18n.locale].total || 'Total',
                  fontSize: '11px',
                  color: '#D0D2D6',
                  formatter: () => (
                    this.incomeValues.map(d => d.value).reduce((a, b) => a + b, 0)
                  ),
                },
              },
            },
          },
        },
      }
    },
  },
  created() {},
  mounted() {
    this.$set(this, 'totalRows', this.transactionTableItems.length)
  },
  methods: {
    handleFeatures(key) {
      this.$set(this, 'feature', key)
    },
    handleAddTransaction() {},
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
