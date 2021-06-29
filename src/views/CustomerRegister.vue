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
          {{ $t('Add Member') }}
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
          @changeArray="changeArray"
        />
      </div>
      <b-card-footer class="d-flex justify-content-between border-0">
        <b-button variant="outline-primary" @click="backStep">{{ $t('Back') }}</b-button>
        <b-button variant="primary" @click="nextStep">{{ $t(nextButtonText) }}</b-button>
      </b-card-footer>
    </b-card>
  </b-overlay>
</template>
<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import {
  BCard, BCardHeader, BCardFooter, BCardText, BButton, BOverlay,
} from 'bootstrap-vue'
import _ from 'lodash'
import common from '@/libs/loan'
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
          id: 'basicInfo',
          title: 'Basic info',
          active: true,
          component: BasicInfo,
        },
        {
          id: 'familyInfo',
          title: 'Family info',
          active: false,
          component: FamilyInfo,
        },
        {
          id: 'guarantorInfo',
          title: 'Guarantor',
          active: false,
          component: Guarantor,
        },
        {
          id: 'creditInfo',
          title: 'Credit-related',
          active: false,
          component: CreditRelated,
        },
        {
          id: 'debtInfo',
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
      customerInfoNoRequiredFields: store.state.app.customerInfoNoRequiredFields,
    }
  },
  watch: {
    stepNumber(newValue, oldValue) { // When the step number is changed
      this.steps[newValue].active = true
      this.steps[oldValue].active = false
      let validations = []
      const stepInfo = this.allStepsItmes[this.steps[newValue].id]
      switch (Array.isArray(stepInfo)) {
        case false:
          Object.keys(stepInfo).forEach(itemKey => {
            if (this.customerInfoNoRequiredFields[this.steps[newValue].id].indexOf(itemKey) === -1) {
              validations.push({
                key: itemKey,
                validate: stepInfo[itemKey] !== '',
              })
            }
          })
          break
        case true:
          validations = stepInfo.map((item, index) => Object.keys(item).map(itemKey => ({
            key: itemKey,
            validate: stepInfo[index][itemKey] !== '',
          })))
          break
        default:
      }
      this.$set(this, 'validations', validations)

      /** Set if the current step has 'Finish' or 'Next' status  */
      if (newValue === this.steps.length - 1) {
        this.$set(this, 'nextButtonText', 'Finish')
      } else {
        this.$set(this, 'nextButtonText', 'Next')
      }
    },

    customers(newVal) {
      const customerInfo = { ...this.$store.state.app.blankCustomerInfo }
      this.$set(this, 'allStepsItmes', {
        ...customerInfo,
        index: common.increaseIndex(newVal.map(d => d.index)),
        basicInfo: {
          ...customerInfo.basicInfo,
          accountNumber: common.increaseIndex(newVal.map(d => d.index)).toString().padStart(6, '0'),
        },
      })
    },
  },
  created() {
    // console.log(this.$store.state.app.customers)
    const customerInfo = { ...this.$store.state.app.blankCustomerInfo }
    /** Set State (allStepsItmes) from Store for the customerInfo  */
    this.$set(this, 'allStepsItmes', {
      ...customerInfo,
      index: common.increaseIndex(this.customers.map(d => d.index)),
      basicInfo: {
        ...customerInfo.basicInfo,
        accountNumber: common.increaseIndex(this.customers.map(d => d.index)).toString().padStart(6, '0'),
        // accountNumber: common.makeIdUpercase(12),
      },
    })

    /** Set State (validations) from allStepsItmes for a validation of each field */
    let validations = []
    const stepInfo = this.allStepsItmes[this.steps[this.stepNumber].id]
    switch (Array.isArray(stepInfo)) {
      case false:
        Object.keys(stepInfo).forEach(itemKey => {
          if (this.customerInfoNoRequiredFields[this.steps[this.stepNumber].id].indexOf(itemKey) === -1) {
            validations.push({
              key: itemKey,
              validate: stepInfo[itemKey] !== '',
            })
          }
        })
        break
      case true:
        validations = stepInfo.map((item, index) => Object.keys(item).map(itemKey => ({
          key: itemKey,
          validate: stepInfo[index][itemKey] !== '',
        })))
        break
      default:
    }
    this.$set(this, 'validations', validations)
    /* this.$set(this, 'validations', Object.keys(this.allStepsItmes[this.steps[this.stepNumber].id]).map(itemKey => ({
      key: itemKey,
      validate: this.allStepsItmes[this.steps[this.stepNumber].id][itemKey] !== '',
    }))) */
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
    ...mapGetters({
      customers: 'app/getCustomers',
    }),
    validate() { // Get a validation for all the fields of the current step
      const arr = []
      this.validations.forEach(d => {
        if (Array.isArray(d)) {
          d.forEach(p => arr.push(p.validate))
        } else {
          arr.push(d.validate)
        }
      })
      return !(arr.indexOf(false) > -1)
    },
  },
  methods: {
    changeValue(key, value, row) {
      let obj = null
      const stepInfo = this.allStepsItmes[this.steps[this.stepNumber].id]
      switch (Array.isArray(stepInfo)) {
        case false:
          obj = { ...stepInfo }
          _.set(obj, key, value)
          this.$set(this, 'allStepsItmes', {
            // Update the state for any field changed in the current step
            ...this.allStepsItmes,
            [this.steps[this.stepNumber].id]: { ...obj },
          })
          if (this.validations.find(d => d.key === key.split('.')[0]) === undefined) break
          if (value !== '') { // A validation of a field changed is true as that is Not empty
            this.validations.find(d => d.key === key.split('.')[0]).validate = true
          } else { // A validation of a field changed is false as that is empty
            this.validations.find(d => d.key === key.split('.')[0]).validate = false
          }
          break
        case true:
          obj = [...stepInfo]
          obj[row] = {
            ...obj[row],
            [key]: value,
          }
          this.$set(this, 'allStepsItmes', { // Update the state for any field changed in the current step
            ...this.allStepsItmes,
            [this.steps[this.stepNumber].id]: [...obj],
          })
          if (value !== '') { // A validation of a field changed is true as that is Not empty
            this.validations[row].find(d => d.key === key.split('.')[0]).validate = true
          } else { // A validation of a field changed is false as that is empty
            this.validations[row].find(d => d.key === key.split('.')[0]).validate = false
          }
          break
        default:
      }
    },

    /**
     Change that array in the case stepInfo is array
     * index: item's index
     * action: add or remove
     */
    changeArray(index, action) {
      switch (action) {
        case 'add':
          this.$set(this, 'allStepsItmes', {
            ...this.allStepsItmes,
            [this.steps[this.stepNumber].id]: [
              ...this.allStepsItmes[this.steps[this.stepNumber].id],
              this.$store.state.app.blankCustomerInfo[this.steps[this.stepNumber].id][0],
            ],
          })
          this.$set(this, 'validations', [
            ...this.validations,
            Object.keys(this.$store.state.app.blankCustomerInfo[this.steps[this.stepNumber].id][0]).map(d => ({
              key: d,
              validate: false,
            })),
          ])
          break
        case 'remove':
          this.allStepsItmes[this.steps[this.stepNumber].id].splice(index, 1)
          this.validations.splice(index, 1)
          this.$set(this, 'allStepsItmes', {
            ...this.allStepsItmes,
            [this.steps[this.stepNumber].id]: [
              ...this.allStepsItmes[this.steps[this.stepNumber].id],
            ],
          })
          this.$set(this, 'validations', [...this.validations])
          break
        default:
      }
    },

    nextStep() {
      if (this.stepNumber === this.steps.length - 1 && this.validate) { // Finish
        this.$set(this, 'saveSpinner', true)
        store.dispatch('app/addCustomer', this.allStepsItmes).then(res => {
          if (res.status === 'success') {
            this.$set(this, 'saveSpinner', false)
            this.$bvToast.toast('A customer was registered successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-center',
            })
            this.$router.push({ path: 'customer', query: { id: res.id } })
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
