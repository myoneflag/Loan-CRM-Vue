<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Debt-related') }}
    </b-card-text>
    <b-row>
      <b-col sm="4">
        <b-form-group
          :label="$t('Promissory Note Status')"
          label-for="promissoryNoteStatus"
        >
          <b-dropdown
            id="promissoryNoteStatus"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :disabled="editDisabled"
            :text="statuses.find(d => d.key === status).name"
            :variant="`outline-${validateAction ? validations.find(d => d.key === 'promissoryNoteStatus').validate ? 'success' : 'danger' : 'dark'}`"
            class="w-100 mb-1 full-width-dropdown"
          >
            <b-dropdown-item
              v-for="item in statuses"
              :key="item.key"
              @click="changeValue('promissoryNoteStatus', item.key)"
            >
              {{ $t(item.name) }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Promissory Note Amount')"
          label-for="promissoryNotesAmount"
        >
          <b-input-group
            id="promissoryNotesAmount"
            prepend="$"
            append=".00"
            class="input-group-merge"
            :state="validateAction ? validations.find(d => d.key === 'promissoryNotesAmount').validate : null"
          >
            <b-form-input
              v-model="items.promissoryNotesAmount"
              @change="e => changeValue('promissoryNotesAmount', e)"
              :disabled="editDisabled"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Interest rate')"
          label-for="interestRate"
        >
          <b-input-group
            id="interestRate"
            append="%"
            class="input-group-merge"
            :state="validateAction ? validations.find(d => d.key === 'interestRate').validate : null"
          >
            <b-form-input
              v-model="items.interestRate"
              @change="e => changeValue('interestRate', e)"
              :disabled="editDisabled"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
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
      />
    </b-form-group>
  </div>
</template>
<script>
import {
  BCardText, BRow, BCol, BFormGroup, BFormTextarea, BFormInput, BInputGroup, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

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
          name: 'Keep',
        },
        {
          key: 'kept',
          name: 'Kept',
        },
        {
          key: 'mailed',
          name: 'Mailed',
        },
        {
          key: 'disposed',
          name: 'Disposed',
        },
      ],
      status: '',
    }
  },
  watch: {
    status(newVal) {
      this.$emit('change', 'promissoryNoteStatus', newVal)
    },
  },
  created() {
    this.status = this.items.promissoryNoteStatus ? this.items.promissoryNoteStatus : this.statuses[0].key
  },
  mounted() {
  },
  methods: {
    changeValue(key, value) {
      if (key === 'promissoryNoteStatus') {
        this.$set(this, 'status', value)
      } else {
        this.$emit('change', key, value)
      }
    },
  },
}
</script>
