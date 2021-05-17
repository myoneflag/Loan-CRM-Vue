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
      status: 'observed',
      avatar: '@/assets/images/portrait/small/avatar-s-2.jpg',
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
        name: 'WangMing',
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
    getCustomerInfo: state => state.customerInfo,
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
    SET_CUSTOMERINFO(state, val) {
      state.customerInfo = { ...val }
    },
    ADD_CUSTOMER(state, val) {
      state.customers.push(val)
    },
    SET_AVATAR_FILE(state, val) {
      state.avatarFile = val
    },
  },
  actions: {
    /**
      Get all customers already registered by a user authenticated from the firestore db. (Dispatch Function)
      * Required authenticate user's id
      * Query all the customers that authenticated user has from firestore
      * Map the got each customer's fields to the schema in vuex store. <-- function: mapCustomerFieldsFromDb() -->
      * Commit an customer's array mapped
    */
    getCustomersFromDb(context) {
      const { currentUser } = firebase.auth
      try {
        return firebase.db.collection('customers').where('sid', '==', currentUser.uid).get()
          .then(res => {
            if (res.docs.length > 0) {
              const rawCustomers = res.docs.map(item => ({ id: item.id, ...item.data() }))
              const mappedCustomers = rawCustomers.map(item => ({
                ...mapCustomerFieldsFromDb(item),
                transaction: context.state.customerInfo.transaction, // Demo(static) data
              }))
              context.commit('SET_CUSTOMERS', mappedCustomers)
            }
          })
      } catch (error) {
        return { status: 'error', errorText: error }
      }
    },

    /**
      Get a customer already registered by customer's id from the firestore db. (Dispatch Function)
      * Query special customer with customer's id from firestore
      * Map the got customer's fields to the schema in vuex store. <-- function: mapCustomerFieldsFromDb() -->
      * Commit an customer object mapped
    */
    getCustomerWithIdFromDb(context, cid) {
      try {
        return db.getOneDoc({ collectionName: 'customers', id: cid })
          .then(res => {
            if (res.exists) {
              const rawCustomer = res.data()
              const mappedCustomer = {
                ...mapCustomerFieldsFromDb({ id: cid, ...rawCustomer }),
                transaction: context.state.customerInfo.transaction, // Demo(static) data
              }
              context.commit('SET_CUSTOMERINFO', mappedCustomer)
            }
          })
      } catch (error) {
        return { status: 'error', errorText: error }
      }
    },

    /**
      Store a customer to db (A dispatch Function that is called in any component)
      * Map the customer's fields to the schema in firestore db. <-- function: mapCustomerFieldsToDb() -->
      * Add authenticated user's id to customer object
      * Initialize status to empty string as it wasn't chosen yet
      * Store avatar image to firebase storage if that image file is available. <-- function: uploadFile() -->
      * Store only a cutomer object to firebase firestore if that image file isn't available
      * Get an URL to access to an image stored and Add it to customer object
      * Store a customer object to firebase firestore
    */
    addCustomer(context, customerInfo) {
      const customer = { ...mapCustomerFieldsToDb(customerInfo) }
      const { currentUser } = firebase.auth
      customer.sid = currentUser.uid
      customer.status = 'none'
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

    /**
      Dispatch Function to update an avatar image file in the store
    */
    setAvatarFile(context, file) {
      context.commit('SET_AVATAR_FILE', file)
    },
  },
}
