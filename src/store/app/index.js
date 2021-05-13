import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    navBackInfo: {
      buttonShow: false,
      backName: 'index',
    },
    customerRegister: {
      basic: {
        name: '',
        group: '',
        acountId: '',
        birthday: '',
        idNumber: '',
        bankAccount: '',
        cellPhoneNumber: '',
        homePhoneNumber: '',
        address: '',
        houseOwnership: 'own',
        jobOccupation: '',
        companyAddress: '',
        companyName: '',
        companyPhoneNumber: '',
      },
      family: {
        familyName: '',
        familyPhoneNumber: '',
        familyAddress: '',
        familyJobOccupation: '',
        familyRelationship: '',
      },
      guarantor: {
        guarantorName: '',
        guarantorContactNumber: '',
        guarantorAddress: '',
        guarantorAmount: 0,
        guarantorDays: 0,
        guarantorContent: '',
      },
      credit: {
        creditInfo: '',
      },
      debt: {
        debtBorrowingDate: '',
        debtRepaymentMonth: '',
        debtChequesAmount: 0,
        debtChequesState: '',
        debtNote: '',
      },
    },
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    UPDATE_NAV_BACK_BUTTON(state, val) {
      state.navBackInfo = {
        ...val,
      }
    },
  },
  actions: {},
}
