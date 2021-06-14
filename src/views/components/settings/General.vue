<template>
  <b-card>
    <div class="mb-2">
      <b-avatar
        :src="imgFile ? imgFile : userInfo && userInfo.photoURL"
        rounded
        size="5.5rem"
        class="mr-2"
      />
      <span>JPG, GIF or PNG are allowed. The maximum photo size is 800kB</span>
    </div>
    <b-row>
      <b-col sm="6">
        <b-form-group
          :label="$t('Name')"
          label-for="userName"
        >
          <b-form-input
            id="userName"
            :placeholder="$t('Name')"
            :disabled="!editable"
            :value="userName"
            :state="validateAction ? validations.userName : null"
            required
            @change="value => changeValue('userName', value)"
          />
        </b-form-group>
      </b-col>
      <b-col sm="6">
        <b-form-group
          :label="$t('Email')"
          label-for="userEmail"
        >
          <b-form-input
            id="userEmail"
            type="email"
            :placeholder="$t('Email')"
            :disabled="!editable"
            :value="userEmail"
            :state="validateAction ? validations.userEmail : null"
            required
            @change="value => changeValue('userEmail', value)"
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
  BCard, BAvatar, BRow, BCol, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
  },
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    validate() {
      return !(Object.values(this.validations).indexOf(false) > -1)
    },
  },
  data() {
    return {
      imgFile: null,
      userName: '',
      userEmail: '',
      validations: {
        userName: false,
        userEmail: false,
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
