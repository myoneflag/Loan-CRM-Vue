<template>
  <b-card>
    <div>
      <loan-button-group
        :buttons="groupButtons"
        :activeKey="activeInfoBtnGroup"
        variant='primary'
        @activeKey="setActiveInfoBtnGroup"
      />
    </div>
    <component
      :is="groupButtons.find(d => d.key === activeInfoBtnGroup).component"
    />
  </b-card>
</template>
<script>
import {
  BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LoanButtonGroup from '@/views/components/elements/LoanButtonGroup.vue'
import AccountMembers from '@/views/components/settings/management/AccountMembers.vue'
import CustomerGroups from '@/views/components/settings/management/CustomerGroups.vue'
import RolesPermissions from '@/views/components/settings/management/RolesPermissions.vue'
import MemberLogs from '@/views/components/settings/management/MemberLogs.vue'

export default {
  components: {
    LoanButtonGroup,
    AccountMembers,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      groupButtons: [
        {
          key: 'accountMembers',
          name: 'Account Members',
          component: AccountMembers,
        },
        {
          key: 'customerGroups',
          name: 'Customer Groups',
          component: CustomerGroups,
        },
        {
          key: 'rolesPermissions',
          name: 'Roles and Permissions',
          component: RolesPermissions,
        },
        {
          key: 'memberLogs',
          name: 'Member Logs',
          component: MemberLogs,
        },
      ],
      activeInfoBtnGroup: 'accountMembers',
    }
  },
  methods: {
    setActiveInfoBtnGroup(key) {
      this.$set(this, 'activeInfoBtnGroup', key)
    },
  },
}
</script>
