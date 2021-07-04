<template>
  <b-card>
    <b-card-text class="font-weight-bold">{{ $t('Download member list').toUpperCase() }}</b-card-text>
    <b-button
      variant="outline-primary"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
    >
      <feather-icon
        icon="DownloadIcon"
        class="mr-50"
      />
      <span class="align-middle">{{ $t('Download Data') }}</span>
    </b-button>
  </b-card>
</template>
<script>
import {
  BCard, BButton, BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BButton,
    BCardText,
  },
  directives: {
    Ripple,
  },
}
</script>
