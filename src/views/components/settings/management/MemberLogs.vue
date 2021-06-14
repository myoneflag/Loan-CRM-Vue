<template>
  <div>
    <b-row>
      <b-col sm="6" class="d-flex flex-column justify-content-center">
        <b-card-text class="font-weight-bolder mb-0">
          {{ $t('Members').toUpperCase() }}
        </b-card-text>
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
        thead-class="text-center"
      >
        <template #cell(user)="data">
          <b-media no-body>
            <b-media-aside
              class="mr-1"
            >
              <b-avatar
                :src="data.value.photoUrl"
              />
            </b-media-aside>
            <b-media-body class="my-auto text-left">
              <h5 class="mb-0">
                {{ data.value.name }}
              </h5>
              <b-card-text class="font-small-3 mb-0">
                {{ data.value.role.name }}
              </b-card-text>
            </b-media-body>
          </b-media>
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
  BRow, BCol, BCardText, BTable, BMediaAside, BAvatar, BMediaBody, BMedia, BPagination,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BCardText,
    BTable,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BMedia,
    BPagination,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      membersTableInfo: [
        { key: 'date', label: 'Date' },
        { key: 'user', label: 'Name' },
        { key: 'location', label: 'location' },
        { key: 'action', label: 'Action' },
      ],
      members: [
        {
          id: '001',
          date: '2020/12/25 23:04',
          user: {
            name: 'Name',
            role: {
              name: 'role name',
            },
            photoUrl: '',
          },
          location: 'Taipei',
          action: 'login',
        },
        {
          id: '002',
          date: '2020/12/25 23:04',
          user: {
            name: 'Name',
            role: {
              name: 'role name',
            },
            photoUrl: '',
          },
          location: 'Taipei',
          action: 'login',
        },
        {
          id: '003',
          date: '2020/12/25 23:04',
          user: {
            name: 'Name',
            role: {
              name: 'role name',
            },
            photoUrl: '',
          },
          location: 'Taipei',
          action: 'login',
        },
        {
          id: '004',
          date: '2020/12/25 23:04',
          user: {
            name: 'Name',
            role: {
              name: 'role name',
            },
            photoUrl: '',
          },
          location: 'Taipei',
          action: 'login',
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
