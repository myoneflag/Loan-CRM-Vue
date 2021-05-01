# Loan CRM Project with vue vuex firebase, big query

Frontend: Vue, Vuex, vuexy

Backend: Google Firebase + FireStore, Big Query

### Prerequisites
```
    firebase, vue, vuexy, CRM
```

### Usage

* Run `npm i` to install all the dependencies.
* Add `.env` file to the root with following configuration.
```
VUE_APP_FIREBASE_API_KEY = <FIREBASE_API_KEY>
VUE_APP_FIREBASE_AUTH_DOMAIN = <FIREBASE_AUTH_DOMAIN>
VUE_APP_FIREBASE_DATABASE_URL = <FIREBASE_DATABASE_URL>
VUE_APP_FIREBASE_PROJECT_ID = <FIREBASE_PROJECT_ID>
VUE_APP_FIREBASE_STORAGE_BUCKET = <FIREBASE_STORAGE_BUCKET>
VUE_APP_FIREBASE_MESSAGING_SENDER_ID = <FIREBASE_MESSAGING_SENDER_ID>
VUE_APP_FIREBASE_APP_ID = <FIREBASE_APP_ID>
VUE_APP_FIREBASE_MEASUREMENT_ID = <FIREBASE_MEASUREMENT_ID>
```
* Run `npm run serve` to run on local.

App running at:
  - Local:   http://localhost:8080/  

### Lint
* Run `npm run lint`

### Build
* Run `npm run build`

### Deploy
* Run `firebase deploy`
