<template>
  <b-card no-body>
    <b-card-body class="pb-0">
      <div class="truncate">
        <span>{{ statisticTitle }}</span>
        <h2 class="mb-25 font-weight-bolder">
          {{ totalAmount }}
        </h2>
      </div>
    </b-card-body>
    <vue-apex-charts
      type="area"
      height="100"
      width="100%"
      :options="areaChartOptions"
      :series="chartData"
    />
  </b-card>
</template>

<script>
import { BCard, BCardBody } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardBody,
  },
  props: {
    statistic: {
      type: [Number, String],
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      areaChartOptions: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 2.5,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0.9,
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 80, 100],
          },
        },
        xaxis: {
          type: 'numeric',
          lines: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: { show: false },
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0,
            },
          },
        ],
        tooltip: {
          x: { show: false },
        },
        theme: {
          monochrome: {
            enabled: true,
            color: $themeColors.primary,
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
    }
  },
  computed: {
    totalAmount() {
      return this.chartData[0].data.reduce((a, b) => a + b, 0)
    },
  },
}
</script>
