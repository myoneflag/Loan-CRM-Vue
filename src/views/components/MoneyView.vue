<template>
  <b-card class="text-center">
    <label
      :class="`symbol-label mb-2 text-${variant}`"
      :style="`background-color: ${colorSet[variant]}40`"
    >
      <feather-icon :icon="icon" size="24" />
    </label>
    <h3>
      {{ currency + value }}
    </h3>
    <h6 class="font-small-3">{{ $t(title) }}</h6>
  </b-card>
</template>
<script>
import {
  BCard,
} from 'bootstrap-vue'
import { $themeColors } from '@themeConfig'

export default {
  components: {
    BCard,
  },
  props: {
    value: Number,
    title: String,
    variant: String,
    icon: String,
    currency: {
      type: String,
      default: '$',
    },
  },
  data() {
    return {
      colorSet: { ...$themeColors },
    }
  },
}
</script>
<style scoped>
.symbol-label {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
}
</style>
