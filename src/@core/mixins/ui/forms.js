// We haven't added icon's computed property because it makes this mixin coupled with UI
export const togglePasswordVisibility = {
  data() {
    return {
      passwordFieldType: 'password',
      oldPasswordFieldType: 'password',
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    toggleOldPasswordVisibility() {
      this.oldPasswordFieldType = this.oldPasswordFieldType === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null
