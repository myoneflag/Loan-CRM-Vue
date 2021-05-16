<template>
  <div>
    <b-card-text class="mb-1">
      Basic info
    </b-card-text>
    <b-media v-if="showAvatar" no-body class="mb-2">
      <b-media-aside
        class="mr-1"
      >
        <label for="fileInput">
          <input type="file" hidden id="fileInput" @change="fileChange" accept="image/*"/>
          <b-avatar
            :src="imgFile"
            size="6rem"
          />
        </label>
      </b-media-aside>
      <b-media-body class="my-auto font-small-3">
        <b-card-text  class="mb-0">
          Please upload your image
        </b-card-text >
        <b-card-text class="mb-0">
          JPG, GIF or PNG are allowed. The maximum photo size is 800kB
        </b-card-text>
      </b-media-body>
    </b-media>
    <b-row>
      <b-col sm="4">
        <b-form-group
          label="Name"
          label-for="name"
        >
          <b-form-input
            id="name"
            placeholder="Enter Name"
            :disabled="editDisabled"
            v-model="items.name"
            @change="e => changeValue('name', e)"
            :state="validateAction ? validations.find(d => d.key === 'name').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Group"
          label-for="group"
        >
          <b-dropdown
            id="group"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :disabled="editDisabled"
            :text="groups.find(d => d.key === group).name"
            :variant="`outline-${validateAction ? validations.find(d => d.key === 'group').validate ? 'success' : 'danger' : 'dark'}`"
            class="w-100 mb-1 full-width-dropdown"
          >
            <b-dropdown-item
              v-for="item in groups"
              :key="item.key"
              @click="changeValue('group', item.key)"
            >
              {{ item.name }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Acount ID"
          label-for="acountId"
        >
          <b-form-input
            id="acountId"
            placeholder="Acount ID"
            :disabled="editDisabled"
            v-model="items.acountId"
            @change="e => changeValue('acountId', e)"
            :state="validateAction ? validations.find(d => d.key === 'acountId').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Date of birth"
          label-for="birthday"
        >
          <loan-date-picker
            id="birthday"
            :disabled="editDisabled"
            :value="items.birthday"
            @change="e => changeValue('birthday', e)"
            :state="validateAction ? validations.find(d => d.key === 'birthday').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="ID Number"
          label-for="idNumber"
        >
          <b-form-input
            id="idNumber"
            placeholder="ID Number"
            :disabled="editDisabled"
            v-model="items.idNumber"
            @change="e => changeValue('idNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'idNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Bank Account"
          label-for="bankAccount"
        >
          <b-form-input
            id="bankAccount"
            placeholder="Bank Account"
            :disabled="editDisabled"
            v-model="items.bankAccount"
            @change="e => changeValue('bankAccount', e)"
            :state="validateAction ? validations.find(d => d.key === 'bankAccount').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-card-text class="mb-1 mt-1">
      Contact
    </b-card-text>
    <b-row>
      <b-col sm="4">
        <b-form-group
          label="Cell Phone"
          label-for="cellPhoneNumber"
        >
          <b-form-input
            id="cellPhoneNumber"
            placeholder="Phone Number"
            :disabled="editDisabled"
            v-model="items.cellPhoneNumber"
            @change="e => changeValue('cellPhoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'cellPhoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Home Phone"
          label-for="homePhoneNumber"
        >
          <b-form-input
            id="homePhoneNumber"
            placeholder="Phone Number"
            :disabled="editDisabled"
            v-model="items.homePhoneNumber"
            @change="e => changeValue('homePhoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'homePhoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-card-text class="mb-1 mt-1">
      Address
    </b-card-text>
    <b-row>
      <b-col sm="4">
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
      <b-col sm="4">
        <b-form-group
          label="House ownership"
          label-for="houseOwnership"
        >
          <b-form-radio-group
            id="houseOwnership"
            :disabled="editDisabled"
            v-model="items.houseOwnership"
            @change="e => changeValue('houseOwnership', e)"
          >
            <div class="demo-inline-spacing">
              <b-form-radio
                name="houseOwnership"
                value="own"
              >
                Own
              </b-form-radio>
              <b-form-radio
                name="houseOwnership"
                value="rent"
              >
                Rent
              </b-form-radio>
            </div>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-card-text class="mb-1 mt-1">
      Company Info
    </b-card-text>
    <b-row>
      <b-col sm="4">
        <b-form-group
          label="Job Occupation"
          label-for="jobOccupation"
        >
          <b-form-input
            id="jobOccupation"
            placeholder="bussiness man"
            :disabled="editDisabled"
            v-model="items.jobOccupation"
            @change="e => changeValue('jobOccupation', e)"
            :state="validateAction ? validations.find(d => d.key === 'jobOccupation').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Company Name"
          label-for="companyName"
        >
          <b-form-input
            id="companyName"
            placeholder="Company Name"
            :disabled="editDisabled"
            v-model="items.companyName"
            @change="e => changeValue('companyName', e)"
            :state="validateAction ? validations.find(d => d.key === 'companyName').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Company Number"
          label-for="companyPhoneNumber"
        >
          <b-form-input
            id="companyPhoneNumber"
            placeholder="Company Number"
            :disabled="editDisabled"
            v-model="items.companyPhoneNumber"
            @change="e => changeValue('companyPhoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'companyPhoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          label="Company Address"
          label-for="companyAddress"
        >
          <b-form-input
            id="companyAddress"
            placeholder="Company Address"
            :disabled="editDisabled"
            v-model="items.companyAddress"
            @change="e => changeValue('companyAddress', e)"
            :state="validateAction ? validations.find(d => d.key === 'companyAddress').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import store from '@/store'
import {
  BCardText, BMedia, BMediaAside, BMediaBody, BAvatar, BFormGroup, BFormInput, BRow, BCol, BDropdown, BDropdownItem, BFormRadio, BFormRadioGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LoanDatePicker from '@/views/components/elements/LoanDatePicker.vue'
// import { firebase } from '@/firebase'

export default {
  components: {
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    LoanDatePicker,
    BFormRadio,
    BFormRadioGroup,
  },
  directives: {
    Ripple,
  },
  props: {
    items: Object,
    validations: Array,
    validateAction: Boolean,
    showAvatar: {
      type: Boolean,
      default: false,
    },
    editDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      groups: [
        {
          key: 'category',
          name: 'Category',
        },
        {
          key: 'employer',
          name: 'Employer',
        },
      ],
      group: '',
      imgFile: null,
    }
  },
  watch: {
    group(newVal) {
      this.$emit('change', 'group', newVal)
    },
  },
  created() {
    this.group = this.items.group ? this.items.group : this.groups[0].key
  },
  mounted() {
  },
  methods: {
    changeValue(key, value) {
      if (key === 'group') {
        this.$set(this, 'group', value)
      } else {
        this.$emit('change', key, value)
      }
    },
    fileChange(event) {
      const file = event.target.files[0]
      if (file) {
        store.dispatch('app/setAvatarFile', file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.$set(this, 'imgFile', reader.result)
        }
      }
    },
  },
}
</script>
