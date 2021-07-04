<template>
  <b-row>
    <b-col sm="3">
      <!--
        Botton group
        Return a key emitted from a button clicked
      -->
      <loan-button-group
        :buttons="groupButtons"
        :activeKey="activeInfoBtnGroup"
        variant='primary'
        buttonWidth='100%'
        textAlign='text-left'
        @activeKey="setActiveInfoBtnGroup"
      />
    </b-col>
    <b-col sm="9">
      <component
        :is="groupButtons.find(d => d.key === activeInfoBtnGroup).component"
      />
    </b-col>
  </b-row>
</template>
<script>
import store from '@/store'
import {
  BRow, BCol,
} from 'bootstrap-vue'
import LoanButtonGroup from './components/elements/LoanButtonGroup.vue'
import General from './components/settings/General.vue'
import Password from './components/settings/Password.vue'
import Management from './components/settings/Management.vue'
import System from './components/settings/System.vue'
import Download from './components/settings/Download.vue'

export default {
  components: {
    BRow,
    BCol,
    LoanButtonGroup,
    General,
    Password,
    Management,
    System,
    Download,
  },
  data() {
    return {
      /**
        Array of the buttons to category the customer information
        - transaction, basic, family, guarantor, credit, debt -
        This button group has the radio feature
      */
      groupButtons: [
        {
          key: 'general',
          name: 'General',
          icon: 'AlertCircleIcon',
          component: General,
        },
        {
          key: 'password',
          name: 'Password',
          icon: 'LockIcon',
          component: Password,
        },
        {
          key: 'management',
          name: 'Management',
          icon: 'UserCheckIcon',
          component: Management,
        },
        {
          key: 'system',
          name: 'System',
          icon: 'CommandIcon',
          component: System,
        },
        {
          key: 'download',
          name: 'Download Data',
          icon: 'DownloadIcon',
          component: Download,
        },
      ],
      activeInfoBtnGroup: 'general',
    }
  },
  methods: {
    setActiveInfoBtnGroup(key) {
      this.$set(this, 'activeInfoBtnGroup', key)
    },
  },
  mounted() {
    /** Set to show in Store for a Back button  */
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: true, backName: 'dashboard' })
  },
  beforeRouteLeave(to, from, next) {
    /** Set to hide in Store for a Back button  */
    store.commit('app/UPDATE_NAV_BACK_BUTTON', { buttonShow: false, backName: 'dashboard' })
    next()
  },
}
</script>
