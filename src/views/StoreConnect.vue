<template>
  <b-card
    no-body
    class="faq-search"
    :style="{
      backgroundImage:`url(${require('@/assets/images/banner/store-connect-banner.svg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <b-card-body class="text-center">
      <h2 class="text-primary">
        This account has not been bound to any shop ⚠️.
      </h2>
      <b-card-text class="mb-2">
        Please contact Nxtcloud, Nxtcloud will assist you as soon as possible
      </b-card-text>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
      >
        Connect
      </b-button>
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard, BCardBody, BCardText, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BCardBody,
    BCardText,
    BButton,
  },
  directives: {
    Ripple,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-faq.scss';
</style>
