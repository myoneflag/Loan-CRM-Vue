<template>
  <b-form-datepicker
    v-model="value"
  />
</template>

<script>
import { BFormDatepicker } from 'bootstrap-vue'

export default {
  components: {
    BFormDatepicker,
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>
