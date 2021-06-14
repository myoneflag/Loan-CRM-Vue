<template>
  <div>
    <div class="d-flex align-items-center mb-1 justify-content-between">
      <b-card-text class="font-weight-bolder mb-0">
        {{ $t('Roles').toUpperCase() }}
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
        id="roles-table"
        responsive
        striped
        :items="roles"
        :fields="rolesTableInfo"
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
        <template #head()="data">
          <div style="min-width: 30px;">
            {{ $t(data.label) }}
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
      rolesTableInfo: [
        { key: 'roleName', label: 'Role Name' },
        { key: 'action', label: 'Action' },
      ],
      roles: [
        {
          id: '001',
          roleName: 'All',
        },
        {
          id: '002',
          roleName: 'Role 1',
        },
        {
          id: '003',
          roleName: 'Role 2',
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
