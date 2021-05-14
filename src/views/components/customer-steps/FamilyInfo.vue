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
            v-model="items.familyName"
            @change="e => changeValue('familyName', e)"
            :state="validateAction ? validations.find(d => d.key === 'familyName').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Phone Number"
          label-for="familyPhoneNumber"
        >
          <b-form-input
            id="familyPhoneNumber"
            placeholder="Phone Number"
            :disabled="editDisabled"
            v-model="items.familyPhoneNumber"
            @change="e => changeValue('familyPhoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'familyPhoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Address"
          label-for="familyAddress"
        >
          <b-form-input
            id="familyAddress"
            placeholder="Address"
            :disabled="editDisabled"
            v-model="items.familyAddress"
            @change="e => changeValue('familyAddress', e)"
            :state="validateAction ? validations.find(d => d.key === 'familyAddress').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Job occupation"
          label-for="familyJobOccupation"
        >
          <b-form-input
            id="familyJobOccupation"
            placeholder="Job occupation"
            :disabled="editDisabled"
            v-model="items.familyJobOccupation"
            @change="e => changeValue('familyJobOccupation', e)"
            :state="validateAction ? validations.find(d => d.key === 'familyJobOccupation').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Relationship"
          label-for="familyRelationship"
        >
          <b-form-input
            id="familyRelationship"
            placeholder="Relationship"
            :disabled="editDisabled"
            v-model="items.familyRelationship"
            @change="e => changeValue('familyRelationship', e)"
            :state="validateAction ? validations.find(d => d.key === 'familyRelationship').validate : null"
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
