<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Family info') }}
    </b-card-text>
    <b-row
      v-for="(item, index) in families"
      :key="index"
    >
      <b-col sm="2">
        <b-form-group
          :label="$t('Name')"
          :label-for="'familyName-' + index.toString()"
        >
          <b-form-input
            :id="'familyName-' + index.toString()"
            :key="'familyName-' + index.toString()"
            :placeholder="$t('Name')"
            :disabled="editDisabled"
            :value="item.name"
            @change="e => changeValue(index, 'name', e)"
            :state="validateAction ? validations[index].find(d => d.key === 'name').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="2">
        <b-form-group
          :label="$t('Phone Number')"
          :label-for="'phoneNumber-' + index.toString()"
        >
          <b-form-input
            :id="'phoneNumber-' + index.toString()"
            :placeholder="$t('Phone Number')"
            :disabled="editDisabled"
            :value="item.phoneNumber"
            @change="e => changeValue(index, 'phoneNumber', e)"
            :state="validateAction ? validations[index].find(d => d.key === 'phoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group
          :label="$t('Address')"
          :label-for="'address-' + index.toString()"
        >
          <b-form-input
            :id="'address-' + index.toString()"
            :placeholder="$t('Address')"
            :disabled="editDisabled"
            :value="item.address"
            @change="e => changeValue(index, 'address', e)"
            :state="validateAction ? validations[index].find(d => d.key === 'address').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="2">
        <b-form-group
          :label="$t('Job occupation')"
          :label-for="'jobOccupation-' + index.toString()"
        >
          <b-form-input
            :id="'jobOccupation-' + index.toString()"
            :placeholder="$t('Job occupation')"
            :disabled="editDisabled"
            :value="item.jobOccupation"
            @change="e => changeValue(index, 'jobOccupation', e)"
            :state="validateAction ? validations[index].find(d => d.key === 'jobOccupation').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="2">
        <b-form-group
          :label="$t('Relationship')"
          :label-for="'relationship-' + index.toString()"
        >
          <b-form-input
            :id="'relationship-' + index.toString()"
            :placeholder="$t('Relationship')"
            :disabled="editDisabled"
            :value="item.relationship"
            @change="e => changeValue(index, 'relationship', e)"
            :state="validateAction ? validations[index].find(d => d.key === 'relationship').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="1">
        <b-form-group
          :label="$t('.')"
          :label-for="'remove-button-' + index.toString()"
        >
          <b-button
            :id="'remove-button-' + index.toString()"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="btn-icon"
            :disabled="editDisabled"
            @click="removeFamily(index)"
          >
            <feather-icon
              icon="Trash2Icon"
            />
          </b-button>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <hr>
      </b-col>
    </b-row>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      size="sm"
      class="float-right"
      :disabled="editDisabled"
      @click="addFamily"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Add New</span>
    </b-button>
  </div>
</template>
<script>
import {
  BCardText, BRow, BCol, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCardText,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
  },
  directives: {
    Ripple,
  },
  props: {
    items: Array,
    validations: Array,
    validateAction: Boolean,
    editDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      families: [],
    }
  },
  created() {
    this.$set(this, 'families', this.items)
  },
  mounted() {
  },
  methods: {
    changeValue(row, key, value) {
      // const familyArray = [...this.families]
      // familyArray[row][key] = value
      // this.$set(this, 'families', familyArray)
      this.$emit('change', key, value, row)
    },
    addFamily() {
      this.$emit('changeArray', this.families.length, 'add')
      this.$set(this, 'families', [
        ...this.families,
        this.$store.state.app.blankCustomerInfo.familyInfo[0],
      ])
    },
    removeFamily(index) {
      this.families.splice(index, 1)
      this.$emit('changeArray', index, 'remove')
      this.$set(this, 'families', [
        ...this.families,
      ])
    },
  },
}
</script>
