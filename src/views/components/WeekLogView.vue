<template>
  <div class="w-100 overflow-auto scroll-touch d-flex">
    <div
      v-for="(day, index) in data"
      :key="day.date"
      class="day-box"
    >
      <div class="day-box-header border-bottom p-50 text-center">
        {{ day.date }}
      </div>
      <div v-if="index < data.length-1" class="day-box-view-content p-1 border-right">
        <log-note-box :data="day" />
        <log-user-box
          v-for="user in day.users"
          :key="user.id"
          :data="user"
          :statuses="statuses"
          @customerInfoModal="handleCustomerInfoModal"
        />
      </div>
      <div v-else class="day-box-view-content p-1">
        <log-note-box :data="day" />
        <log-user-box
          v-for="user in day.users"
          :key="user.uid"
          :data="user"
          :statuses="statuses"
          @customerInfoModal="handleCustomerInfoModal"
        />
      </div>
    </div>

    <b-modal
      id="customer-info-modal"
      :title="$t('Customer Information')"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :hide-footer="true"
      size="lg"
      body-class="py-2"
      centered
    >
      <b-row>
        <b-col sm="4">
          <b-media no-body class="mb-1">
            <b-media-aside
              class="mr-0"
            >
              <label for="fileInput">
                <input type="file" hidden id="fileInput" @change="fileChange" accept="image/*"/>
                <b-avatar
                  :src="imgFile ? imgFile : modalCustomerInfo ? modalCustomerInfo.avatar : ''"
                  size="5.5rem"
                />
              </label>
            </b-media-aside>
            <b-media-body class="my-auto">
              <b-card-text  class="font-small-4 font-weight-bolder mb-0 ml-1">
                {{ modalCustomerInfo ? modalCustomerInfo.name : '' }}
              </b-card-text >
              <b-card-text class="font-small-3 mb-0 ml-1">
                {{ modalCustomerInfo ? modalCustomerInfo.category : '' }}
              </b-card-text>
              <b-dropdown
                v-if="modalCustomerInfo && modalCustomerInfo.status"
                :text="$t(statuses.find(d => d.key === modalCustomerInfo.status).name)"
                :variant="`flat-${statuses.find(d => d.key === modalCustomerInfo.status).type}`"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                size="sm"
                style="width: 100px;"
              >
                <b-dropdown-item
                  v-for="item in statuses" :key="item.key"
                  :active="item.key === modalCustomerInfo.status"
                  @click="changeStatus(item.key)"
                >
                  {{ $t(item.name) }}
                </b-dropdown-item>
              </b-dropdown>
            </b-media-body>
          </b-media>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-1"
          >
            {{ $t('Save') }}
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-primary"
            @click="$bvModal.hide('customer-info-modal')"
          >
            {{ $t('Cancel') }}
          </b-button>
        </b-col>
        <b-col sm="4">
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Loan') }}</label>
            <label class="font-weight-light">{{ '$400,000' }}</label>
          </div>
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Payable') }}</label>
            <label class="font-weight-light">{{ '$2450' }}</label>
          </div>
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Paid') }}</label>
            <label
              class="font-weight-light cursor-pointer"
              v-b-modal.modal-paid
            >
              <u>{{ '$500' }}</u>
            </label>
          </div>
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Allowance') }}</label>
            <label class="font-weight-light">{{ '-' }}</label>
          </div>
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Penalty') }}</label>
            <label class="text-danger">{{ '$1950' }}</label>
          </div>
        </b-col>
        <b-col sm="4">
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Deadline') }}</label>
            <label class="font-weight-light">{{ '20:00' }}</label>
          </div>
          <div class="mb-50">
            <label class="font-weight-bold w-50">{{ $t('Note') }}</label>
            <label
              class="font-weight-light cursor-pointer"
              v-b-modal.customer-note-edit-modal
            >
              <u>{{ 'Content' }}</u>
            </label>
          </div>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      id="modal-paid"
      :title="$t('Edit (if no data change the title to Add)')"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      footer-class="justify-content-end flex-row-reverse"
      :ok-title="$t('Save')"
      :cancel-title="$t('Cancel')"
      cancel-variant="outline-primary"
    >
      <b-form>
        <b-row>
          <b-col>
            <b-form-group
              :label="$t('Amount')"
              label-for="paid-amount"
            >
              <b-input-group
                prepend="$"
                append=".00"
              >
                <b-form-input
                  id="paid-amount"
                  value="500"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <b-modal
      id="customer-note-edit-modal"
      :title="$t('Edit (if no data change the title to Add)')"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      footer-class="justify-content-end flex-row-reverse"
      cancel-variant="outline-primary"
      centered
    >
      <b-form-group
        label="Note"
        label-for="note-edit"
      >
        <b-form-textarea
          id="note-edit"
          rows="4"
          placeholder="Content"
        />
      </b-form-group>
    </b-modal>
  </div>
</template>
<script>
import {
  BModal, BRow, BCol, BMedia, BMediaAside, BMediaBody, BAvatar, BCardText, BDropdown, BDropdownItem, BButton, VBModal, BFormGroup, BInputGroup, BFormInput, BForm, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LogNoteBox from './LogNoteBox.vue'
import LogUserBox from './LogUserBox.vue'

export default {
  components: {
    BModal,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    BCardText,
    BDropdown,
    BDropdownItem,
    BButton,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BForm,
    BFormTextarea,
    LogNoteBox,
    LogUserBox,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    data: Array,
    statuses: Array,
  },
  data() {
    return {
      modalCustomerInfo: null,
      modalCustomerStatus: null,
      imgFile: null,
    }
  },
  methods: {
    handleCustomerInfoModal(customer, status) {
      this.$set(this, 'modalCustomerInfo', { ...customer })
      this.$set(this, 'modalCustomerStatus', status)
      this.$bvModal.show('customer-info-modal')
    },
    fileChange() {
    },
    changeStatus(key) {
      this.$set(this, 'modalCustomerInfo', { // Update the state(modalCustomerInfo.status) for status(observed, processing, closed, bad debt) of a customer
        ...this.modalCustomerInfo,
        status: key,
      })
    },
  },
}
</script>

<style lang="scss">
.day-box {
  width: calc(100%/7);
  min-width: 180px;
}
.day-box-view-content {
  height: calc(100% - 36px);
}
</style>
