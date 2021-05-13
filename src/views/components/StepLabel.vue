<template>
  <div :class="`d-flex align-items-center step-label ${step.active ? 'active' : ''}`">
    <span class="label-box">{{ step.index + 1 }}</span>
    <span class="label-text mx-50">{{ step.title }}</span>
    <feather-icon
      v-if="!isLast"
      icon="ChevronRightIcon"
      class="mr-50"
    />
  </div>
</template>
<script>
export default {
  props: {
    step: Object,
    isLast: Boolean,
  },
}
</script>
