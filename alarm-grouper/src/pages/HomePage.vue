<template>
  <q-layout view="lhr lpR lfr">
    <q-page-container>
      <div>
        <h4 class="q-my-lg">Dashboard</h4>
      </div>

      <!-- passs the entire list of cards information to the list component -->
      <!-- :totalActiveAlarms="totalActiveAlarms"
      :totalAlarms="totalAlarms"
      :totalCategories="totalCategories" -->
      <DashCardList v-if="loaded" />

      <q-separator inset class="q-ma-lg" />

      <div>
        <h4 class="q-my-lg">Quick Actions</h4>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <!-- FIRST CARD TO CREATE A NEW CATEGORY -->
          <form @submit.prevent="addCategory">
            <q-card
              flat
              bordered
              class="my-card q-pa-sm q-pb-md"
              :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
            >
              <q-card-section class="q-pt-none">
                <div class="column no-wrap q-gutter-y-md">
                  <div class="col">
                    <q-input
                      label="Category Name..."
                      class="card-input custom-input-padding"
                      v-model="newCategoryName"
                      ref="categoryNameInputRef"
                    />
                  </div>

                  <div class="col">
                    <q-input
                      autogrow
                      placeholder="description..."
                      v-model="newCategoryDescription"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-actions class="row q-py-none">
                <q-btn
                  type="submit"
                  class="col-sm-12 col-xs-12"
                  color="primary"
                  icon-right="category"
                  label="Add Category"
                />
              </q-card-actions>
            </q-card>
          </form>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <!-- SECOND CARD TO CREATE A NEW ALARM -->
          <form @submit.prevent="addAlarm">
            <q-card
              flat
              bordered
              class="my-card q-pa-sm q-pb-lg"
              :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
            >
              <q-card-section class="q-pt-none">
                <div class="column no-wrap q-gutter-y-md">
                  <div class="col">
                    <q-input
                      label="Alarm Name..."
                      class="card-input custom-input-padding"
                      v-model="newAlarmName"
                      ref="alarmNameInputRef"
                    />
                  </div>

                  <!-- category names for select input -->
                  <div
                    class="col"
                    v-if="
                      getCategoryNames.length > 1 &&
                      loadedAlarms &&
                      loadedCategories
                    "
                  >
                    <q-select
                      v-if="getCategoryNames.length > 1"
                      v-model="newCategoryForAlarmName"
                      :options="getCategoryNames"
                      label="Alarm Category"
                    >
                    </q-select>
                  </div>

                  <div class="col">
                    <q-input
                      autogrow
                      placeholder="description..."
                      v-model="newAlarmDescription"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-actions class="row q-py-none">
                <!-- the time action -->
                <div class="q-pa-md">
                  <div class="q-mb-sm">
                    <q-badge color="teal"> Model: {{ time }} </q-badge>
                  </div>

                  <q-btn icon="access_time" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="newAlarmRingTime">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="save"
                            v-close-popup
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-btn>
                </div>

                <!-- the date action -->
                <div class="q-pa-md">
                  <div class="q-mb-sm">
                    <q-badge color="teal"> Model: {{ date }} </q-badge>
                  </div>

                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="newAlarmRingDate">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="save"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>

                <q-btn
                  type="submit"
                  class=""
                  color="secondary col-sm-12 col-xs-12"
                  icon-right="alarm"
                  label="Create"
                />
              </q-card-actions>
            </q-card>
          </form>
        </div>
      </div>

      <div>
        Cat list
        <br />
        {{ categories }}

        <br />
        <br />

        Alarm list
        <br />
        {{ alarms }}
      </div>

      <!-- <RecentActivityList> </RecentActivityList> -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, watch, computed, onUpdated } from "vue";
import DashCardList from "src/components/Dashboard/DashCardList.vue";
import { storeToRefs } from "pinia";
import { useAlarmStore } from "src/stores/AlarmStore";
import { useCategoryStore } from "src/stores/CategoryStore";
import {
  notifyMistake,
  notifySuccess,
} from "src/components/composables/simpleNotifyOnAction";
//for the time and date related refs for the alarm inputs
import {
  date,
  newAlarmRingDate,
  time,
  newAlarmRingTime,
  returnFormattedDate,
  returnFormattedTime,
  updateProxy,
  save,
} from "src/components/composables/useTimeDate";

// for the refs to hold temporary date from forms
import {
  categoryNameInputRef,
  alarmNameInputRef,
  newCategoryName,
  newCategoryColor,
  newCategoryDescription,
  newAlarmName,
  newAlarmDescription,
  newAlarmColor,
  newCategoryForAlarmName,
  loaded,
} from "src/components/composables/tempAlarmandCategoryProperties";

const $q = useQuasar();

import {
  setAlarmNotification,
  requestNotificationPermission,
} from "src/utils/testAlarmHandler";

defineOptions({
  name: "IndexPage",
});

// Initializing data from the store ---------------------------------
const alarmStore = useAlarmStore();
const categoryStore = useCategoryStore();

//fetch alarms and categories
alarmStore.getAlarms();
categoryStore.getCategories();

//destructure ref data from the store
const { alarms, loadedAlarms, activeAlarmCount, alarmCount } =
  storeToRefs(alarmStore);
const {
  categories,
  loadedCategories,
  activeCategoryCount,
  categoryCount,
  getCategoryNames,
  findCategory,
} = storeToRefs(categoryStore);

onMounted(() => {
  console.log("AlarmStore: ", alarmStore);
  console.log("CategoryStore: ", categoryStore);
});

// WATCHERS ----------------------------------------------------
watch(newCategoryName, (newVal) => {
  localStorage.setItem("newCategoryName", newVal);
});
watch(newCategoryDescription, (newVal) => {
  localStorage.setItem("newCategoryDescription", newVal);
});
watch(newCategoryColor, (newVal) => {
  localStorage.setItem("newCategoryColor", newVal);
});
watch(newAlarmName, (newVal) => {
  localStorage.setItem("newAlarmName", newVal);
});
watch(newAlarmDescription, (newVal) => {
  localStorage.setItem("newAlarmDescription", newVal);
});
watch(newCategoryForAlarmName, (newVal) => {
  localStorage.setItem("newCategoryForAlarmName", newVal);
});
watch(newAlarmColor, (newVal) => {
  localStorage.setItem("newAlarmColor", newVal);
});
watch(newAlarmRingTime, (newVal) => {
  localStorage.setItem("newAlarmRingTime", newVal);
});
watch(newAlarmRingDate, (newVal) => {
  localStorage.setItem("newAlarmRingDate", newVal);
});
// watchers ---------------------------------------------

onMounted(() => {
  requestNotificationPermission(); // Request notification permission
  // Set an example alarm (replace with your actual alarm time and sound file)
  const alarmTime = new Date();
  alarmTime.setHours(21);
  alarmTime.setMinutes(27);

  // Path to your alarm sound
  const soundFile = "src/assets/sounds/beat.mp3";

  // Set the alarm notification
  setAlarmNotification(alarmTime, soundFile);

  //finds local data saved that was entered into the forms and used to create an alarm or category
  newCategoryName.value = localStorage.getItem("newCategoryName") || "";
  newCategoryDescription.value =
  localStorage.getItem("newCategoryDescription") || "";
  newCategoryColor.value = localStorage.getItem("newCategoryColor") || "";
  newAlarmName.value = localStorage.getItem("newAlarmName") || "";
  newAlarmDescription.value = localStorage.getItem("newAlarmDescription") || "";
  newCategoryForAlarmName.value =
  localStorage.getItem("newCategoryForAlarmName") || "";
  newAlarmColor.value = localStorage.getItem("newAlarmColor") || "";
  newAlarmRingTime.value = localStorage.getItem("newAlarmRingTime") || "";
  newAlarmRingDate.value = localStorage.getItem("newAlarmRingDate") || "";
});

const addCategory = () => {
  console.log("adding new category...");
  if (
    newCategoryName.value.trim() === "" ||
    newCategoryName.value.trim().length > 40 ||
    newCategoryName.value.trim().length < 2
  ) {
    const message = "Invalid category name";
    console.log(message);
    notifyMistake($q, message);
    return;
  } else if (newCategoryDescription.value.trim().length > 100) {
    const message = "Invalid category description (too long)";
    console.log(message);
    notifyMistake($q, message);
    return;
  } else if (categoryStore.findCategory(newCategoryName.value.trim())) {
    const message = "Invalid category name (already exists)";
    console.log(message);
    notifyMistake($q, message);
    return;
  } else {
    categoryStore.addCategory({
      //use the store action to add new category
      name: newCategoryName.value.trim(),
      description: newCategoryDescription.value.trim(),
      color: newCategoryColor.value.trim(),
      createdAt: new Date(),
    });
    newCategoryName.value = "";
    newCategoryDescription.value = "";
    newCategoryColor.value = "";
    categoryNameInputRef.value.focus();
    notifySuccess($q, "New Category Added"); //param1 is of notification type in quasar
  }
};

const addAlarm = () => {
  console.log("adding new alarm...");
  if (
    newAlarmName.value.trim() === "" ||
    newAlarmName.value.trim().length > 40 ||
    newAlarmName.value.trim().length < 2
  ) {
    const message = "Invalid alarm name";
    console.log(message);
    notifyMistake($q, message);
    return;
  } else if (newAlarmDescription.value.trim().length > 100) {
    const message = "Invalid alarm description (too long)";
    console.log(message);
    notifyMistake($q, message);
    return;
  } else {
    alarmStore.addAlarm({
      name: newAlarmName.value.trim(),
      description: newAlarmDescription.value.trim(),
      category: newCategoryForAlarmName.value.trim(),
      color: newAlarmColor.value.trim(),
      ringTime: newAlarmRingTime.value,
      ringDate: newAlarmRingDate.value,
      active: true,
      createdAt: new Date(),
    });
    newAlarmName.value = "";
    newAlarmDescription.value = "";
    newCategoryForAlarmName.value = "";
    newAlarmColor.value = "";
    newAlarmRingTime.value = null;
    newAlarmRingDate.value = returnFormattedDate();
    save();
    alarmNameInputRef.value.focus();
    notifySuccess($q, "New Alarm Added");
  }
};

// ----------------------------------------------------------------
// const RecentActivities = {
//   pushRecentActivity(action, actionOn, object, createdAt){
//     this.action = action;
//     this.actionOn = actionOn;
//     this.object = object;
//     this.createdAt = createdAt;
//   },
//   popLastRecentActivity(){
//     this.activities.pop()
//   },
//   action: '',             // can be new, edit, delete
//   actionOn: '',           // can be category or alarm, it is the item that was affected
//   object: [],             //the object that was acted on
//   createdAt: null,
//   activities: []          //object that stores the information about each recent activity
// }
</script>
