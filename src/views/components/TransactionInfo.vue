<template>
  <b-table
    id="all-table"
    responsive
    striped
    :items="items"
    :fields="fields"
    table-class="custom-table"
  >
    <template #cell(action)="data">
      <feather-icon
        :id="`box-pop-menu-${data.item.id}`"
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </template>
  </b-table>
</template>
<script>
import {
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
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
          label: 'Rate',
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
}
</script>
