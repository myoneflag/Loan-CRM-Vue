<template>
  <div>
    <div v-for="(item, index) in data" :key="index" class="d-flex justify-content-between">
      <div class="d-flex justify-content-start align-items-center">
        <div :class="`color-circle mr-50 bg-${item.type}`"/>
        <b-card-text  class="font-weight-bolder text-left mb-0">
          {{ item.date }}
        </b-card-text >
      </div>
      <b-card-text  class="font-weight-bolder mb-0">
        {{ item.currency + item.amount }}
      </b-card-text >
    </div>
  </div>
</template>
<script>
import {
  BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BCardText,
  },
  props: {
    data: Array,
  },
  // data
}
</script>
<style>
.color-circle {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  /* background: red; */
}
</style>
