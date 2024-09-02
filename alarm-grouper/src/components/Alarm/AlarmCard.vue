<template>
  <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
    <q-card class="my-card" flat bordered :class="{unsaved: unsavedChanges}">
      <q-card-section class="q-pb-none-sm">
        <div class="column q-gutter-y-sm">
          <div class="col row flex nowrap">
            <input
              class="category-input"
              type="text"
              v-model="alarm.name"
              placeholder="New Category name..."
            />
          </div>
          <div class="col">
            <q-select
              v-model="alarm.category"
              :options="getCategoryNames"
              label="Category"
              dense
              hide-bottom-space
              value
            />
          </div>
          <div class="col">
            <q-input
              autogrow
              placeholder="description..."
              v-model="alarm.description"
              dense
            />
          </div>

          <!-- for the date and time input -->
          <div class="col">
            <div class="q-pa-none">
              <div class="q-gutter-sm row">
                <div class="col">
                  <q-input dense v-model="alarm.ringTime" mask="time">
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="alarm.ringTime" format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <q-input dense v-model="alarm.ringDate" mask="date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="alarm.ringDate">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <!-- for the date and time input -->
        </div>
        <!-- <div class="text-caption text-grey">
            <span class="description">
            </span>
          </div> -->
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-card-actions
          horizontal
          class="alarm-card-actions q-pa-none justify-start q-gutter-y-sm"
        >
          <q-btn
            class="col-auto"
            outline
            color="orange"
            icon="palette"
            size="sm"
          >
            <q-tooltip transition-show="flip-right" :delay="500" class="bg-orange">Style this alarm</q-tooltip>
          </q-btn>

          <q-btn v-if="!alarm.active"
            class="col-auto"
            outline
            color="pink"
            icon="timelapse"
            size="sm"
            label="Enable"
            @click="toggleAlarmActivation(alarm)"
          >
            <q-tooltip transition-show="flip-right" :delay="500" class="bg-pink">Make this alarm active</q-tooltip>
          </q-btn>
          <q-btn v-else-if="alarm.active"
            class="col-auto"
            color="pink"
            icon="check"
            size="sm"
            label="Enabled"
            @click="toggleAlarmActivation(alarm)"
          >
            <q-tooltip transition-show="flip-right" :delay="500" class="bg-pink">Alarm is active. Click to disable</q-tooltip>
          </q-btn>


          <q-btn
            class="col-auto"
            outline
            color="primary"
            icon="save"
            size="sm"
            label="Save"
            @click="updateAlarm(alarm)"
          >
            <q-tooltip transition-show="flip-right" :delay="500" class="bg-primary">Update your changes</q-tooltip>
          </q-btn>
          <!-- <q-btn class="glossy" round color="primary" icon="cloud_upload" /> -->
        </q-card-actions>
      </q-card-section>
      <input type="text" @saveChanges="handleSaveChanges">
    </q-card>
  </div>
</template>

<script setup>
import { ref, watch} from "vue";
import { useCategoryStore } from "src/stores/CategoryStore";
import { useAlarmStore } from "src/stores/AlarmStore";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { notifyMistake, notifySuccess } from "../composables/simpleNotifyOnAction";

const props = defineProps(["alarm"]);

const $q = useQuasar()

const categoryStore = useCategoryStore();
const alarmStore = useAlarmStore();
categoryStore.getCategories();
alarmStore.getAlarms();


const { getCategoryNames } = storeToRefs(categoryStore);


const toggleAlarmActivation = (alarm) =>{
  alarm.active = !alarm.active

  console.log("alarm focused: ", alarm.name)
  console.log("alarm enabled: ", alarm.active)
}

const updateAlarm = (alarm)=>{
  console.log("intital alarm value: ", initialAlarm.value)
  initialAlarm.value = alarmStore.updateAlarm(alarm)
  console.log("updated alarm value: ", initialAlarm.value)
  unsavedChanges.value = false
  notifySuccess($q, "Alarm Updated")
}

const unsavedChanges = ref(false)

const initialAlarm = ref({ ...props.alarm }); // Use a ref to store initial values
// Watch for changes in the alarm object
watch(() => props.alarm, (newAlarm) => {
    // Compare each property of the current alarm with the initial alarm
    unsavedChanges.value =
      newAlarm.name !== initialAlarm.value.name ||
      newAlarm.category !== initialAlarm.value.category ||
      newAlarm.description !== initialAlarm.value.description ||
      newAlarm.color !== initialAlarm.value.color ||
      newAlarm.active !== initialAlarm.value.active ||
      newAlarm.ringTime !== initialAlarm.value.ringTime ||
      newAlarm.ringDate !== initialAlarm.value.ringDate;
    if (unsavedChanges.value === true) {
      console.log("changes unsaved on alarm with name: ", props.alarm.name)
    }
  },
  { deep: true } // Ensure deep watching of the object properties
);


</script>

<style lang="scss" scoped>
input,
textarea {
  border: none;
  background: none;
  outline: none;
  // background: red;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  //overflow-y: hidden; /* Hide vertical scrollbar */
  // resize: none; /* Prevent manual resizing */
  // height: auto; /* Initial height */
  resize: vertical;
}

textarea {
  border: 0.5px solid lightgrey;
}

.category-input {
  font-size: medium;
  font-weight: bolder;
}

.description-input,
select {
  font-size: smaller;
  width: 100%;
}

select {
  padding: 5px 0px 5px 0px;
  background: none;
  border: none;
  border-bottom: 1px solid lightgrey;
}

.description-input {
  max-height: 70px;
  min-height: 25px;
  height: 25px;
}

.alarm-card-actions,
.q-btn {
  font-size: smaller;
}

.palette-colors {
  font-size: medium;
}
.date-and-time {
  padding-right: 0px;
  padding-left: 0px;
  margin-bottom: 0px;
  font-size: smaller;
}

.unsaved{
  border-color: lightcoral;
}
</style>
