<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Family info') }}
    </b-card-text>
    <b-row>
      <b-col cols="4">
        <b-form-group
          :label="$t('Name')"
          label-for="familyName"
        >
          <b-form-input
            id="familyName"
            :placeholder="$t('Name')"
            :disabled="editDisabled"
            v-model="items.name"
            @change="e => changeValue('name', e)"
            :state="validateAction ? validations.find(d => d.key === 'name').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Phone Number')"
          label-for="phoneNumber"
        >
          <b-form-input
            id="phoneNumber"
            :placeholder="$t('Phone Number')"
            :disabled="editDisabled"
            v-model="items.phoneNumber"
            @change="e => changeValue('phoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'phoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Address')"
          label-for="address"
        >
          <b-form-input
            id="address"
            :placeholder="$t('Address')"
            :disabled="editDisabled"
            v-model="items.address"
            @change="e => changeValue('address', e)"
            :state="validateAction ? validations.find(d => d.key === 'address').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Job occupation')"
          label-for="jobOccupation"
        >
          <b-form-input
            id="jobOccupation"
            :placeholder="$t('Job occupation')"
            :disabled="editDisabled"
            v-model="items.jobOccupation"
            @change="e => changeValue('jobOccupation', e)"
            :state="validateAction ? validations.find(d => d.key === 'jobOccupation').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Relationship')"
          label-for="relationship"
        >
          <b-form-input
            id="relationship"
            :placeholder="$t('Relationship')"
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
