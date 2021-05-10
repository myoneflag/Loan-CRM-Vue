<template>
  <!-- blank page-->
  <div class="w-100 vh-100 blank-page d-flex justify-content-center align-items-center">
    <slot />
  </div>
<!-- / blank page-->
</template>

<script>
/* eslint-disable global-require */

export default {
  components: {

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';

.blank-page {
  background: url('../../assets/images/pages/blank-page.svg') no-repeat center center fixed;
}
</style>
