<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            src="@/assets/images/pages/login-dark.svg"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            Welcome to E Loan Mask 👋🏻
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="Email"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">密碼</label>
                  <b-link :to="{name:'forgot-password'}">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember me
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                Login
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'signup'}">
              <span>&nbsp;Create account</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">
              or
            </div>
          </div>

          <!-- social buttons -->
          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              @click="faceBookSignIn"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              variant="google"
              @click="googleSignIn"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import VuexyLogo from '@core/layouts/components/Logo.vue'
// import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import moment from 'moment'
import { db, auth } from '../../firebase'

export default {
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          auth
            .doSignInWithEmailAndPassword(this.userEmail, this.password)
            .then(res => {
              db.addOneDoc({
                collectionName: 'access_history',
                userId: res.user?.uid,
                action: 'login',
                createdAt: moment().toDate(),
                noLogging: true,
              })
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success Logged in',
                  icon: 'StarIcon',
                  variant: 'success',
                },
              })

              // Redirect to query page
              // console.log(this.$route)

              // Redirect to home page
              this.$router.push({ name: 'home' })
            })
            .catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: error.message || 'Failed Sign in',
                  icon: 'AlertTriangleIcon',
                  variant: 'error',
                },
              })
            })
        }
      })
    },
    googleSignIn() {
      auth.doGoogleSignIn()
        .then(res => {
          db.addOneDoc({
            collectionName: 'access_history',
            userId: res.user?.uid,
            action: 'google',
            createdAt: moment().toDate(),
            noLogging: true,
          })
          db.setOneDoc({
            collectionName: 'users',
            id: res.user?.uid,
            ...res.additionalUserInfo.profile,
            roles: [],
            createdAt: moment().toDate(),
          })
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success Logged in',
                  icon: 'StarIcon',
                  variant: 'success',
                },
              })
              // Redirect to home page
              this.$router.push({ name: 'home' })
            })
            .catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: error.message || 'Failed Sign in',
                  icon: 'AlertTriangleIcon',
                  variant: 'error',
                },
              })
            })
        })
        .catch(error => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: error.message || 'Failed Sign in',
              icon: 'AlertTriangleIcon',
              variant: 'error',
            },
          })
        })
    },
    faceBookSignIn() {
      auth.doFacebookSignIn()
        .then(res => {
          db.addOneDoc({
            collectionName: 'access_history',
            userId: res.user?.uid,
            action: 'facebook',
            createdAt: moment().toDate(),
            noLogging: true,
          })
          db.setOneDoc({
            collectionName: 'users',
            id: res.user?.uid,
            // ...response.data
            roles: [],
            createdAt: moment().toDate(),
          })
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success Logged in',
              icon: 'StarIcon',
              variant: 'success',
            },
          })

          // Redirect to query page
          // console.log(this.$route)

          // Redirect to home page
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: error.message || 'Failed Sign in',
              icon: 'AlertTriangleIcon',
              variant: 'error',
            },
          })
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
