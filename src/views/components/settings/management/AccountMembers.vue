<template>
  <div>
    <b-row>
      <b-col sm="6" class="d-flex flex-column justify-content-center">
        <b-card-text class="font-weight-bolder mb-0">
          {{ $t('Members').toUpperCase() }}
        </b-card-text>
      </b-col>
      <b-col sm="6">
        <div class="demo-inline-spacing float-right">
          <!-------------------------- Search box Start -------------------------->
          <b-form-group class="m-0">
            <b-form-input
              id="search_input"
              :placeholder="$t('Search') + '...'"
              class="mb-1"
            />
          </b-form-group>
          <!-------------------------- Search box End ---------------------------->
          <!-------------------------- Add buttom Start -------------------------->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="btn-icon m-0 mb-1 ml-1"
          >
            {{ $t('Add') }}
          </b-button>
          <!-------------------------- Add buttom End -------------------------->
        </div>
      </b-col>
    </b-row>
    <div class="overflow-hidden rounded">
      <b-table
        id="members-table"
        responsive
        striped
        :items="members"
        :fields="membersTableInfo"
        :per-page="perPage"
        :current-page="currentPage"
        table-class="custom-table"
      >
        <template #cell(name)="data">
          <b-media no-body style="width: 100px;">
            <b-media-aside
              class="mr-1"
            >
              <b-avatar
                :src="data.item.photoUrl"
              />
            </b-media-aside>
            <b-media-body class="my-auto text-left">
              <b-card-text class="font-small-3 mb-0">
                {{ data.value }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </template>
        <template #cell(action)="data">
          <div class="d-flex justify-content-center">
            <b-dropdown
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              toggle-class="px-0 py-50 bg-transparent"
              variant="flat-dark"
              no-caret
              right
              @show="userSelectHandle(data.item.id)"
            >
              <template
                v-slot:button-content
              >
                <feather-icon
                  :id="`box-pop-menu-${data.item.id}`"
                  icon="MoreVerticalIcon"
                  size="18"
                  class="cursor-pointer"
                />
              </template>
              <b-dropdown-item
              >
                {{ $t('Edit') }}
              </b-dropdown-item>
              <b-dropdown-item
              >
                {{ $t('Delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </template>
        <template #cell()="data">
          <div class="text-center">
            {{ data.value }}
          </div>
        </template>
        <template #head()="data">
          <div style="min-width: 30px;">
            {{ $t(data.label) }}
          </div>
        </template>
      </b-table>
      <b-row>
        <b-col cols="6">
          <b-card-text class="font-small-3 mb-0 ml-1">
            {{ totalRows === 0 ? `Showing 0 - ${totalRows} of ${totalRows} entries` :
              perPage*(currentPage-1)+perPage > totalRows ?
              `Showing ${perPage*(currentPage-1)+1} - ${totalRows} of ${totalRows} entries` :
              `Showing ${perPage*(currentPage-1)+1} - ${perPage*(currentPage-1)+perPage} of ${totalRows} entries`
            }}
          </b-card-text>
        </b-col>
        <b-col cols="6">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
            size="sm"
            class="mt-0 mb-1 mr-1"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BButton, BCardText, BTable, BMediaAside, BAvatar, BMediaBody, BMedia, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BCardText,
    BTable,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BMedia,
    BDropdown,
    BDropdownItem,
    BPagination,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      membersTableInfo: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'certification', label: 'Certification' },
        { key: 'action', label: 'Action' },
      ],
      members: [
        {
          id: '001',
          name: '王大千',
          email: 'test@loan.com',
          role: 'owner',
          certification: 'accept',
          photoUrl: '',
        },
        {
          id: '002',
          name: '王大千',
          email: 'test@loan.com',
          role: 'owner',
          certification: 'accept',
          photoUrl: '',
        },
      ],
      perPage: 8,
      currentPage: 1,
    }
  },
  methods: {
    userSelectHandle(uid) {
      console.log(uid)
    },
  },
  computed: {
    totalRows() {
      return this.members.length
    },
  },
}
</script>
