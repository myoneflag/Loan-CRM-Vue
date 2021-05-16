import { $themeBreakpoints } from '@themeConfig'
import { db, firebase } from '@/firebase'

function makeId(length) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

function uploadFile(file) {
  const fileName = makeId(20)
  const extension = file.type.replace('image/', '')
  const metadata = {
    customMetadata: {
      id: fileName,
    },
    contentType: file.type,
  }
  const storageRef = firebase.storage.ref()
  const mountainsRef = storageRef.child(`avatarImages/${fileName}.${extension}`)

  const result = mountainsRef.put(file, metadata).then(async snapshot => {
    if (snapshot.state === 'success') {
      const urlRef = storageRef.child(`avatarImages/${fileName}.${extension}`)
      const tokenUrl = await urlRef.getDownloadURL().then(url => url)
      return { snapshot, tokenUrl }
    }
    return null
  })
  return result
}

function mapCustomerFieldsToDb(customer) {
  return {
    // cid: customer.cid,
    sid: customer.sid,
    accountNumber: customer.basic.acountId,
    status: customer.status,
    group: customer.basic.group,
    fullName: customer.basic.name,
    idNumber: customer.basic.idNumber,
    birthday: customer.basic.birthday,
    photoURL: customer.avatar,
    homePhone: customer.basic.homePhoneNumber,
    cellPhone: customer.basic.cellPhoneNumber,
    occupation: customer.basic.jobOccupation,
    companyAddress: customer.basic.companyAddress,
    companyName: customer.basic.companyName,
    companyPhoneNumber: customer.basic.companyPhoneNumber,
    bankInfo: {
      bank_name: '',
      bank_code: '',
      bank_account: customer.basic.bankAccount,
    },
    residenceAddress: '',
    address: customer.basic.address,
    addressOwner: customer.basic.houseOwnership === 'own',
    familyInfo: {
      name: customer.family.familyName,
      phoneNumber: customer.family.familyPhoneNumber,
      address: customer.family.familyAddress,
      occupation: customer.family.familyJobOccupation,
      relationship: customer.family.familyRelationship,
    },
    guarantor: {
      name: customer.guarantor.guarantorName,
      phoneNumber: customer.guarantor.guarantorContactNumber,
      note: customer.guarantor.guarantorContent,
      days: customer.guarantor.guarantorDays,
      amount: customer.guarantor.guarantorAmount,
      address: customer.guarantor.guarantorAddress,
    },
    credit: customer.credit.creditInfo,
    debt: {
      debtBorrowingDate: customer.debt.debtBorrowingDate,
      debtRepaymentMonth: customer.debt.debtRepaymentMonth,
      debtChequesAmount: customer.debt.debtChequesAmount,
      debtChequesState: customer.debt.debtChequesState,
      debtNote: customer.debt.debtNote,
    },
    promissoryNotesAmount: 0,
    promissoryNotesStatus: '',
    loan: {
      loanDateTime: '',
      principal: 0,
      interestRate: 0,
      paymentDuration: 0,
      payable: 0,
      dueDateTime: '',
      penalty: 0,
    },
    loanHistories: [],
    totalReceived: {
      paymentReceived: 0,
      penaltyRecieved: 0,
      allowanceReceived: 0,
    },
  }
}

function mapCustomerFieldsFromDb(customer) {
  return {
    cid: customer.id,
    sid: customer.sid,
    status: customer.status,
    avatar: customer.photoURL,
    basic: {
      name: customer.fullName,
      group: customer.group,
      acountId: customer.accountNumber,
      birthday: customer.birthday,
      idNumber: customer.idNumber,
      bankAccount: customer.bankInfo.bank_account,
      cellPhoneNumber: customer.cellPhone,
      homePhoneNumber: customer.homePhone,
      address: customer.address,
      houseOwnership: customer.addressOwner ? 'own' : 'rent',
      jobOccupation: customer.occupation,
      companyAddress: customer.companyAddress,
      companyName: customer.companyName,
      companyPhoneNumber: customer.companyPhoneNumber,
    },
    family: {
      familyName: customer.familyInfo.name,
      familyPhoneNumber: customer.familyInfo.phoneNumber,
      familyAddress: customer.familyInfo.address,
      familyJobOccupation: customer.familyInfo.occupation,
      familyRelationship: customer.familyInfo.relationship,
    },
    guarantor: {
      guarantorName: customer.guarantor.name,
      guarantorContactNumber: customer.guarantor.phoneNumber,
      guarantorAddress: customer.guarantor.address,
      guarantorAmount: customer.guarantor.amount,
      guarantorDays: customer.guarantor.days,
      guarantorContent: customer.guarantor.note,
    },
    credit: {
      creditInfo: customer.credit,
    },
    debt: {
      debtBorrowingDate: customer.debt.debtBorrowingDate,
      debtRepaymentMonth: customer.debt.debtRepaymentMonth,
      debtChequesAmount: customer.debt.debtChequesAmount,
      debtChequesState: customer.debt.debtChequesState,
      debtNote: customer.debt.debtNote,
    },
  }
}

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    navBackInfo: {
      buttonShow: false,
      backName: 'index',
    },
    customers: [],
    customerInfo: {
      cid: '001',
      sid: '001',
      profile: {
        name: 'WangMing',
        status: 'observed',
        avatar: '@/assets/images/portrait/small/avatar-s-2.jpg',
      },
      transaction: [
        {
          tid: '001',
          date: '2020/03/25',
          loan: '50000',
          rate: 10,
          payable: 5000,
          penalty: 500,
          received: 4500,
          total: 50500,
          note: 'content',
        },
        {
          tid: '002',
          date: '2020/03/25',
          loan: '50000',
          rate: 10,
          payable: 5000,
          penalty: 500,
          received: 4500,
          total: 50500,
          note: 'content',
        },
      ],
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
    avatarFile: null,
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
    getCustomers: state => state.customers,
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
    SET_CUSTOMERS(state, val) {
      state.customers = [...val]
    },
    ADD_CUSTOMER(state, val) {
      state.customers.push(val)
    },
    SET_AVATAR_FILE(state, val) {
      state.avatarFile = val
    },
  },
  actions: {
    getCustomersFromDb(context) {
      return db.getAllDocs({
        collectionName: 'customers',
      }).then(res => {
        if (res.docs) {
          const rawCustomers = res.docs.map(item => ({ id: item.id, ...item.data() }))
          const mappedCustomers = rawCustomers.map(item => ({
            ...mapCustomerFieldsFromDb(item),
            transaction: context.state.customerInfo.transaction, // Demo(static) data
          }))
          context.commit('SET_CUSTOMERS', mappedCustomers)
        }
      })
    },
    addCustomer(context, customerInfo) {
      const customer = { ...mapCustomerFieldsToDb(customerInfo) }
      customer.status = ''
      customer.photoURL = ''
      if (context.state.avatarFile !== null) {
        try {
          return uploadFile(context.state.avatarFile).then(res => {
            customer.photoURL = res.tokenUrl
            console.log(customer)
            context.commit('SET_AVATAR_FILE', null)
            return db.addOneDoc({
              collectionName: 'customers',
              ...customer,
            }).then(res1 => {
              context.commit('ADD_CUSTOMER', customer)
              return { ...res, ...res1, status: 'success' }
            })
          })
        } catch (error) {
          return { status: 'error', errorText: error }
        }
      }
      try {
        return db.addOneDoc({
          collectionName: 'customers',
          ...customer,
        }).then(res => {
          context.commit('ADD_CUSTOMER', customer)
          return { ...res, status: 'success' }
        })
      } catch (error) {
        return { status: 'error', errorText: error }
      }
    },
    setAvatarFile(context, file) {
      context.commit('SET_AVATAR_FILE', file)
    },
  },
}
