<template>
  <div>
    <!------------------------------ Filter Card Start ----------------------------->
    <b-row>
      <b-col lg="12">
        <filter-card
          :statuses="statusItems"
          :groups="groupItems"
          :incometypes="incometypes"
          :users="users"
          v-on:switchDayWeek="value => isWeek = value"
        />
      </b-col>
    </b-row>
    <!------------------------------ Day Content Start ----------------------------->
    <div v-if="!isWeek">
      <!---------------------------- Summary View Card Start ----------------------->
      <b-row>
        <b-col lg="4" class="h-100">
          <div class="d-flex flex-column justify-content-between">
            <LabelsPieCard :data="receivableAmount" class="mb-1"/>
            <LabelsPieCard :data="penaltyAmount" class="mb-1"/>
          </div>
        </b-col>
        <b-col lg="2" class="pb-1" style="height: 320px">
          <VerticalLabelsCard :data="otherAmount" class="h-100" />
        </b-col>
        <b-col lg="6" class="pb-1" style="height: 320px">
          <ListCard :data="notesOutcomes" class="h-100" />
        </b-col>
      </b-row>
      <!---------------------------- Paid list Start ---------------------->
      <b-row>
        <b-col lg="12">
          <b-card no-body class="overflow-hidden mb-1">
            <b-table
              id="all-table"
              responsive
              :items="allTableInfo.items"
              :fields="allTableInfo.fields"
              table-class="custom-table"
            >
              <!-- Column - Status Start -->
              <template #cell(status)="data">
                <b-dropdown
                  :text="$t(statusItems.find(d => d.key === data.value).name)"
                  :variant="`flat-${statusItems.find(d => d.key === data.value).type}`"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  size="sm"
                  style="width: 100px;"
                >
                  <b-dropdown-item
                    v-for="item in statusItems" :key="item.key"
                    :active="item.key === data.value"
                    @click="handleStatusInAllTable(item.key, data.item.id)"
                  >
                    {{ $t(item.name) }}
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <!-- Column - Status End -->
              <!-- Column - Paid Start -->
              <template #cell(paid)="data">
                <div class="w-100 text-right">
                  <b-link
                    href="#"
                    class="link-text"
                    v-b-modal.modal-paid
                    @click="handlePaidModal(data.item)"
                  >
                    {{ data.item.currency + data.value }}
                  </b-link>
                </div>
              </template>
              <!-- Column - Paid End -->
              <!-- Column - Note Start -->
              <template #cell(note)="data">
                <b-link
                  href="#"
                  class="link-text"
                  v-b-modal.modal-note
                  @click="handleNoteModal(data.value)"
                >
                  <div class="w-100 text-left">
                    <small class="m-0">{{ data.value.note }}</small><br/>
                    <small class="m-0">{{ data.value.date + ' ' + data.value.time }}</small>
                  </div>
                </b-link>
              </template>
              <!-- Column - Note End -->
              <!-- Column - penalty Start -->
              <template #cell(penalty)="data">
                <div class="w-100 text-right">{{ data.value }}</div>
              </template>
              <!-- Column - penalty End -->
              <!-- Column - User Start -->
              <template #cell(user)="data">
                <div class="d-flex align-items-center" style="width: 160px;">
                  <div class="pr-50">
                    <b-avatar
                      :src="require('@/assets/images/portrait/small/avatar-s-20.jpg')"
                    />
                  </div>
                  <div>
                    <b-link
                      to="customer"
                    >
                      <h6 class="font-weight-bolder mb-0 text-primary">
                        {{ data.value.name }}
                      </h6>
                    </b-link>
                    <small class="m-0">{{ data.value.category + " " + data.value.uid }}</small>
                  </div>
                </div>
              </template>
              <!-- Column - User End -->
              <template #head()="data">
                <div style="min-width: 30px;">
                  {{ $t(data.label) }}
                </div>
              </template>
            </b-table>
          </b-card>
          <!-- Paid modal in all table Start -->
          <b-modal
            id="modal-paid"
            :title="$t(paidModalTitle)"
            :hide-header-close="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"
            footer-class="justify-content-end flex-row-reverse"
            :ok-title="$t('Save')"
            :cancel-title="$t('Cancel')"
            cancel-variant="outline-secondary"
            @ok="paidSubmit"
          >
            <b-form>
              <b-row>
                <b-col>
                  <b-form-group
                    :label="$t('Amount')"
                    label-for="paid-amount"
                  >
                    <b-input-group
                      :prepend="paidInfo.currency"
                      append=".00"
                    >
                      <b-form-input
                        id="paid-amount"
                        v-model='paidInfo.amount'
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- Paid modal in all table End -->
          <!-- Note modal in all table Start -->
          <b-modal
            id="modal-note"
            :title="$t('Add/Edit')"
            footer-class="justify-content-end flex-row-reverse"
            :ok-title="$t('Save')"
            :cancel-title="$t('Cancel')"
            cancel-variant="outline-secondary"
            @ok="noteSubmit"
          >
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    :label="$t('Date')"
                    label-for="paid-date"
                  >
                    <b-form-datepicker
                      id="paid-date"
                      v-model="noteInfo.date"
                      :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit', }"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    :label="$t('Time')"
                    label-for="paid-time"
                  >
                    <b-form-timepicker
                      id="paid_time"
                      v-model="noteInfo.time"
                      locale='en'
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    :label="$t('Note')"
                    label-for="textarea-note"
                  >
                    <b-form-textarea
                      id="textarea-note"
                      size="sm"
                      placeholder="Content"
                      v-model="noteInfo.note"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- Note modal in all table End -->
        </b-col>
      </b-row>
      <!---------------------------- penalty list Start ------------------>
      <b-row>
        <b-col>
          <b-card no-body class="mb-1">
            <b-table
              id="penalty-table"
              responsive
              :items="penaltyTableInfo.items"
              :fields="penaltyTableInfo.fields"
              :caption-top="true"
              caption-html="<div class='px-2 text-uppercase'><b>Penalty list</b></div>"
              table-class="custom-table"
              :hover="true"
            >
              <!-- Column - Status Start -->
              <template #cell(status)="data">
                <b-dropdown
                  :text="$t(statusItems.find(d => d.key === data.value).name)"
                  :variant="`flat-${statusItems.find(d => d.key === data.value).type}`"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  size="sm"
                  style="width: 100px;"
                >
                  <b-dropdown-item
                    v-for="item in statusItems" :key="item.key"
                    :active="item.key === data.value"
                    @click="handleStatusInpenaltyTable(item.key, data.item.id)"
                  >
                    {{ $t(item.name) }}
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <!-- Column - Status End -->
              <!-- Column - User Start -->
              <template #cell(user)="data">
                <div class="d-flex align-items-center" style="width: 160px;">
                  <div class="pr-50">
                    <b-avatar
                      :src="data.value.avatar"
                    />
                  </div>
                  <div>
                    <b-link
                      to="customer"
                    >
                      <h6 class="font-weight-bolder mb-0 text-primary">
                        {{ data.value.name }}
                      </h6>
                    </b-link>
                    <small class="m-0">{{ data.value.category + " " + data.value.uid }}</small>
                  </div>
                </div>
              </template>
              <!-- Column - User End -->
              <!-- Column - Loan Start -->
              <template #cell(loan)="data">
                <div class="w-100 text-right">
                  <p class="m-0">{{ data.item.currency + data.value.price1 }}</p>
                  <small class="m-0">{{ data.item.currency + data.value.price2 }}</small>
                </div>
              </template>
              <!-- Column - Loan End -->
              <!-- Column - penalty Start -->
              <template #cell(penalty)="data">
                <p class="m-0">{{ data.item.currency + data.value }}</p>
              </template>
              <!-- Column - penalty End -->
              <!-- Column - Paid Start -->
              <template #cell(paid)="data">
                <div class="w-100 text-right">
                  <b-link
                    href="#"
                    class="link-text"
                    v-b-modal.modal-penalty-paid
                    @click="handlePenaltyPaidModal(data.item)"
                  >
                    {{ data.item.currency + data.value }}
                  </b-link>
                </div>
              </template>
              <!-- Column - Paid End -->
              <!-- Column - OverShort Start -->
              <template #cell(overShort)="data">
                <div class="w-100 text-right">
                  <small class="m-0 text-success">{{ data.value.over > 0 ? data.item.currency + data.value.over : '-' }}</small><br/>
                  <small class="m-0 text-danger">{{ data.value.short > 0 ? data.item.currency + data.value.short : '-' }}</small>
                </div>
              </template>
              <!-- Column - OverShort End -->
              <!-- Column - Note Start -->
              <template #cell(note)="data">
                <div class="w-100 text-left">
                  <small class="m-0">{{ data.value.note }}</small><br/>
                  <small class="m-0">{{ data.value.date + ' ' + data.value.time }}</small>
                </div>
              </template>
              <!-- Column - Note End -->
              <template #head()="data">
                <div style="min-width: 30px;">
                  {{ $t(data.label) }}
                </div>
              </template>
            </b-table>
          </b-card>
          <!-- Paid modal in all table Start -->
          <b-modal
            id="modal-penalty-paid"
            :title="$t('Edit')"
            :hide-header-close="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"
            footer-class="justify-content-end flex-row-reverse"
            :ok-title="$t('Save')"
            :cancel-title="$t('Cancel')"
            cancel-variant="outline-secondary"
            @ok="paidSubmit"
          >
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    :label="$t('Date')"
                    label-for="paid-date"
                  >
                    <b-form-datepicker
                      id="paid-date"
                      v-model="penaltyPaidInfo.date"
                      :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit', }"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    :label="$t('Time')"
                    label-for="paid-time"
                  >
                    <b-form-timepicker
                      id="paid_time"
                      v-model="penaltyPaidInfo.time"
                      locale='en'
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    :label="$t('Amount')"
                    label-for="paid-amount"
                  >
                    <b-input-group
                      :prepend="penaltyPaidInfo.currency"
                      append=".00"
                    >
                      <b-form-input
                        id="paid-amount"
                        v-model='penaltyPaidInfo.amount'
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- Paid modal in all table End -->
        </b-col>
      </b-row>
    </div>
    <!------------------------------ Week Content Start ----------------------------->
    <div v-else>
      <b-row>
        <b-col cols="6">
          <LabelsPieCard :data="receivableAmount" class="mb-1"/>
        </b-col>
        <b-col cols="6">
          <LabelsPieCard :data="penaltyAmount" class="mb-1"/>
        </b-col>
      </b-row>
      <b-card no-body class="border">
        <WeekLogView
          :data="weekLogData"
          :statuses="statusItems"
        />
      </b-card>
    </div>
  </div>
</template>
<script>
import {
  BRow, BCol, BCard, BTable, BDropdown, BDropdownItem, BLink, BModal, BForm, BFormGroup, BFormInput, BFormDatepicker, BFormTimepicker, BInputGroup, BAvatar, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import FilterCard from './components/FilterCard.vue'
import LabelsPieCard from './components/LabelsPieCard.vue'
import VerticalLabelsCard from './components/VerticalLabelsCard.vue'
import ListCard from './components/ListCard.vue'
import WeekLogView from './components/WeekLogView.vue'

export default {
  components: {
    FilterCard,
    LabelsPieCard,
    VerticalLabelsCard,
    ListCard,
    WeekLogView,
    BRow,
    BCol,
    BCard,
    BTable,
    BDropdown,
    BDropdownItem,
    BLink,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    BFormTimepicker,
    BInputGroup,
    BAvatar,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      isWeek: false,
      receivableAmount: {
        fields: [
          {
            label: 'Receivable Amount',
            value: 89000,
            preString: '$',
            size: 'large',
          },
          {
            label: 'Received',
            value: 28000,
            preString: '$',
            size: 'small',
          },
        ],
        chartData: [
          {
            name: 'Settled',
            value: 230,
          },
          {
            name: 'Processing',
            value: 480,
          },
        ],
      },
      penaltyAmount: {
        fields: [
          {
            label: 'Receivable penalty',
            value: 28000,
            preString: '$',
            size: 'large',
          },
          {
            label: 'Received',
            value: 2000,
            preString: '$',
            size: 'small',
          },
        ],
        chartData: [
          {
            name: 'Settled',
            value: 150,
          },
          {
            name: 'Processing',
            value: 110,
          },
        ],
      },
      otherAmount: [
        {
          label: 'Allowance',
          value: 2000,
          preString: '$',
          size: 'large',
        },
        {
          label: 'Penalty',
          value: 3000,
          preString: '$',
          size: 'large',
        },
        {
          label: 'Total outcome',
          value: 5000,
          preString: '$',
          size: 'large',
        },
      ],
      notesOutcomes: [
        {
          name: 'Air-conditioning repair',
          userName: 'admin',
          time: '21:25',
          amount: 7400,
          currency: '$',
          type: 'outcome',
        },
        {
          name: 'Purchased modem',
          userName: 'lucky1',
          time: '21:25',
          amount: -2400,
          currency: '$',
          type: 'note',
        },
        {
          name: 'Air-conditioning repair',
          userName: 'lucky2',
          time: '21:25',
          amount: -7400,
          currency: '$',
          type: 'outcome',
        },
        {
          name: 'Purchased modem',
          userName: 'lucky3',
          time: '21:25',
          amount: 2400,
          currency: '$',
          type: 'note',
        },
        {
          name: 'Air-conditioning repair',
          userName: 'lucky4',
          time: '21:25',
          amount: 7400,
          currency: '$',
          type: 'outcome',
        },
        {
          name: 'Purchased modem',
          userName: 'lucky5',
          time: '21:25',
          amount: 2400,
          currency: '$',
          type: 'note',
        },
      ],
      allTableInfo: {
        fields: [
          { key: 'status', label: 'Status', sortable: true },
          { key: 'user', label: 'User' },
          { key: 'loan', label: 'Loan' },
          {
            key: 'payable',
            label: 'Payable',
            sortable: true,
            class: 'text-right',
          },
          { key: 'paid', label: 'Paid', sortable: true },
          { key: 'allowance', label: 'Allowance', sortable: true },
          { key: 'penalty', label: 'Penalty', sortable: true },
          { key: 'note', label: 'Note' },
        ],
        items: [
          {
            id: '0',
            status: 'processing',
            user: {
              id: 'uuid001',
              name: 'Loan',
              uid: 'admin',
              category: 'admin',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: '400000',
            payable: '2450',
            paid: '500',
            allowance: '',
            penalty: '1950',
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '$',
          },
          {
            id: '1',
            status: 'observed',
            user: {
              id: 'uuid002',
              name: 'YangMing',
              uid: 'lucky',
              category: 'seller',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: '400000',
            payable: '2450',
            paid: 0,
            allowance: '',
            penalty: '1950',
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '¥',
          },
          {
            id: '2',
            status: 'closed',
            user: {
              id: 'uuid003',
              name: 'YangYang',
              uid: 'myone',
              category: 'buyer',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: '400000',
            payable: '2450',
            paid: '670',
            allowance: '',
            penalty: '1950',
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '¥',
          },
          {
            id: '3',
            status: 'bad_debt',
            user: {
              id: 'uuid004',
              name: 'BingBing',
              uid: 'kungfu',
              category: 'online',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: '400000',
            payable: '2450',
            paid: '100',
            allowance: '',
            penalty: '1950',
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '$',
          },
        ],
      },
      penaltyTableInfo: {
        fields: [
          { key: 'status', label: 'Status', sortable: true },
          { key: 'user', label: 'User' },
          { key: 'loan', label: 'Loan', class: 'text-right' },
          {
            key: 'penalty',
            label: 'Penalty',
            sortable: true,
            class: 'text-right',
          },
          {
            key: 'paid',
            label: 'Paid',
            sortable: true,
            class: 'text-right',
          },
          {
            key: 'overShort',
            label: 'Over/Short',
            sortable: true,
            class: 'text-right',
          },
          { key: 'note', label: 'Note' },
        ],
        items: [
          {
            id: '0',
            status: 'processing',
            user: {
              id: 'uuid001',
              name: 'Loan',
              uid: 'admin',
              category: 'admin',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: {
              price1: 400000,
              price2: 5550,
            },
            penalty: 1950,
            paid: 600,
            overShort: {
              over: 2300,
              short: 890,
            },
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '$',
          },
          {
            id: '1',
            status: 'observed',
            user: {
              id: 'uuid002',
              name: 'YangMing',
              uid: 'lucky',
              category: 'seller',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: {
              price1: 400000,
              price2: 5550,
            },
            penalty: 1950,
            paid: 700,
            overShort: {
              over: 0,
              short: 8000,
            },
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '$',
          },
          {
            id: '2',
            status: 'closed',
            user: {
              id: 'uuid003',
              name: 'YangMing',
              uid: 'myone',
              category: 'buyer',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: {
              price1: 400000,
              price2: 5550,
            },
            penalty: 1950,
            paid: 500,
            overShort: {
              over: 600,
              short: 0,
            },
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '$',
          },
          {
            id: '3',
            status: 'bad_debt',
            user: {
              id: 'uuid004',
              name: 'BingBing',
              uid: 'kungfu',
              category: 'online',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
            },
            loan: {
              price1: 400000,
              price2: 5550,
            },
            penalty: 1950,
            paid: 500,
            overShort: {
              over: 600,
              short: 2300,
            },
            note: {
              note: 'Due to',
              date: '03/25/21',
              time: '20:00',
            },
            currency: '$',
          },
        ],
      },
      statusItems: [
        {
          key: 'processing',
          name: 'Processing',
          type: 'primary',
        },
        {
          key: 'observed',
          name: 'Observed',
          type: 'warning',
        },
        {
          key: 'closed',
          name: 'Closed',
          type: 'success',
        },
        {
          key: 'bad_debt',
          name: 'Bad debt',
          type: 'danger',
        },
      ],
      groupItems: [
        {
          key: 'all',
          name: 'All',
        },
        {
          key: 'group1',
          name: 'Group 1',
        },
        {
          key: 'group2',
          name: 'Group 2',
        },
        {
          key: 'group3',
          name: 'Group 3',
        },
      ],
      incometypes: [
        {
          key: 'income',
          name: 'Income',
        },
        {
          key: 'expense',
          name: 'Expense',
        },
        {
          key: 'note',
          name: 'Note',
        },
      ],
      paidInfo: {
        date: '',
        time: '',
        amount: '',
        currency: '$',
      },
      penaltyPaidInfo: {
        date: '',
        time: '',
        amount: '',
        currency: '$',
      },
      noteInfo: {
        date: '',
        time: '',
        note: '',
      },
      users: [
        {
          id: 'uuid001',
          name: 'Loan',
          uid: 'admin',
          category: 'admin',
          avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
        },
        {
          id: 'uuid002',
          name: 'YangMing',
          uid: 'lucky',
          category: 'seller',
          avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
        },
        {
          id: 'uuid003',
          name: 'PaoYuang',
          uid: 'myone',
          category: 'buyer',
          avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
        },
        {
          id: 'uuid004',
          name: 'BingBing',
          uid: 'kungfu',
          category: 'online',
          avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
        },
      ],
      weekLogData: [
        {
          date: 'Sun 5/2',
          note: 'NoteNoteNoteNote',
          admin: {
            id: 'a-0',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-0',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'observed',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
            {
              id: 'u-1',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'processing',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
        {
          date: 'Mon 5/3',
          note: 'NoteNoteNoteNote',
          admin: {
            id: 'a-1',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-3',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'closed',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
            {
              id: 'u-4',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'bad_debt',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
        {
          date: 'Tue 5/4',
          note: 'NoteNoteNoteNote',
          admin: {
            id: 'a-2',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-0',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'observed',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
            {
              id: 'u-1',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'processing',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
        {
          date: 'Wed 5/5',
          note: 'NoteNoteNoteNote',
          admin: {
            id: 'a-3',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-0',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'observed',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
            {
              id: 'u-1',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'processing',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
        {
          date: 'Thu 5/6',
          note: 'NoteNoteNoteNote',
          admin: {
            id: 'a-4',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-0',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'observed',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
            {
              id: 'u-1',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'processing',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
        {
          date: 'Fri 5/7',
          note: 'NoteNoteNoteNote',
          admin: {
            uid: 'a-5',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-1',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'processing',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
        {
          date: 'Sat 5/8',
          note: 'NoteNoteNoteNote',
          admin: {
            id: 'a-6',
            name: 'admin_name',
          },
          users: [
            {
              id: 'u-0',
              category: 'Category',
              name: 'BingBing',
              uid: 'kungfu',
              avatar: '@/assets/images/portrait/small/avatar-s-20.jpg',
              status: 'observed',
              payInfo: {
                type: 'Payable',
                amount: 3450,
                currency: '$',
              },
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleStatusInAllTable(key, rowId) {
      const tableData = { ...this.allTableInfo }
      tableData.items.find(d => d.id === rowId).status = key
      this.$set(this, 'allTableInfo', tableData)
    },
    handleStatusInpenaltyTable(key, rowId) {
      const tableData = { ...this.penaltyTableInfo }
      tableData.items.find(d => d.id === rowId).status = key
      this.$set(this, 'penaltyTableInfo', tableData)
    },
    handlePaidModal(row) {
      this.$set(this, 'paidInfo', {
        ...this.paidInfo,
        amount: row.paid,
        currency: row.currency,
      })
    },
    handlePenaltyPaidModal(row) {
      this.$set(this, 'penaltyPaidInfo', {
        ...this.penaltyPaidInfo,
        amount: row.paid,
        currency: row.currency,
      })
    },
    handleNoteModal(note) {
      this.$set(this, 'noteInfo', {
        ...note,
      })
    },
    paidSubmit() {
      console.log('paid')
    },
    noteSubmit() {
      console.log('note')
    },
  },
  computed: {
    paidModalTitle() {
      let status = 'Add'
      if (this.paidInfo.amount !== 0) {
        status = 'Edit'
      }
      return `${status} Amount`
    },
  },
}
</script>

<style lang="scss">
</style>
