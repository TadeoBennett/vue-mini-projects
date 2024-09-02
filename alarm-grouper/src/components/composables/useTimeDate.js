import { ref } from 'vue';

let objectDate = new Date();

const returnFormattedDate = () => {
  // Adds 1 to the month because it is 0-based, and uses padStart to add a 0 prefix to singular digits
  return `${objectDate.getFullYear()}/${String(objectDate.getMonth() + 1).padStart(2, '0')}/${String(objectDate.getDate()).padStart(2, '0')}`;
};

const returnFormattedTime = () => {
  return objectDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const date = ref(returnFormattedDate());
const newAlarmRingDate = ref(returnFormattedDate());
const time = ref('not set');
const newAlarmRingTime = ref(null);

const updateProxy = () => {
  date.value = newAlarmRingDate.value;
  time.value = newAlarmRingTime.value;
};

const save = () => {
  date.value = newAlarmRingDate.value;
  time.value = newAlarmRingTime.value == null ? 'not set' : newAlarmRingTime.value;
};

export {
  date,
  newAlarmRingDate,
  time,
  newAlarmRingTime,
  returnFormattedDate,
  returnFormattedTime,
  updateProxy,
  save,
};
