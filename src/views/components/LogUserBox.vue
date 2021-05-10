<template>
  <b-card class="loan-box px-75 py-1 mb-1" no-body>
    <div class="w-100 d-flex justify-content-between mb-1">
      <b-badge class="circle-rounded px-1 font-weight-normal" :variant="`light-${status.type}`">
        {{ status.name }}
      </b-badge>
    </div>
    <div class="d-flex align-items-center">
      <div class="pr-50">
        <b-avatar
          :src="data.avatar"
        />
      </div>
      <div>
        <small class="m-0">{{ data.category + " " + data.uid }}</small><br/>
        <h6>{{ data.name }}</h6>
      </div>
    </div>
    <div class="text-center">
      <small class="m-0">{{ `${data.payInfo.type}: ${data.payInfo.currency}${data.payInfo.amount}` }}</small>
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
  data() {
    return {
      status: this.statuses.find(d => d.key === this.data.status),
    }
  },
  props: {
    data: Object,
    statuses: Array,
  },
}
</script>
