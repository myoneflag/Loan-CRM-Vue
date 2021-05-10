<template>
  <b-card class="mb-0">
    <div class="d-flex flex-column justify-content-between h-100">
      <div v-for="(item, index) in data" :key="index" class="mb-3">
        <PriceView
          :label="item.label"
          :value="item.value"
          :preString="item.preString"
          :size="item.size"
        />
      </div>
    </div>
  </b-card>
</template>
<script>
import {
  BCard,
} from 'bootstrap-vue'
import PriceView from './PriceView.vue'

export default {
  components: {
    BCard,
    PriceView,
  },
  props: {
    data: Array,
  },
}
</script>
