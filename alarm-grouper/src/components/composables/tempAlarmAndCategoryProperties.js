import { ref } from 'vue';
import { useAlarmStore } from 'src/stores/AlarmStore';
import { useCategoryStore } from 'src/stores/CategoryStore';
import { storeToRefs } from 'pinia';

// Initializing data from the store ---------------------------------
const alarmStore = useAlarmStore();
const categoryStore = useCategoryStore();
//fetch alarms and categories
alarmStore.getAlarms();
categoryStore.getCategories();

const { loadedAlarms } = storeToRefs(alarmStore)
const { loadedCategories } = storeToRefs(categoryStore)


// Reactive properties for the data on this page
const categoryNameInputRef = ref(null); // used to add focus to the inputs after adding new values
const alarmNameInputRef = ref(null);    // used to add focus to the inputs after adding new values
const newCategoryName = ref("");
const newCategoryColor = ref("");
const newCategoryDescription = ref("");
const newAlarmName = ref("");
const newAlarmDescription = ref("");
const newAlarmColor = ref("");
const newCategoryForAlarmName = ref(null);

const loaded = ref(loadedAlarms && loadedCategories);  // Initialize loaded as false

// Export the reactive properties
export {
  categoryNameInputRef,
  alarmNameInputRef,
  newCategoryName,
  newCategoryColor,
  newCategoryDescription,
  newAlarmName,
  newAlarmDescription,
  newAlarmColor,
  newCategoryForAlarmName,
  loaded
};
