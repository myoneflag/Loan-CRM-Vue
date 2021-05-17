<template>
  <div>
    <b-card-text class="mb-1">
      Guarantor
    </b-card-text>
    <b-row>
      <b-col cols="4">
        <b-form-group
          label="Guarantor Name"
          label-for="guarantorName"
        >
          <b-form-input
            id="guarantorName"
            placeholder="Guarantor Name"
            :disabled="editDisabled"
            v-model="items.name"
            @change="e => changeValue('name', e)"
            :state="validateAction ? validations.find(d => d.key === 'name').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Contact Number"
          label-for="guarantorContactNumber"
        >
          <b-form-input
            id="guarantorContactNumber"
            placeholder="Contact Number"
            :disabled="editDisabled"
            v-model="items.phoneNumber"
            @change="e => changeValue('phoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'phoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Address"
          label-for="guarantorAddress"
        >
          <b-form-input
            id="guarantorAddress"
            placeholder="Address"
            :disabled="editDisabled"
            v-model="items.address"
            @change="e => changeValue('address', e)"
            :state="validateAction ? validations.find(d => d.key === 'address').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Guaranteed Amount"
          label-for="guarantorAmount"
        >
          <b-input-group
            id="guarantorAmount"
            prepend="$"
            append=".00"
            class="input-group-merge"
            :state="validateAction ? validations.find(d => d.key === 'amount').validate : null"
          >
            <b-form-input
              @change="e => changeValue('amount', e)"
              :disabled="editDisabled"
              v-model="items.amount"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Guaranteed Days"
          label-for="guarantorDays"
        >
          <b-input-group
            id="guarantorDays"
            append="Days"
            class="input-group-merge"
            :state="validateAction ? validations.find(d => d.key === 'days').validate : null"
          >
            <b-form-input
              @change="e => changeValue('days', e)"
              :disabled="editDisabled"
              v-model="items.days"
              placeholder="0"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group
          label="Guarantor Content"
          label-for="guarantorContent"
        >
          <b-form-textarea
            id="guarantorContent"
            placeholder="Content"
            :disabled="editDisabled"
            rows="5"
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
  BCardText, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BInputGroup,
} from 'bootstrap-vue'

export default {
  components: {
    BCardText,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormTextarea,
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
  mounted() {
  },
  methods: {
    changeValue(key, value) {
      this.$emit('change', key, value)
    },
  },
}
</script>
