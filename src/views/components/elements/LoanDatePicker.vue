<template>
  <b-form-datepicker
    v-model="selfValue"
    @input="e => $emit('change', e)"
    :state="state"
  />
</template>

<script>
import { BFormDatepicker } from 'bootstrap-vue'

export default {
  components: {
    BFormDatepicker,
  },
  props: {
    value: String,
    state: Boolean,
  },
  data() {
    return {
      selfValue: '',
    }
  },
  mounted() {
    this.$set(this, 'selfValue', this.value)
  },
}
</script>
