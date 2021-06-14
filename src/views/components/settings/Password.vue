<template>
  <b-card>
    <b-row>
      <b-col sm="6">
        <b-form-group
          :label="$t('Old password')"
          label-for="oldPassword"
        >
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              id="oldPassword"
              :type="oldPasswordFieldType"
              :placeholder="$t('Old password')"
              :disabled="!editable"
              :value="oldPassword"
              :state="validateAction ? validations.oldPassword : null"
              required
              @change="value => changeValue('oldPassword', value)"
            />
            <b-input-group-append is-text>
              <feather-icon
                class="cursor-pointer"
                :icon="oldPasswordToggleIcon"
                @click="toggleOldPasswordVisibility"
              />
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <b-form-group
          :label="$t('New password')"
          label-for="newPassword"
        >
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              id="newPassword"
              :type="passwordFieldType"
              :placeholder="$t('New password')"
              :disabled="!editable"
              :value="newPassword"
              :state="validateAction ? validations.newPassword : null"
              required
              @change="value => changeValue('newPassword', value)"
            />
            <b-input-group-append is-text>
              <feather-icon
                class="cursor-pointer"
                :icon="newPasswordToggleIcon"
                @click="togglePasswordVisibility"
              />
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="6">
        <b-form-group
          :label="$t('Enter the password again')"
          label-for="confirmPassword"
        >
          <b-form-input
            id="confirmPassword"
            type="password"
            :placeholder="$t('Enter the password again')"
            :disabled="!editable"
            :value="confirmPassword"
            :state="validateAction ? validations.confirmPassword : null"
            required
            @change="value => changeValue('confirmPassword', value)"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <div>
      <b-button
        variant="primary"
        class="mr-1"
        @click="actionHandle"
      >
        {{ editable ? $t('Save') : $t('Edit') }}
      </b-button>
      <b-button
        variant="outline-primary"
        @click="actionCancelHandle"
      >
        {{ $t('Cancel') }}
      </b-button>
    </div>
  </b-card>
</template>
<script>
import {
  BCard, BRow, BCol, BFormGroup, BFormInput, BButton, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormGroup,
    BFormInput,
    BButton,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    validate() {
      const matchPassword = this.newPassword === this.confirmPassword
      return !(Object.values(this.validations).indexOf(false) > -1) && matchPassword
    },
    oldPasswordToggleIcon() {
      return this.oldPasswordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    newPasswordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      validations: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      },
      editable: false,
      validateAction: false,
    }
  },
  methods: {
    actionHandle() {
      if (!this.editable) {
        this.$set(this, 'editable', true)
      } else if (this.validate) {
        this.$set(this, 'editable', false)
        this.$set(this, 'validateAction', false)
      } else {
        this.$set(this, 'editable', true)
        this.$set(this, 'validateAction', true)
      }
    },
    actionCancelHandle() {
      this.$set(this, 'editable', false)
      this.$set(this, 'validateAction', false)
    },
    changeValue(key, value) {
      this.$set(this, key, value)
      this.$set(this, 'validations', {
        ...this.validations,
        [key]: value !== '',
      })
    },
  },
}
</script>
