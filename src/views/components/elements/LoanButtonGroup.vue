<template>
  <div class="d-inline">
    <b-button
      v-for="button in buttons"
      :key="button.key"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      :variant="active === button.key ? variant : 'outline-dark'"
      class="mr-1 mb-1"
      @click="handleClick(button.key)"
    >
      {{ button.name }}
    </b-button>
  </div>
</template>
<script>
import {
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
  },
  props: {
    buttons: Array,
    variant: {
      type: String,
      default: 'primary',
    },
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      active: '',
    }
  },
  created() {
    this.$set(this, 'active', this.buttons.length > 0 ? this.buttons[0].key : '')
  },
  methods: {
    handleClick(key) {
      if (this.active === key) return
      this.$set(this, 'active', key)
      this.$emit('activeKey', key)
    },
  },
}
</script>
