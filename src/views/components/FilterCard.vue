<template>
  <b-card class="mb-1">
    <b-row>
      <!-------------------------- Datatime picker Start --------------------------->
      <b-col lg="4">
        <LoanDatePicker
          :id="datePickerId"
          class="mb-1"
        />
      </b-col>
      <!-------------------------- Datatime picker End ----------------------------->
      <!-------------------------- Day / Week swtich buttons Start --------------------------->
      <b-col lg="8">
        <b-form-group class="float-right mb-1">
          <b-form-radio-group
            id="switch-day-week"
            name="radios-btn-default"
            v-model="selectedRadioDayWeek"
            button-variant="outline-primary"
            :options="optionsRadioDayWeek"
            buttons
            @change="selectedRadioDayWeekChange"
          />
        </b-form-group>
      </b-col>
      <!-------------------------- Day / Week swtich buttons End ----------------------------->
    </b-row>
    <b-row>
      <b-col lg="4">
        <b-row>
          <!-------------------------- Group filter Dropdwon Start --------------------------->
          <b-col>
            <b-dropdown
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              :text="$t(groups.find(d => d.key === group).name)"
              variant="outline-primary"
              class="w-100 mb-1 full-width-dropdown"
            >
              <b-dropdown-item
                v-for="item in groups"
                :key="item.key"
                @click="handleGroup(item.key)"
              >
                {{ $t(item.name) }}
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <!-------------------------- Group filter Dropdwon End ----------------------------->
          <!-------------------------- Status filter Dropdwon Start -------------------------->
          <b-col>
            <b-dropdown
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              :text="$t(statuses.find(d => d.key === status).name)"
              variant="outline-primary"
              class="w-100 mb-1 full-width-dropdown"
            >
              <b-dropdown-item
                v-for="item in statuses"
                :key="item.key"
                @click="handleStatus(item.key)"
              >
                {{ $t(item.name) }}
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <!-------------------------- Status filter Dropdwon End ---------------------------->
        </b-row>
      </b-col>
      <b-col lg="8">
        <b-row>
          <b-col>
            <div class="demo-inline-spacing float-right">
              <!-------------------------- Search box Start -------------------------->
              <b-form-group class="m-0">
                <b-form-input
                  id="search_input"
                  :placeholder="$t('Search') + '...'"
                  class="mb-1"
                  style="min-width: 233px;"
                />
              </b-form-group>
              <!-------------------------- Search box End ---------------------------->
              <!-------------------------- Add buttom Start -------------------------->
              <b-button
                v-show="selectedRadioDayWeek === 'day'"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-icon m-0 mb-1 ml-1"
                v-b-modal.modal-add-day
                @click="handleAdd"
              >
                <feather-icon icon="PlusIcon" />
              </b-button>
              <!-------------------------- Add buttom End -------------------------->
              <b-button
                v-show="selectedRadioDayWeek === 'week'"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-icon m-0 mb-1 ml-1"
                v-b-modal.modal-add-week
                @click="handleAdd"
              >
                <feather-icon icon="PlusIcon" />
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!---------------------- Add modal Start ------------------------>
    <b-modal
      id="modal-add-day"
      :title="$t('Add')"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :ok-title="$t('Income')"
      :cancel-title="$t('Cancel')"
      cancel-variant="outline-secondary"
      footer-class="justify-content-end flex-row-reverse"
      @ok="addSubmit"
    >
      <b-form>
        <b-row>
          <b-col>
            <b-form-group
              :label="$t('Add')"
              label-for="add-type"
            >
              <b-dropdown
                id="add-type"
                class="mb-1 full-width-dropdown"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                block
                :text="$t(incometypes.find(d => d.key === addInfo.type).name)"
              >
                <b-dropdown-item
                  v-for="item in incometypes"
                  :key="item.key"
                  @click="handleIncomeType(item.key)"
                >
                  {{ $t(item.name) }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="addInfo.type === 'income'">
          <b-col>
            <b-form-group
              label="Name & Id"
              label-for="add-name"
            >
              <b-dropdown
                id="add-name"
                class="mb-1 full-width-dropdown"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                block
              >
                <template v-slot:button-content>
                  <div class="d-flex align-items-center">
                    <b-avatar
                      :src="addInfo.user.avatar"
                      size="sm"
                      class="mr-50"
                    />
                    <span>{{ addInfo.user.name }}</span>
                  </div>
                </template>
                <b-dropdown-item
                  v-for="item in users"
                  :key="item.id"
                  @click="handleIncomeUser(item.id)"
                >
                  <div class="d-flex align-items-center">
                    <b-avatar
                      :src="item.avatar"
                      class="mr-50"
                    />
                    <div>
                      <span>{{ item.name }}</span><br/>
                      <small class="m-0">{{ item.category + " " + item.uid }}</small>
                    </div>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="addInfo.type === 'expense'">
          <b-col>
            <b-form-group
              :label="$t('Description')"
              label-for="add-description"
            >
              <b-form-input
                id="add-description"
                v-model='addInfo.description'
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group
              :label="$t('Income date')"
              label-for="add-date"
            >
              <LoanDatePicker
                id="add-date"
                v-model="addInfo.date"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit', }"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('Income time')"
              label-for="add-time"
            >
              <b-form-timepicker
                id="add-time"
                v-model="addInfo.time"
                locale='en'
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              :label="$t('Amount')"
              label-for="add-amount"
            >
              <b-input-group
                :prepend="addInfo.currency"
                append=".00"
              >
                <b-form-input
                  id="add-amount"
                  v-model='addInfo.amount'
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <!---------------------- Add modal End -------------------------->

    <b-modal
      id="modal-add-week"
      :title="$t('Add Note')"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      footer-class="justify-content-end flex-row-reverse"
      :ok-title="$t('Save')"
      cancel-variant="outline-secondary"
    >
      <b-form-group
        :label="$t('Date')"
        label-for="note-date"
      >
        <loan-date-picker
          id="note-date"
          :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit', }"
        />
      </b-form-group>
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
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BButton, BDropdown, BDropdownItem, BFormInput, BFormGroup, BModal, BForm, BFormTimepicker, BInputGroup, BAvatar, BFormRadioGroup, BFormTextarea, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LoanDatePicker from '@/views/components/elements/LoanDatePicker.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    LoanDatePicker,
    BFormTimepicker,
    BButton,
    BDropdown,
    BDropdownItem,
    BFormInput,
    BFormGroup,
    BModal,
    BForm,
    BInputGroup,
    BAvatar,
    BFormRadioGroup,
    BFormTextarea,
  },
  props: {
    statuses: Array,
    groups: Array,
    incometypes: Array,
    users: Array,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      selectedRadioDayWeek: 'day',
      optionsRadioDayWeek: [
        { text: this.$i18n.messages[this.$i18n.locale].Day, value: 'day' },
        { text: this.$i18n.messages[this.$i18n.locale].Week, value: 'week' },
      ],
      datePickerId: 'dashboard-daily-date-picker',
      status: this.statuses[0].key,
      group: this.groups[0].key,
      incomeType: this.incometypes[0].key,
      addInfo: {
        type: this.incometypes[0].key || '',
        user: this.users[0] || '',
        description: '',
        date: '',
        time: '',
        amount: '',
        currency: '$',
      },
    }
  },
  methods: {
    handleStatus(key) {
      this.$set(this, 'status', key)
    },
    handleGroup(key) {
      this.$set(this, 'group', key)
    },
    handleIncomeType(key) {
      this.$set(this, 'addInfo', { ...this.addInfo, type: key })
    },
    handleIncomeUser(uId) {
      this.$set(this, 'addInfo', { ...this.addInfo, user: this.users.find(d => d.id === uId) })
    },
    handleAdd() {
    },
    addSubmit() {
    },
    selectedRadioDayWeekChange(e) {
      this.$emit('switchDayWeek', e === 'week')
    },
  },
}
</script>
