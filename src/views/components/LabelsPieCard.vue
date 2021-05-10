<template>
  <b-card no-body class="px-2 py-1 mb-0 w-100">
    <b-row>
      <b-col lg="6">
        <div class="h-100 d-flex flex-column justify-content-around">
          <PriceView
            v-for="(item, index) in data.fields"
            :key="index"
            :label="item.label"
            :value="item.value"
            :preString="item.preString"
            :size="item.size"
          />
        </div>
      </b-col>
      <b-col lg="6">
        <vue-apex-charts
          height="110"
          :options="chartInfo.options"
          :series="data.chartData.map(d => d.value)"
        />
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import {
  BCard, BRow, BCol,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import PriceView from './PriceView.vue'

const $earningsStrokeColor2 = '#28c76f66'
const $earningsStrokeColor3 = '#28c76f33'
export default {
  components: {
    BCard,
    BRow,
    BCol,
    PriceView,
    VueApexCharts,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      chartInfo: {
        options: {
          chart: {
            type: 'donut',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          labels: this.data.chartData.map(d => d.name),
          stroke: { width: 0 },
          colors: [$themeColors.success, $earningsStrokeColor2, $earningsStrokeColor3],
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
                    fontSize: '20px',
                    color: '#D0D2D6',
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return parseInt(val)
                    },
                  },
                  total: {
                    show: true,
                    offsetY: 15,
                    label: 'Total',
                    fontSize: '11px',
                    color: '#D0D2D6',
                    formatter: () => (
                      this.data.chartData.reduce((a, b) => a.value + b.value)
                    ),
                  },
                },
              },
            },
          },
        },
      },
    }
  },
}
</script>
