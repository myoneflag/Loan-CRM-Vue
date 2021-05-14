<template>
  <b-form-datepicker
    v-model="selfValue"
    @input="e => $emit('change', e)"
    :state="state"
    :disabled="disabled"
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
    state: {
      type: Boolean,
      default: null,
    },
    disabled: Boolean,
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
