<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <!-- <dark-Toggler class="d-none d-lg-block" /> -->
      <b-button
        v-if="backButtonInfo.buttonShow"
        variant="flat-dark"
        size="sm"
        @click="back"
      >
        <feather-icon
          icon="ChevronLeftIcon"
          class="mr-50"
        />
        <span class="align-middle">Back</span>
      </b-button>
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              John Doe
            </p>
            <span class="user-status">Admin</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center" to="settings">
          <feather-icon
            size="16"
            icon="SettingsIcon"
            class="mr-50"
          />
          <span>{{ $t('Settings') }}</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>{{ $t('Logout') }}</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
        >
          <b-button
            v-for="store in stores"
            :key="store.id"
            :variant="store.themeColor"
            class="rounded-circle rounded-text-btn mr-50"
            @click="storeClick()"
          >
            E
          </b-button>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar, BButton,
} from 'bootstrap-vue'
import moment from 'moment'
import { db, auth, firebase } from '../../firebase'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BButton,
    // Navbar Components
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      stores: [],
    }
  },
  computed: {
    backButtonInfo() {
      return this.$store.state.app.navBackInfo
    },
    ...mapGetters({
      getStores: 'app/getStores',
    }),
  },
  methods: {
    logout() {
      db.addOneDoc({
        collectionName: 'access_history',
        userId: firebase.auth?.currentUser?.uid,
        action: 'logout',
        createdAt: moment().toDate(),
        noLogging: true,
      })
      auth.doSignOut().then(() => {
        // Redirect to login page
        this.$router.push({ name: 'login' })
      })
    },
    back() {
      this.$router.push({ name: this.backButtonInfo.backName })
    },
    storeClick() {
    },
  },
  watch: {
    getStores(stores) {
      this.$set(this, 'stores', stores)
    },
  },
}
</script>

<style scoped>
.rounded-text-btn {
  width: 26px;
  height: 26px;
  padding: 0;
}
</style>
