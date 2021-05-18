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

function deleteFile(fileName) {
  // Create a reference to the file to delete
  const storageRef = firebase.storage.ref()
  const desertRef = storageRef.child(`avatarImages/${fileName}`)

  // Delete the file
  const result = desertRef.delete().then(() => ({ status: 'success' })).catch(error => ({ error }))
  return result
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
    /* customerInfo: {
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
    }, */
    customerInfo: Object,
    blankCustomerInfo: {
      id: '',
      sid: '',
      status: '',
      photoURL: '',
      promissoryNotesAmount: 0,
      promissoryNotesStatus: '',
      basicInfo: {
        fullName: '',
        group: '',
        accountNumber: '',
        birthday: '',
        idNumber: '',
        bankInfo: {
          bankName: '',
          bankCode: '',
          bankAccount: '',
        },
        cellPhoneNumber: '',
        homePhoneNumber: '',
        residenceAddress: 'none',
        address: '',
        houseOwnership: 'own',
        jobOccupation: '',
        companyAddress: '',
        companyName: '',
        companyPhoneNumber: '',
      },
      familyInfo: {
        name: '',
        phoneNumber: '',
        address: '',
        jobOccupation: '',
        relationship: '',
      },
      guarantorInfo: {
        name: '',
        phoneNumber: '',
        address: '',
        amount: 0,
        days: 0,
        note: '',
      },
      creditInfo: {
        credit: '',
      },
      debtInfo: {
        borrowingDate: '',
        repaymentMonth: 0,
        chequesAmount: 0,
        chequesState: '',
        note: '',
      },
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
    },
    customerTransactions: [
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
      * Map the got each customer's fields to the schema in vuex store.
        <-- function: mapCustomerFieldsFromDb() -->
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
                ...item,
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
      * Map the got customer's fields to the schema in vuex store.
        <-- function: mapCustomerFieldsFromDb() -->
      * Commit an customer object mapped
    */
    getCustomerWithIdFromDb(context, cid) {
      try {
        return db.getOneDoc({ collectionName: 'customers', id: cid })
          .then(res => {
            if (res.exists) {
              const rawCustomer = res.data()
              const mappedCustomer = {
                ...rawCustomer,
                id: cid,
                transaction: context.state.customerTransactions, // Demo(static) data
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
        - data: customer information (object)
      * Map the customer's fields to the schema in firestore db.
        <-- function: mapCustomerFieldsToDb() -->
      * Add authenticated user's id to customer object
      * Initialize status to empty string as it wasn't chosen yet
      * Store avatar image to firebase storage if that image file is available.
        <-- function: uploadFile() -->
      * Store only a cutomer object to firebase firestore if that image file isn't available
      * Get an URL to access to an image stored and Add it to customer object
      * Store a customer object to firebase firestore
    */
    addCustomer(context, data) {
      const customer = { ...data }
      const { currentUser } = firebase.auth
      customer.sid = currentUser.uid
      customer.status = 'none'
      customer.photoURL = ''
      customer.photoName = ''
      if (context.state.avatarFile !== null) {
        try {
          return uploadFile(context.state.avatarFile).then(res => {
            customer.photoURL = res.tokenUrl
            customer.photoName = res.snapshot.metadata.name
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
      Update a customer already registered by customer's id in the firestore db. (Dispatch Function)
      * Update db
        - id: customer's id (string)
        - update: object of the fields to updating (object)
      * Commit an customer object mapped
    */
    updateCustomerWithIdFromDb(context, { id, update }) {
      try {
        return db.updateOneDoc({ collectionName: 'customers', id, ...update })
          .then(() => {
            context.commit('SET_CUSTOMERINFO', {
              ...context.state.customerInfo,
              ...update,
            })
          })
      } catch (error) {
        return { status: 'error', errorText: error }
      }
    },

    /**
      Dispatch Function to update an avatar image file in the store
        - file: Updating image file (file)
        - save: Will update or not a file to firestore (true/false)
      * Update customer in store(vuex) with image file
      * Store a new image
      * Update customer's avatar image url in db
    */
    setAvatarFile(context, { file, save }) {
      context.commit('SET_AVATAR_FILE', file)
      const customer = { ...context.state.customerInfo }
      if (save && file !== null) {
        try {
          return uploadFile(file).then(res => {
            const deleteFileName = customer.photoName
            customer.photoURL = res.tokenUrl
            customer.photoName = res.snapshot.metadata.name || ''
            context.commit('SET_AVATAR_FILE', null)
            return db.updateOneDoc({
              collectionName: 'customers',
              id: customer.id,
              photoURL: res.tokenUrl,
              photoName: customer.photoName,
            }).then(res1 => {
              context.commit('SET_CUSTOMERINFO', customer)
              if (deleteFileName) {
                return deleteFile(deleteFileName).then(res2 => {
                  if (res2.status === 'success') {
                    return { ...res, ...res1, status: 'success' }
                  }
                  return {
                    ...res,
                    ...res1,
                    status: 'success',
                    error: res2,
                  }
                })
              }
              return { ...res, ...res1, status: 'success' }
            })
          })
        } catch (error) {
          return { status: 'error', errorText: error }
        }
      }
      return customer
    },
  },
}
