<template>
  <div>
    <b-card-text class="mb-1">
      {{ $t('Credit-related') }}
    </b-card-text>
    <b-row>
      <b-col cols="12">
        <b-form-group
          :label="$t('Credit info')"
          label-for="credit"
        >
          <b-form-textarea
            id="credit"
            placeholder="Content"
            :disabled="editDisabled"
            rows="10"
            v-model="items.credit"
            @change="e => changeValue('credit', e)"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BCardText, BRow, BCol, BFormGroup, BFormTextarea,
} from 'bootstrap-vue'

export default {
  components: {
    BCardText,
    BRow,
    BCol,
    BFormGroup,
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
