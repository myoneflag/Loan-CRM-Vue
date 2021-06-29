<template>
  <b-card class="loan-box px-75 py-1 mb-1" no-body>
    <div class="w-100 d-flex justify-content-between mb-1">
      <b-badge class="circle-rounded px-1 font-weight-normal" :variant="`light-${status.type}`">
        {{ status.name }}
      </b-badge>
    </div>
    <div
      class="d-flex align-items-center cursor-pointer user-card"
      @click="clickCustomerBox"
    >
      <div class="pr-50">
        <b-avatar
          :src="data.avatar"
        />
      </div>
      <div>
        <small class="m-0">{{ data.category + " " + data.uid }}</small><br/>
        <h6 class="user-name">{{ data.name }}</h6>
      </div>
    </div>
    <div class="text-center">
      <small class="m-0">{{ `${data.payInfo.type.toUpperCase()}: ${data.payInfo.currency}${data.payInfo.amount}` }}</small>
    </div>
  </b-card>
</template>
<script>
import {
  BCard, BBadge, BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BBadge,
    BAvatar,
  },
  computed: {
    status() {
      return this.statuses.find(d => d.key === this.data.status)
    },
  },
  props: {
    data: Object,
    statuses: Array,
  },
  methods: {
    clickCustomerBox() {
      this.$emit('customerInfoModal', this.data, this.status)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@core/scss/base/colors.scss';
.user-card:hover {
  .user-name {
    color: $primary;
  }
}
</style>
