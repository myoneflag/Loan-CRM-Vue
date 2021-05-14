<template>
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
</template>
<script>
import store from '@/store'
import {
  BCard, BCardHeader, BCardFooter, BCardText, BButton,
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
  },
  data() {
    return {
      stepNumber: 0,
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
      allStepsItmes: Object,
      validations: [],
      validateAction: false,
      nextButtonText: 'Next',
    }
  },
  watch: {
    stepNumber(newValue, oldValue) {
      this.steps[newValue].active = true
      this.steps[oldValue].active = false
      this.$set(this, 'validations', Object.keys(this.allStepsItmes[this.steps[newValue].id]).map(itemKey => ({
        key: itemKey,
        validate: this.allStepsItmes[this.steps[newValue].id][itemKey] !== '',
      })))
      if (newValue === this.steps.length - 1) {
        this.$set(this, 'nextButtonText', 'Finish')
      } else {
        this.$set(this, 'nextButtonText', 'Next')
      }
    },
  },
  created() {
    this.$set(this, 'allStepsItmes', { ...this.$store.state.app.customerInfo })
    this.$set(this, 'validations', Object.keys(this.allStepsItmes[this.steps[this.stepNumber].id]).map(itemKey => ({
      key: itemKey,
      validate: this.allStepsItmes[this.steps[this.stepNumber].id][itemKey] !== '',
    })))
  },
  mounted() {
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: true, backName: 'customers' })
  },
  beforeRouteLeave(to, from, next) {
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: false, backName: 'customers' })
    next()
  },
  computed: {
    validate() {
      return !(this.validations.map(d => d.validate).indexOf(false) > -1)
    },
  },
  methods: {
    changeValue(key, value) {
      this.$set(this, 'allStepsItmes', {
        ...this.allStepsItmes,
        [this.steps[this.stepNumber].id]: {
          ...this.allStepsItmes[[this.steps[this.stepNumber].id]],
          [key]: value,
        },
      })
      if (value !== '') {
        this.validations.find(d => d.key === key).validate = true
      } else {
        this.validations.find(d => d.key === key).validate = false
      }
    },
    nextStep() {
      if (this.validate) {
        this.$set(this, 'stepNumber', this.stepNumber === this.steps.length - 1 ? this.stepNumber : this.stepNumber + 1)
        this.$set(this, 'validateAction', false)
      } else {
        this.$set(this, 'validateAction', true)
      }
    },
    backStep() {
      this.$set(this, 'stepNumber', this.stepNumber > 0 ? this.stepNumber - 1 : this.stepNumber)
    },
  },
}
</script>
