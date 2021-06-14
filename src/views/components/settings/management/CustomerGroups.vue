<template>
  <div>
    <div class="d-flex align-items-center mb-1 justify-content-between">
      <b-card-text class="font-weight-bolder mb-0">
        {{ $t('Groups').toUpperCase() }}
      </b-card-text>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        class="btn-icon m-0"
      >
        {{ $t('Add') }}
      </b-button>
    </div>
    <div class="overflow-hidden rounded">
      <b-table
        id="groups-table"
        responsive
        striped
        :items="groups"
        :fields="groupsTableInfo"
        table-class="custom-table small-row-table"
        thead-class="text-center"
      >
        <template #cell(action)="data">
          <div class="d-flex justify-content-center">
            <b-dropdown
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              toggle-class="px-0 py-50 bg-transparent"
              variant="flat-dark"
              no-caret
              right
              @show="userSelectHandle(data.item.id)"
            >
              <template
                v-slot:button-content
              >
                <feather-icon
                  :id="`box-pop-menu-${data.item.id}`"
                  icon="MoreVerticalIcon"
                  size="18"
                  class="cursor-pointer"
                />
              </template>
              <b-dropdown-item
              >
                {{ $t('Edit') }}
              </b-dropdown-item>
              <b-dropdown-item
              >
                {{ $t('Delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </template>
        <template #cell()="data">
          <div class="text-center">
            {{ data.value }}
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import {
  BButton, BCardText, BTable, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BCardText,
    BTable,
    BDropdown,
    BDropdownItem,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      groupsTableInfo: [
        { key: 'groups', label: 'Groups' },
        { key: 'description', label: 'Description' },
        { key: 'action', label: 'Action' },
      ],
      groups: [
        {
          id: '001',
          groups: 'Group Name 1',
          description: '-',
        },
        {
          id: '002',
          groups: 'Group Name 2',
          description: '-',
        },
        {
          id: '003',
          groups: 'Group Name 3',
          description: '-',
        },
      ],
    }
  },
  methods: {
    userSelectHandle(uid) {
      console.log(uid)
    },
  },
}
</script>
