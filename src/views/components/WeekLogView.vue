<template>
  <div class="w-100 overflow-auto scroll-touch d-flex">
    <div
      v-for="(day, index) in data"
      :key="day.date"
      class="day-box"
    >
      <div class="day-box-header border-bottom p-50 text-center">
        {{ day.date }}
      </div>
      <div v-if="index < data.length-1" class="day-box-view-content p-1 border-right">
        <LogNoteBox :data="day" />
        <LogUserBox
          v-for="user in day.users"
          :key="user.id"
          :data="user"
          :statuses="statuses"
        />
      </div>
      <div v-else class="day-box-view-content p-1">
        <LogNoteBox :data="day" />
        <LogUserBox
          v-for="user in day.users"
          :key="user.uid"
          :data="user"
          :statuses="statuses"
        />
      </div>
    </div>
  </div>
</template>
<script>
import LogNoteBox from './LogNoteBox.vue'
import LogUserBox from './LogUserBox.vue'

export default {
  components: {
    LogNoteBox,
    LogUserBox,
  },
  props: {
    data: Array,
    statuses: Array,
  },
}
</script>

<style lang="scss">
.day-box {
  width: calc(100%/7);
  min-width: 180px;
}
.day-box-view-content {
  height: calc(100% - 36px);
}
</style>
