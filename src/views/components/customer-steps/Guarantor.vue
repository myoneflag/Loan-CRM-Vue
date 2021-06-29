<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Guarantor') }}
    </b-card-text>
    <b-row>
      <b-col cols="4">
        <b-form-group
          :label="$t('Guarantor name')"
          label-for="guarantorName"
        >
          <b-form-input
            id="guarantorName"
            :placeholder="$t('Guarantor name')"
            :disabled="editDisabled"
            v-model="items.name"
            @change="e => changeValue('name', e)"
            :state="validateAction ? validations.find(d => d.key === 'name').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          :label="$t('Contact number')"
          label-for="guarantorContactNumber"
        >
          <b-form-input
            id="guarantorContactNumber"
            :placeholder="$t('Contact number')"
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
          label-for="guarantorAddress"
        >
          <b-form-input
            id="guarantorAddress"
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
          :label="$t('Guaranteed amount')"
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
          :label="$t('Guaranteed days')"
          label-for="guarantorDays"
        >
          <b-input-group
            id="guarantorDays"
            :append="$t('Days')"
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
          :label="$t('Guarantor content')"
          label-for="guarantorContent"
        >
          <b-form-textarea
            id="guarantorContent"
            :placeholder="$t('Guarantor content')"
            :disabled="editDisabled"
            rows="5"
            v-model="items.note"
            @change="e => changeValue('note', e)"
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
