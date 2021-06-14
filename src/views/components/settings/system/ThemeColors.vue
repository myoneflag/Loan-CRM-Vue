<template>
  <div>
    <b-form-group
      :label="$t('Skin').toUpperCase()"
      label-for="skin-radio"
    >
      <div class="demo-inline-spacing mb-2">
        <b-form-radio
          v-model="skinSelected"
          name="skin-radios"
          value="dark"
          class="mt-0"
        >
          {{ $t('Dark') }}
        </b-form-radio>
        <b-form-radio
          v-model="skinSelected"
          name="skin-radios"
          value="light"
          class="mt-0"
        >
          {{ $t('Light') }}
        </b-form-radio>
      </div>
    </b-form-group>
    <b-form-group
      :label="$t('Themes').toUpperCase()"
      label-for="themes-checkbox"
    >
      <b-form-checkbox
        v-model="themeSelected"
        value="theme"
      />
    </b-form-group>
    <div class="demo-inline-spacing">
      <b-button variant="primary">{{ $t('Save') }}</b-button>
      <b-button variant="outline-primary">{{ $t('Cancel') }}</b-button>
    </div>
  </div>
</template>
<script>
import {
  BButton, BFormGroup, BFormRadio, BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BFormGroup,
    BFormRadio,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      skinSelected: 'dark',
      themeSelected: '',
    }
  },
}
</script>
