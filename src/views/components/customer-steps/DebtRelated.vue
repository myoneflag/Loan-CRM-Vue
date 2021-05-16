<template>
  <div>
    <b-card-text class="mb-1">
      Debt-related
    </b-card-text>
    <b-row>
      <b-col cols="4">
        <b-form-group
          label="Borrowing Date"
          label-for="debtBorrowingDate"
        >
          <loan-date-picker
            id="debtBorrowingDate"
            :value="items.debtBorrowingDate"
            :disabled="editDisabled"
            @change="e => changeValue('debtBorrowingDate', e)"
            :state="validateAction ? validations.find(d => d.key === 'debtBorrowingDate').validate : null"
          />
        </b-form-group>
        <b-form-group
          label="Cheques Amount"
          label-for="debtChequesAmount"
        >
          <b-input-group
            id="debtChequesAmount"
            prepend="$"
            append=".00"
            class="input-group-merge"
            :disabled="editDisabled"
            :state="validateAction ? validations.find(d => d.key === 'debtChequesAmount').validate : null"
          >
            <b-form-input
              v-model="items.debtChequesAmount"
              @change="e => changeValue('debtChequesAmount', e)"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Repayment/Month"
          label-for="debtRepaymentMonth"
        >
          <!-- <b-form-input
            id="debtRepaymentMonth"
            placeholder="15天"
            :disabled="editDisabled"
            v-model="items.debtRepaymentMonth"
            @change="e => changeValue('debtRepaymentMonth', e)"
            :state="validateAction ? validations.find(d => d.key === 'debtRepaymentMonth').validate : null"
          /> -->
          <b-input-group
            id="debtRepaymentMonth"
            append="天"
            class="input-group-merge"
            :disabled="editDisabled"
            v-model="items.debtRepaymentMonth"
            @change="e => changeValue('debtRepaymentMonth', e.target.value)"
            :state="validateAction ? validations.find(d => d.key === 'debtRepaymentMonth').validate : null"
          >
            <b-form-input placeholder="0" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          label="Cheques Status"
          label-for="debtChequesState"
        >
          <b-dropdown
            id="debtChequesState"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :disabled="editDisabled"
            :text="statuses.find(d => d.key === status).name"
            :variant="`outline-${validateAction ? validations.find(d => d.key === 'debtChequesState').validate ? 'success' : 'danger' : 'dark'}`"
            class="w-100 mb-1 full-width-dropdown"
          >
            <b-dropdown-item
              v-for="item in statuses"
              :key="item.key"
              @click="changeValue('debtChequesState', item.key)"
            >
              {{ item.name }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Note"
          label-for="debtNote"
        >
          <b-form-textarea
            id="debtNote"
            placeholder="Content"
            :disabled="editDisabled"
            rows="4"
            v-model="items.debtNote"
            @change="e => changeValue('debtNote', e)"
            :state="validateAction ? validations.find(d => d.key === 'debtNote').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BCardText, BRow, BCol, BFormGroup, BFormTextarea, BFormInput, BInputGroup, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LoanDatePicker from '@/views/components/elements/LoanDatePicker.vue'

export default {
  components: {
    BCardText,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormTextarea,
    BDropdown,
    BDropdownItem,
    LoanDatePicker,
  },
  directives: {
    Ripple,
  },
  props: {
    items: Object,
    validations: Array,
    validateAction: Boolean,
    editDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      statuses: [
        {
          key: 'keep',
          name: 'keep',
        },
        {
          key: 'refund',
          name: 'Refund',
        },
      ],
      status: '',
    }
  },
  watch: {
    status(newVal) {
      this.$emit('change', 'debtChequesState', newVal)
    },
  },
  created() {
    this.status = this.items.debtChequesState ? this.items.debtChequesState : this.statuses[0].key
  },
  mounted() {
  },
  methods: {
    changeValue(key, value) {
      if (key === 'debtChequesState') {
        this.$set(this, 'status', value)
      } else {
        this.$emit('change', key, value)
      }
    },
  },
}
</script>
