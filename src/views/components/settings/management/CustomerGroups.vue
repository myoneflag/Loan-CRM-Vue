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
        v-b-modal.customer-group-modal
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
        <template #head()="data">
          <div style="min-width: 30px;">
            {{ $t(data.label) }}
          </div>
        </template>
      </b-table>
    </div>
    <b-modal
      id="customer-group-modal"
      :title="$t('Add group')"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :ok-title="$t('Add')"
      :cancel-title="$t('Cancel')"
      :ok-disabled="group.group === ''"
      cancel-variant="outline-primary"
      footer-class="justify-content-end flex-row-reverse"
      centered
      @ok="groupHandle('add')"
    >
      <b-form-group
        :label="$t('Group name')"
        label-for="group-name"
      >
        <b-form-input
          id="group-name"
          :placeholder="$t('Group name')"
          v-model="group.group"
        />
      </b-form-group>
      <b-form-group
        :label="$t('Description')"
        label-for="group-description"
      >
        <b-form-textarea
          id="group-description"
          :placeholder="$t('Description')"
          v-model="group.description"
        />
      </b-form-group>
    </b-modal>
  </div>
</template>
<script>
import {
  BButton, BCardText, BTable, BDropdown, BDropdownItem, BModal, VBModal, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BCardText,
    BTable,
    BDropdown,
    BDropdownItem,
    BModal,
    BFormGroup,
    BFormInput,
    BFormTextarea,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      groupsTableInfo: [
        { key: 'group', label: 'Group' },
        { key: 'description', label: 'Description' },
        { key: 'action', label: 'Action' },
      ],
      groups: [
      ],
      group: {
        group: '',
        description: '',
      },
    }
  },
  methods: {
    userSelectHandle(uid) {
      console.log(uid)
    },
    groupHandle(handleKey) {
      if (handleKey === 'add') {
        console.log(handleKey)
      }
    },
  },
}
</script>
