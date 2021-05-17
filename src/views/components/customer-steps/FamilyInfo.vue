<template>
  <div>
    <b-card-text class="mb-1">
      Family info
    </b-card-text>
    <b-row>
      <b-col cols="4">
        <b-form-group
          label="Name"
          label-for="familyName"
        >
          <b-form-input
            id="familyName"
            placeholder="Family Name"
            :disabled="editDisabled"
            v-model="items.name"
            @change="e => changeValue('name', e)"
            :state="validateAction ? validations.find(d => d.key === 'name').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Phone Number"
          label-for="phoneNumber"
        >
          <b-form-input
            id="phoneNumber"
            placeholder="Phone Number"
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
          label-for="address"
        >
          <b-form-input
            id="address"
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
          label="Job occupation"
          label-for="jobOccupation"
        >
          <b-form-input
            id="jobOccupation"
            placeholder="Job occupation"
            :disabled="editDisabled"
            v-model="items.jobOccupation"
            @change="e => changeValue('jobOccupation', e)"
            :state="validateAction ? validations.find(d => d.key === 'jobOccupation').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Relationship"
          label-for="relationship"
        >
          <b-form-input
            id="relationship"
            placeholder="Relationship"
            :disabled="editDisabled"
            v-model="items.relationship"
            @change="e => changeValue('relationship', e)"
            :state="validateAction ? validations.find(d => d.key === 'relationship').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BCardText, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    BCardText,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
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
