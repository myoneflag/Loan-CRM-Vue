<template>
  <b-card no-body>
    <b-card-header>
      <div class="d-flex align-items-center">
        <feather-icon
          size="24"
          class="mr-1"
          icon="ListIcon"
        />
        <b-card-title class="ml-25">
          {{ $t('Note and Outcome') }}
        </b-card-title>
      </div>
    </b-card-header>
    <b-card-body>
      <div class="h-100 overflow-auto" style="padding-top: 0px;">
        <app-timeline class="pr-1">
          <app-timeline-item
            v-for="(item, index) in data"
            :key="index"
            :variant="item.type === 'note' ? 'warning' : 'danger'"
            :icon="typeIcons[item.type]"
          >
            <div class="d-flex justify-content-between flex-sm-row flex-column align-items-center mb-sm-0 mb-1">
              <div class="flex-grow-1 pr-1">
                <h6 style="font-size: 13px;">{{ item.name }}</h6>
                <h6 class="text-right text-muted mb-0" style="font-size: 11px;">{{ item.time }}</h6>
              </div>
              <h6 class="text-muted text-center mb-0" style="width: 130px; font-size: 12px;">{{ item.userName }}</h6>
              <h6
                v-if="item.amount < 0"
                class="timeline-item-time text-nowrap ml-1 mb-0 text-right" style="width: 70px; font-size: 13px;"
              >
                {{ `-${item.currency + Math.abs(item.amount)}` }}
              </h6>
              <h6
                v-else
                class="timeline-item-time text-nowrap ml-1 mb-0 text-right"
                style="width: 70px; font-size: 13px;"
              >
                {{ item.currency + item.amount }}
              </h6>
            </div>
          </app-timeline-item>
        </app-timeline>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, VBTooltip,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    AppTimeline,
    AppTimelineItem,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    data: Array,
  },
  data() {
    return {
      typeIcons: {
        note: 'EditIcon',
        outcome: 'DollarSignIcon',
      },
    }
  },
}
</script>
