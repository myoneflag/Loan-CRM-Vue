<template>
  <div>
    <b-card-text class="mb-1">
      Credit-related
    </b-card-text>
    <b-row>
      <b-col cols="12">
        <b-form-group
          label="Credit Info"
          label-for="creditInfo"
        >
          <b-form-textarea
            id="creditInfo"
            placeholder="Content"
            rows="10"
            v-model="items.creditInfo"
            @change="e => changeValue('creditInfo', e)"
            :state="validateAction ? validations.find(d => d.key === 'creditInfo').validate : null"
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
