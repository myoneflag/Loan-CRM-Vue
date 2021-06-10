<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Debt-related') }}
    </b-card-text>
    <b-row>
      <b-col cols="4">
        <b-form-group
          :label="$t('Borrowing Date')"
          label-for="borrowingDate"
        >
          <loan-date-picker
            id="borrowingDate"
            :value="items.borrowingDate"
            :disabled="editDisabled"
            @change="e => changeValue('borrowingDate', e)"
            :state="validateAction ? validations.find(d => d.key === 'borrowingDate').validate : null"
          />
        </b-form-group>
        <b-form-group
          :label="$t('Cheques Amount')"
          label-for="chequesAmount"
        >
          <b-input-group
            id="chequesAmount"
            prepend="$"
            append=".00"
            class="input-group-merge"
            :state="validateAction ? validations.find(d => d.key === 'chequesAmount').validate : null"
          >
            <b-form-input
              v-model="items.chequesAmount"
              @change="e => changeValue('chequesAmount', e)"
              :disabled="editDisabled"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Repayment/Month')"
          label-for="repaymentMonth"
        >
          <!-- <b-form-input
            id="repaymentMonth"
            placeholder="15天"
            :disabled="editDisabled"
            v-model="items.repaymentMonth"
            @change="e => changeValue('repaymentMonth', e)"
            :state="validateAction ? validations.find(d => d.key === 'repaymentMonth').validate : null"
          /> -->
          <b-input-group
            id="repaymentMonth"
            append="天"
            class="input-group-merge"
            :state="validateAction ? validations.find(d => d.key === 'repaymentMonth').validate : null"
          >
            <b-form-input
              :disabled="editDisabled"
              v-model="items.repaymentMonth"
              @change="e => changeValue('repaymentMonth', e)"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('Cheques status')"
          label-for="chequesState"
        >
          <b-dropdown
            id="chequesState"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :disabled="editDisabled"
            :text="statuses.find(d => d.key === status).name"
            :variant="`outline-${validateAction ? validations.find(d => d.key === 'chequesState').validate ? 'success' : 'danger' : 'dark'}`"
            class="w-100 mb-1 full-width-dropdown"
          >
            <b-dropdown-item
              v-for="item in statuses"
              :key="item.key"
              @click="changeValue('chequesState', item.key)"
            >
              {{ $t(item.name) }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Note')"
          label-for="debtNote"
        >
          <b-form-textarea
            id="debtNote"
            :placeholder="$t('Note')"
            :disabled="editDisabled"
            rows="4"
            v-model="items.note"
            @change="e => changeValue('note', e)"
            :state="validateAction ? validations.find(d => d.key === 'note').validate : null"
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
      this.$emit('change', 'chequesState', newVal)
    },
  },
  created() {
    this.status = this.items.chequesState ? this.items.chequesState : this.statuses[0].key
  },
  mounted() {
  },
  methods: {
    changeValue(key, value) {
      if (key === 'chequesState') {
        this.$set(this, 'status', value)
      } else {
        this.$emit('change', key, value)
      }
    },
  },
}
</script>
