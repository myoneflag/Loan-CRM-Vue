<template>
  <div>
    <b-button
      v-for="button in buttons"
      :key="button.key"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      :variant="active === button.key ? variant : 'outline-dark'"
      :class="'mr-50 mb-1 ' + textAlign"
      :style="'width: ' + buttonWidth + ';'"
      @click="handleClick(button.key)"
    >
      <feather-icon
        v-if="button.icon"
        :icon="button.icon"
        class="mr-50"
      />
      <span class="align-middle">{{ $t(button.name) }}</span>
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
    activeKey: {
      type: String,
      require: true,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    buttonWidth: {
      type: String,
      default: 'auto',
    },
    textAlign: {
      type: String,
      default: 'text-center',
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
    this.$set(this, 'active', this.activeKey)
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
