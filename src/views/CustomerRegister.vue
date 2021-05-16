<template>
  <b-overlay
    id="overlay-background"
    :show="saveSpinner"
    opacity="0.6"
    variant="transparent"
    blur="2px"
    rounded="sm"
    style="background-color: #161d31 !important;"
  >
    <b-card no-body>
      <b-card-header>
        <b-card-text class="font-weight-bolder mb-0">
          Add Member
        </b-card-text>
      </b-card-header>
      <div class="d-flex px-2 border-bottom flex-wrap">
        <step-lable v-for="(step, index) in steps" :key="step.id" :step="{...step, index}" :isLast="index === steps.length-1"/>
      </div>
      <div class="step-content p-2">
        <component
          :is="steps[stepNumber].component"
          :items="allStepsItmes[steps[stepNumber].id]"
          :validations="validations"
          :validateAction="validateAction"
          :showAvatar="true"
          @change="changeValue"
        />
      </div>
      <b-card-footer class="d-flex justify-content-between border-0">
        <b-button variant="outline-primary" @click="backStep">Back</b-button>
        <b-button variant="primary" @click="nextStep">{{ nextButtonText }}</b-button>
      </b-card-footer>
    </b-card>
  </b-overlay>
</template>
<script>
import store from '@/store'
import {
  BCard, BCardHeader, BCardFooter, BCardText, BButton, BOverlay,
} from 'bootstrap-vue'
import StepLable from './components/StepLabel.vue'
import BasicInfo from './components/customer-steps/BasicInfo.vue'
import FamilyInfo from './components/customer-steps/FamilyInfo.vue'
import Guarantor from './components/customer-steps/Guarantor.vue'
import CreditRelated from './components/customer-steps/CreditRelated.vue'
import DebtRelated from './components/customer-steps/DebtRelated.vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardFooter,
    BCardText,
    StepLable,
    BButton,
    BOverlay,
  },
  data() {
    return {
      stepNumber: 0, // Current step's number
      /** Array of all the steps, that each step has the properties of 'id', 'title', 'active', 'component'  */
      steps: [
        {
          id: 'basic',
          title: 'Basic info',
          active: true,
          component: BasicInfo,
        },
        {
          id: 'family',
          title: 'Family info',
          active: false,
          component: FamilyInfo,
        },
        {
          id: 'guarantor',
          title: 'Guarantor',
          active: false,
          component: Guarantor,
        },
        {
          id: 'credit',
          title: 'Credit-related',
          active: false,
          component: CreditRelated,
        },
        {
          id: 'debt',
          title: 'Debt-related',
          active: false,
          component: DebtRelated,
        },
      ],
      allStepsItmes: Object, // Collection of all the FIELDS in all the steps
      validations: [], // Array of all the VALIDATIONS for all the fields
      validateAction: false, // Variable to indicate if all the field controls in a current step would show/hide the validation property when 'Next' button will be clicked
      nextButtonText: 'Next', // Title of a next button in a current step
      saveSpinner: false, // Spinner hide/show while saving or edit
    }
  },
  watch: {
    stepNumber(newValue, oldValue) { // When the step number is changed
      this.steps[newValue].active = true
      this.steps[oldValue].active = false
      this.$set(this, 'validations', Object.keys(this.allStepsItmes[this.steps[newValue].id]).map(itemKey => ({
        key: itemKey,
        validate: this.allStepsItmes[this.steps[newValue].id][itemKey] !== '',
      })))
      /** Set if the current step has 'Finish' or 'Next' status  */
      if (newValue === this.steps.length - 1) {
        this.$set(this, 'nextButtonText', 'Finish')
      } else {
        this.$set(this, 'nextButtonText', 'Next')
      }
    },
  },
  created() {
    /** Set State (allStepsItmes) from Store for the customerInfo  */
    this.$set(this, 'allStepsItmes', { ...this.$store.state.app.customerInfo })
    /** Set State (validations) from allStepsItmes for a validation of each field */
    this.$set(this, 'validations', Object.keys(this.allStepsItmes[this.steps[this.stepNumber].id]).map(itemKey => ({
      key: itemKey,
      validate: this.allStepsItmes[this.steps[this.stepNumber].id][itemKey] !== '',
    })))
  },
  mounted() {
    /** Set to show in Store for a Back button  */
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: true, backName: 'customers' })
  },
  beforeRouteLeave(to, from, next) {
    /** Set to hide in Store for a Back button  */
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: false, backName: 'customers' })
    next()
  },
  computed: {
    validate() { // Get a validation for all the fields of the current step
      return !(this.validations.map(d => d.validate).indexOf(false) > -1)
    },
  },
  methods: {
    changeValue(key, value) {
      this.$set(this, 'allStepsItmes', { // Update the state for any field changed in the current step
        ...this.allStepsItmes,
        [this.steps[this.stepNumber].id]: {
          ...this.allStepsItmes[[this.steps[this.stepNumber].id]],
          [key]: value,
        },
      })
      if (value !== '') { // A validation of a field changed is true as that is Not empty
        this.validations.find(d => d.key === key).validate = true
      } else { // A validation of a field changed is false as that is empty
        this.validations.find(d => d.key === key).validate = false
      }
    },
    nextStep() {
      if (this.stepNumber === this.steps.length - 1) { // Finish
        // console.log(this.allStepsItmes)
        this.$set(this, 'saveSpinner', true)
        store.dispatch('app/addCustomer', this.allStepsItmes).then(res => {
          // console.log(res)
          if (res) {
            this.$set(this, 'saveSpinner', false)
            this.$bvToast.toast('A customer was registered successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-center',
            })
          }
        })
      } else if (this.validate) { // To next step
        this.$set(this, 'stepNumber', this.stepNumber === this.steps.length - 1 ? this.stepNumber : this.stepNumber + 1)
        this.$set(this, 'validateAction', false)
      } else { // Failed validation in the current step
        this.$set(this, 'validateAction', true)
      }
    },
    backStep() {
      /** To previous step */
      this.$set(this, 'stepNumber', this.stepNumber > 0 ? this.stepNumber - 1 : this.stepNumber)
    },
  },
}
</script>
