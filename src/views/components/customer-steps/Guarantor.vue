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
            v-model="items.guarantorName"
            @change="e => changeValue('guarantorName', e)"
            :state="validateAction ? validations.find(d => d.key === 'guarantorName').validate : null"
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
            v-model="items.guarantorContactNumber"
            @change="e => changeValue('guarantorContactNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'guarantorContactNumber').validate : null"
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
            v-model="items.guarantorAddress"
            @change="e => changeValue('guarantorAddress', e)"
            :state="validateAction ? validations.find(d => d.key === 'guarantorAddress').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Guaranteed Amount"
          label-for="guarantorAmount"
        >
          <b-form-input
            id="guarantorAmount"
            placeholder="Guaranteed Amount"
            :disabled="editDisabled"
            v-model="items.guarantorAmount"
            @change="e => changeValue('guarantorAmount', e)"
            :state="validateAction ? validations.find(d => d.key === 'guarantorAmount').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Guaranteed Days"
          label-for="guarantorDays"
        >
          <b-form-input
            id="guarantorDays"
            placeholder="Guaranteed Days"
            :disabled="editDisabled"
            v-model="items.guarantorDays"
            @change="e => changeValue('guarantorDays', e)"
            :state="validateAction ? validations.find(d => d.key === 'guarantorDays').validate : null"
          />
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
            v-model="items.guarantorContent"
            @change="e => changeValue('guarantorContent', e)"
            :state="validateAction ? validations.find(d => d.key === 'guarantorContent').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BCardText, BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'

export default {
  components: {
    BCardText,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
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
