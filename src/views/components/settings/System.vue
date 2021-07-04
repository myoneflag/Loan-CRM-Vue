<template>
  <b-card>
    <div class="mb-1">
      <loan-button-group
        :buttons="systemButtons"
        :activeKey="activeInfoBtnGroup"
        variant='primary'
        @activeKey="setActiveInfoBtnGroup"
      />
    </div>
    <component
      :is="systemButtons.find(d => d.key === activeInfoBtnGroup).component"
    />
  </b-card>
</template>
<script>
import {
  BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LoanButtonGroup from '@/views/components/elements/LoanButtonGroup.vue'
import CustomerStatus from '@/views/components/settings/system/CustomerStatus.vue'
import PromissoryNotesStatus from '@/views/components/settings/system/PromissoryNotesStatus.vue'
import ThemeColors from '@/views/components/settings/system/ThemeColors.vue'
import StoreSettings from '@/views/components/settings/system/StoreSettings.vue'

export default {
  components: {
    LoanButtonGroup,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      systemButtons: [
        {
          key: 'customerStatus',
          name: 'Customer Status',
          component: CustomerStatus,
        },
        {
          key: 'promissoryNotesStatus',
          name: 'Promissory Note Status',
          component: PromissoryNotesStatus,
        },
        {
          key: 'themeColors',
          name: 'Theme Colors',
          component: ThemeColors,
        },
        {
          key: 'storeSettings',
          name: 'Store Settings',
          component: StoreSettings,
        },
      ],
      activeInfoBtnGroup: 'customerStatus',
    }
  },
  methods: {
    setActiveInfoBtnGroup(key) {
      this.$set(this, 'activeInfoBtnGroup', key)
    },
  },
}
</script>
