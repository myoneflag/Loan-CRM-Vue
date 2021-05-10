<template>
  <!-- Register Verify Email page-->
  <BlankPage>
    <b-card-code
      style="max-width: 28rem;"
    >
      <b-card-text class="mb-2 text-center">
        <strong>Please verify your email</strong>
      </b-card-text>
      <b-card-text class="mb-0">
        You can login after verify email, please check the mail in your mail box.
      </b-card-text>
      <b-button
        variant="primary"
        class="mt-2 btn-sm-block w-100"
        :to="{path:'/login'}"
      >
        Back to login
      </b-button>
    </b-card-code>
  </BlankPage>
<!-- / Register Verify Email page-->
</template>

<script>
/* eslint-disable global-require */
import BCardCode from '@core/components/b-card-code'
import { BCardText, BButton } from 'bootstrap-vue'

import BlankPage from '@/views/components/BlankPage.vue'

export default {
  components: {
    BlankPage,
    BCardCode,
    BCardText,
    BButton,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
