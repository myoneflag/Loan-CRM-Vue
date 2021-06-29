import { $themeBreakpoints } from '@themeConfig'
import { db, firebase } from '@/firebase'
import common from '@/libs/loan'

function uploadFile(file) {
  const fileName = common.makeId(20)
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
    userInfo: null,
    avatarFile: null,
    customers: [],
    customerInfo: Object,
    storeInfo: Object,
    stores: [],
    blankStore: {
      id: '',
      storeName: 'loan',
      storeImage: 'https://console.firebase.google.com/project/beesummer/firestore/data~2Fcustomers~2F9i0K3QeYVzNXmRKlYu6k',
      themeColor: '#7367f0',
      groups: [],
      customerStatusAutoChange: [],
      customerStatusExtend: [],
      promissoryNotesStatusExtend: [],
      roles: [],
      accountMembers: [],
    },
    blankCustomerInfo: {
      id: '',
      index: 0,
      sid: '',
      status: '',
      photoURL: '',
      photoName: '',
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
      familyInfo: [
        {
          name: '',
          phoneNumber: '',
          address: '',
          jobOccupation: '',
          relationship: '',
        },
      ],
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
        promissoryNoteStatus: '',
        promissoryNotesAmount: 0,
        interestRate: 0,
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
    customerInfoNoRequiredFields: {
      basicInfo: ['homePhoneNumber', 'companyName'],
      familyInfo: [],
      guarantorInfo: ['note'],
      creditInfo: ['credit'],
      debtInfo: ['note'],
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
    getUserInfo: state => state.userInfo,
    getStores: state => state.stores,
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
      state.navBackInfo = { ...val }
    },
    SET_USERINFO(state, val) {
      state.userInfo = { ...val }
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
    DELETE_CUSTOMER(state, val) {
      state.customers = [...state.customers.filter(d => d.id !== val)]
    },
    SET_AVATAR_FILE(state, val) {
      state.avatarFile = val
    },
    SET_STOREINFO(state, val) {
      state.storeInfo = { ...val }
    },
    SET_STORES(state, val) {
      state.stores = [...val]
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
        return firebase.db.collection('customers').where('sid', '==', currentUser.uid)
          .onSnapshot(res => {
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
        return firebase.db.collection('customers').doc(cid)
          .onSnapshot(res => {
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
     * Store only a cutomer object into db if that image file isn't available
     * Get an URL to access to an image stored and Add it to customer object
     * Store a customer object into db
     */
    addCustomer(context, data) {
      const customer = { ...data }
      const { currentUser } = firebase.auth
      customer.sid = currentUser.uid
      customer.status = 'inactive'
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
              customer.id = res1.id
              context.commit('ADD_CUSTOMER', customer)
              return {
                ...res,
                ...res1,
                id: res1.id,
                status: 'success',
              }
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
          customer.id = res.id
          context.commit('ADD_CUSTOMER', customer)
          return { ...res, id: res.id, status: 'success' }
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
     * Update a customer from db
     * Update a customerInfo in store(vuex)
     * Update customers's array in store(vuex)
     */
    updateCustomerWithIdFromDb(context, { id, update }) {
      try {
        return db.updateOneDoc({ collectionName: 'customers', id, ...update })
          .then(() => {
            if (context.state.customerInfo.id === id) {
              context.commit('SET_CUSTOMERINFO', {
                ...context.state.customerInfo,
                ...update,
              })
            }
            const customers = context.state.customers.map(d => {
              if (d.id === id) {
                return {
                  ...d,
                  ...update,
                }
              }
              return d
            })
            context.commit('SET_CUSTOMERS', customers)
            return { status: 'success' }
          })
      } catch (error) {
        return { status: 'error', error }
      }
    },

    /**
     Dispatch Function to update an avatar image file in the store
      - file: Updating image file (file)
      - save: Will update or not a file to firestore (true/false)
     * Update customer in store(vuex) with image file
     * Store a new image file into db
     * Retrieve an url of an image file just stored from db.
     * Update customer's avatar image url in db
     * Update customer information in store(vuex) with a new image url
     * Delete an old image file in db
     */
    setAvatarFile(context, { file, save }) {
      const customer = { ...context.state.customerInfo }
      context.commit('SET_AVATAR_FILE', file)
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

    /**
     Delete a customer by id
     * Delete a customer from db
     * Delete a customer's avatar image file from db
     * Update customers in store(vuex)
     */
    deleteCustomer(context, customer) {
      try {
        return db.deleteOneDoc({
          collectionName: 'customers',
          id: customer.id,
        }).then(res1 => {
          context.commit('DELETE_CUSTOMER', customer.id)
          // context.commit('SET_CUSTOMERINFO', {})
          if (customer.photoName !== '') {
            return deleteFile(customer.photoName).then(res2 => {
              if (res2.status === 'success') {
                return { ...res1, ...res2, status: 'success' }
              }
              return {
                ...res1,
                ...res2,
                status: 'success',
                error: res2,
              }
            })
          }
          return { ...res1, status: 'success' }
        })
      } catch (error) {
        return { status: 'error', error }
      }
    },

    /**
     * Add a Store(bussiness) into db
     * Update stores(vuex)
     */
    addStore(context) {
      const blankStore = { ...context.state.blankStore }
      try {
        return db.addOneDoc({
          collectionName: 'stores',
          ...blankStore,
        }).then(res => {
          blankStore.id = res.id
          context.commit('SET_STORES', [...context.state.stores, blankStore])
          return { ...res, id: res.id, status: 'success' }
        })
      } catch (error) {
        return { status: 'error', error }
      }
    },

    /**
     * Update a Store(bussiness) into db
     * Update stores(vuex)
     */
    updateStore(context) {
      console.log(context)
    },

    /**
     * Get the logined user's profile
     * Get the logined user's stores
     * Set the user's information(profile) in vuex
     * Set the user's stores in vuex
     * Returen the user's profile and stores

    This method is called bascally when an user logined and any logined page is reloaded
     */
    loadUserInfo(context) {
      const { currentUser } = firebase.auth
      try {
        return db.getWhereEqualDocs({ collectionName: 'users', fieldName: 'uid', value: currentUser.uid })
          .then(res => {
            if (res.size > 0) {
              const user = res.docs[0]
              if (user.exists) {
                const userInfo = user.data()
                context.commit('SET_USERINFO', userInfo)

                try {
                  return db.getAllDocs({ collectionName: 'stores' })
                    .then(res1 => {
                      if (!res1.empty) {
                        const stores = []
                        res1.docs.forEach(item => {
                          const store = { ...item.data(), id: item.id }
                          if (userInfo.stores.indexOf(item.id) > -1) {
                            stores.push(store)
                          }
                        })
                        context.commit('SET_STORES', stores)
                        return { status: 'success', user, stores }
                      }
                      return { status: 'success', user, stores: [] }
                    })
                } catch (error) {
                  return { status: 'error', errorText: error }
                }
              }
              return { status: 'success', user, stores: [] }
            }
            return { status: 'success', user: null, stores: [] }
          })
      } catch (error) {
        return { status: 'error', errorText: error }
      }

      /* try {
        return db.getWhereDocs({
          collectionName: 'stores',
        })
      } catch (error) {
        return { status: 'error', error }
      } */
    },
  },
}
