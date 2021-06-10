<template>
  <div class="gross-view">
    <p class="gross-label m-0" v-bind:style="{ fontSize: size === 'small' ? '10px' : '12px', lineHeight: size === 'small' ? '14px' : '16px' }">
      {{ $t(label) }}
    </p>
    <p class="gross-value m-0" v-bind:style="{ fontSize: size === 'small' ? '14px' : '20px', lineHeight: size === 'small' ? '18px' : '24px' }">
      {{ preString + value }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    value: Number,
    preString: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'large',
    },
  },
}
</script>

<style lang="scss">
.gross-view {
  font-family: Montserrat;
  font-style: normal;
}
.gross-label {
  color: #676D7D;
}
.gross-value {
  color: #D0D2D6;
  font-weight: 400;
}
</style>
