<template>
  <div>
    <b-table
      id="all-table"
      responsive
      striped
      :items="items"
      :fields="fields"
      table-class="custom-table"
    >
      <!------------------- Action column ----------------->
      <template #cell(action)="data">
        <b-dropdown
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          toggle-class="px-0 py-50 bg-transparent"
          variant="flat-dark"
          no-caret
          right
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
            v-b-modal.transaction-loan-edit-modal
          >
            {{ $t('Loan') }}
          </b-dropdown-item>
          <b-dropdown-item
            v-b-modal.transaction-delete-modal
          >
            {{ $t('Delete') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>

      <template #head()="data">
        <div style="min-width: 30px;">
          {{ $t(data.label) }}
        </div>
      </template>

    </b-table>

    <!--------------------- Transaction Loan Modal --------------------->
    <b-modal
      id="transaction-loan-edit-modal"
      title="Income"
      ok-title="Save"
      cancel-title="Cancel"
      cancel-variant="outline-primary"
      footer-class="justify-content-end flex-row-reverse"
      centered
    >
      <b-form-group
        label="Amount"
        label-for="loan-amount"
      >
        <b-input-group
          id="loan-amount"
          prepend="$"
          append=".00"
          class="input-group-merge"
        >
          <b-form-input placeholder="Amount" />
        </b-input-group>
      </b-form-group>
    </b-modal>

    <!--------------------- Transaction delete Modal --------------------->
    <b-modal
      id="transaction-delete-modal"
      ok-title="Yes, delete it!"
      cancel-title="cancel"
      footer-class="justify-content-center flex-row-reverse"
      body-class="text-center"
      cancel-variant="outline-danger"
      size="md"
      hide-header
      centered
      @ok="deleteTransaction"
    >
      <div class="d-flex justify-content-center py-1">
        <feather-icon
          icon="AlertCircleIcon"
          size="80"
          style="color: #FF9F43;"
        />
      </div>
      <h4 class="px-2 mb-2">Are you sure to delete this transaction?</h4>
      <h6 class="text-muted">
        You won’t be able to revert this!
      </h6>
    </b-modal>

  </div>
</template>
<script>
import {
  BTable, BModal, VBModal, BDropdown, BDropdownItem, BFormGroup, BInputGroup, BFormInput,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BTable,
    BModal,
    BDropdown,
    BDropdownItem,
    BFormGroup,
    BInputGroup,
    BFormInput,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    items: Array,
  },
  data() {
    return {
      fields: [
        {
          key: 'date',
          label: 'Date',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'loan',
          label: 'Loan',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'rate',
          label: 'Interest rate',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'payable',
          label: 'Payable',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'penalty',
          label: 'Penalty',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'received',
          label: 'Received',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'total',
          label: 'Total',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'note',
          label: 'Note',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'action',
          label: 'Action',
          class: 'text-center',
        },
      ],
    }
  },
  methods: {
    deleteTransaction() {
    },
  },
}
</script>
