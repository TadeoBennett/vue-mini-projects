
import { defineStore, storeToRefs } from 'pinia';
import { useAlarmStore } from './AlarmStore';
import { useCategoryStore } from './CategoryStore';

const alarmStore = useAlarmStore();
const categoryStore = useCategoryStore();

const {activeAlarmCount, alarmCount} = storeToRefs(alarmStore)
const {activeCategoryCount, categoryCount} = storeToRefs(categoryStore)

export const useDashStore = defineStore('dashStore', {
  state: () => ({
    dashCards: [
      {
        title: "Total Alarms",
        color: "#B5D1E3",
        value: alarmCount,
      },
      {
        title: "Total Categories",
        color: "#C5D8E8",
        value: categoryCount,
      },
      {
        title: "Active Alarms",
        color: "#CCCCF5",
        value: activeAlarmCount,
      },
      {
        title: "Categories with Active Alarms",
        color: "#E0E0E0",
        value: "###",
      },
    ]
  }),
  getters: {
    getDashCards(){
      return this.dashCards
    }
  },
  actions: {
  }
});
