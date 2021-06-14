<template>
  <div>
    <div>
      <b-card-text class="font-weight-bold">{{ $t('Company Logo') }}</b-card-text>
      <b-avatar
        :src="imgFile"
        rounded
        size="5.5rem"
        class="mr-2 mb-1"
      />
      <p>JPG, GIF or PNG are allowed. The maximum photo size is 800kB</p>
    </div>
    <b-row>
      <b-col sm="7">
        <b-form-group
          :label="$t('Company name')"
          label-for="companyName"
          class="font-weight-bold"
        >
          <b-form-input
            id="companyName"
            :placeholder="$t('Company name')"
          />
        </b-form-group>
      </b-col>
      <b-col sm="7">
        <b-form-group
          :label="$t('Language')"
          label-for="Language"
          class="font-weight-bold"
        >
          <b-dropdown
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            :text="languages.find(d => d.key === language).name"
            variant="outline-primary"
            class="w-100 mb-1 full-width-dropdown"
          >
            <b-dropdown-item
              v-for="language in languages"
              :key="language.key"
              @click="langChange(language.key)"
            >
              {{ language.name }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
    <b-button
      variant="primary"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
    >
      {{ $t('Save') }}
    </b-button>
  </div>
</template>
<script>
import {
  BButton, BCardText, BAvatar, BFormInput, BFormGroup, BRow, BCol, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BCardText,
    BAvatar,
    BFormInput,
    BFormGroup,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      imgFile: null,
      languages: [
        {
          key: 'tw',
          name: 'Taiwan',
        },
        {
          key: 'en',
          name: 'English',
        },
      ],
      language: this.$i18n.locale,
    }
  },
  methods: {
    langChange(val) {
      this.$set(this, 'language', val)
      this.$i18n.locale = val
    },
  },
}
</script>
