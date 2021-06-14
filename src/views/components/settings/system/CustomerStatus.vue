<template>
  <div>
    <div class="d-flex align-items-center mb-1 justify-content-between">
      <b-card-text class="font-weight-bolder mb-0">
        {{ $t("Customer Status").toUpperCase() }}
      </b-card-text>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        class="btn-icon m-0"
      >
        {{ $t("Add") }}
      </b-button>
    </div>
    <div class="overflow-hidden rounded">
      <b-table
        id="customer-status-table"
        responsive
        striped
        :items="statuses"
        :fields="statusTableInfo"
        table-class="custom-table"
        thead-class="text-center"
      >
        <template #cell(action)="data">
          <div class="d-flex justify-content-center">
            <b-dropdown
              v-if="data.value"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              toggle-class="px-0 py-50 bg-transparent"
              variant="flat-dark"
              no-caret
              right
              @show="userSelectHandle(data.item.id)"
            >
              <template v-slot:button-content>
                <feather-icon
                  :id="`box-pop-menu-${data.item.id}`"
                  icon="MoreVerticalIcon"
                  size="18"
                  class="cursor-pointer"
                />
              </template>
              <b-dropdown-item>
                {{ $t("Edit") }}
              </b-dropdown-item>
              <b-dropdown-item>
                {{ $t("Delete") }}
              </b-dropdown-item>
            </b-dropdown>
            <div v-else />
          </div>
        </template>
        <template #cell(status)="data">
          <div class="text-center">
            {{ $t(data.value) }}
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
  BButton,
  BCardText,
  BTable,
  BDropdown,
  BDropdownItem,
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
      statusTableInfo: [
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ],
      statuses: [
        {
          id: '001',
          status: 'Processing',
          action: false,
        },
        {
          id: '002',
          status: 'Observed',
          action: false,
        },
        {
          id: '003',
          status: 'Bad debt',
          action: false,
        },
        {
          id: '004',
          status: 'Closed',
          action: false,
        },
        {
          id: '005',
          status: 'New status',
          action: true,
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
