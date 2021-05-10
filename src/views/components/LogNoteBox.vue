<template>
  <b-card class="loan-box px-75 py-50 mb-1" no-body>
    <div class="w-100 d-flex justify-content-between mb-1">
      <b-badge class="circle-rounded px-1 font-weight-normal">
        Note
      </b-badge>
      <div>
        <feather-icon
          :id="`box-pop-menu-${data.admin.id}`"
          icon="MoreVerticalIcon"
          size="18"
          class="cursor-pointer"
        />
        <b-popover
          :target="`box-pop-menu-${data.admin.id}`"
          triggers="focus"
          placement="bottomleft"
          custom-class="m-0"
        >
          <b-list-group flush id="dd">
            <b-list-group-item>Edit</b-list-group-item>
            <b-list-group-item>Delete</b-list-group-item>
          </b-list-group>
        </b-popover>
      </div>
    </div>
    <h6 class="m-0 mb-1">
      {{ data.note }}
    </h6>
    <small class="m-0 text-secondary">
      {{ data.admin.name }}
    </small>
  </b-card>
</template>
<script>
import {
  BCard, BBadge, BPopover, VBPopover, BListGroup, BListGroupItem,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BBadge,
    BPopover,
    BListGroup,
    BListGroupItem,
  },
  props: {
    data: Object,
  },
  directives: {
    'b-popover': VBPopover,
  },
}
</script>
