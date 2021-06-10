<template>
  <b-card
    no-body
    class="card-statistics"
  >
    <b-card-body class="d-flex flex-column justify-content-between pb-0">
      <div class="d-flex">
        <div class="truncate text-center">
          <span>{{ statisticTitle }}</span>
          <h2 class="mb-25 font-weight-bolder">
            {{ statisticsItems.map(d => d.value).reduce((a, b) => a + b) }}
          </h2>
        </div>
      </div>
      <b-row>
        <b-col
          v-for="item in statisticsItems"
          :key="item.title"
          class="d-flex flex-column align-items-center justify-content-center"
          style="height: 100px;"
        >
          <b-badge class="circle-rounded px-1 font-weight-normal mb-50" :variant="item.color">
            {{ $t(item.title) }}
          </b-badge>
          <h6 class="mb-25 font-weight-bolder">
            {{ item.value }}
          </h6>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BRow, BCol, BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BBadge,
  },
  props: {
    statisticTitle: {
      type: String,
      default: '',
    },
    statisticsItems: Array,
  },
  data() {
    return {
    }
  },
}
</script>
