<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Basic info') }}
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
          {{ $t('Please upload your image') }}
        </b-card-text >
        <b-card-text class="mb-0">
          {{ $t('JPG, GIF or PNG are allowed. The maximum photo size is 800kB') }}
        </b-card-text>
      </b-media-body>
    </b-media>
    <b-row>
      <b-col sm="4">
        <b-form-group
          :label="$t('Name')"
          label-for="fullName"
        >
          <b-form-input
            id="fullName"
            :placeholder="$t('Name')"
            :disabled="editDisabled"
            v-model="items.fullName"
            @change="e => changeValue('fullName', e)"
            :state="validateAction ? validations.find(d => d.key === 'fullName').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Group')"
          label-for="group"
        >
          <b-dropdown
            id="group"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :disabled="editDisabled"
            :text="$t(groups.find(d => d.key === group).name)"
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
          :label="$t('Acount ID')"
          label-for="accountNumber"
        >
          <b-form-input
            id="accountNumber"
            :placeholder="$t('Acount ID')"
            :disabled="true"
            :value="items.accountNumber"
            :state="validateAction ? validations.find(d => d.key === 'accountNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Date of birth')"
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
          :label="$t('ID Number')"
          label-for="idNumber"
        >
          <b-form-input
            id="idNumber"
            :placeholder="$t('ID Number')"
            :disabled="editDisabled"
            v-model="items.idNumber"
            @change="e => changeValue('idNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'idNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Bank account')"
          label-for="bankAccount"
        >
          <b-form-input
            id="bankAccount"
            :placeholder="$t('Bank account')"
            :disabled="editDisabled"
            v-model="items.bankInfo.bankAccount"
            @change="e => changeValue('bankInfo.bankAccount', e)"
            :state="validateAction ? validations.find(d => d.key === 'bankInfo').validate : null"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-card-text class="mb-1 mt-1">
      {{ $t('Contact') }}
    </b-card-text>
    <b-row>
      <b-col sm="4">
        <b-form-group
          :label="$t('Cell Phone')"
          label-for="cellPhoneNumber"
        >
          <b-form-input
            id="cellPhoneNumber"
            :placeholder="$t('Phone Number')"
            :disabled="editDisabled"
            v-model="items.cellPhoneNumber"
            @change="e => changeValue('cellPhoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'cellPhoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Home Phone')"
          label-for="homePhoneNumber"
        >
          <b-form-input
            id="homePhoneNumber"
            placeholder="Phone Number"
            :disabled="editDisabled"
            v-model="items.homePhoneNumber"
            @change="e => changeValue('homePhoneNumber', e)"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-card-text class="mb-1 mt-1">
      {{ $t('Address') }}
    </b-card-text>
    <b-row>
      <b-col sm="4">
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
      <b-col sm="4">
        <b-form-group
          :label="$t('House ownership')"
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
                {{ $t('Own') }}
              </b-form-radio>
              <b-form-radio
                name="houseOwnership"
                value="rent"
              >
                {{ $t('Rent') }}
              </b-form-radio>
            </div>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-card-text class="mb-1 mt-1">
      {{ $t('Company info') }}
    </b-card-text>
    <b-row>
      <b-col sm="4">
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
      <b-col sm="4">
        <b-form-group
          :label="$t('Company name')"
          label-for="companyName"
        >
          <b-form-input
            id="companyName"
            :placeholder="$t('Company name')"
            :disabled="editDisabled"
            v-model="items.companyName"
            @change="e => changeValue('companyName', e)"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Company number')"
          label-for="companyPhoneNumber"
        >
          <b-form-input
            id="companyPhoneNumber"
            :placeholder="$t('Company number')"
            :disabled="editDisabled"
            v-model="items.companyPhoneNumber"
            @change="e => changeValue('companyPhoneNumber', e)"
            :state="validateAction ? validations.find(d => d.key === 'companyPhoneNumber').validate : null"
          />
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group
          :label="$t('Company address')"
          label-for="companyAddress"
        >
          <b-form-input
            id="companyAddress"
            :placeholder="$t('Company address')"
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
    const file = this.$store.state.app.avatarFile
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.$set(this, 'imgFile', reader.result)
      }
    }
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
        store.dispatch('app/setAvatarFile', { file, save: false })
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
