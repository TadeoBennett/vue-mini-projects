import { defineStore } from "pinia";
import ActiveAlarms from "src/components/Alarm/ActiveAlarms.vue";
import { Alarm } from "src/models/Alarm";

export const useAlarmStore = defineStore("alarmStore", {
  state: () => ({
    alarms: [] as Alarm[] | [],
    loadedAlarms: false,
  }),
  getters: {
    activeAlarmCount() {
      return this.alarms.reduce((p, c) => {
        //p and c is the previous and current value
        return c.active ? p + 1 : p;
      }, 0);
    },
    alarmCount: (state) => {
      return state.alarms.length;
    },
    activeAlarms() {
      return this.alarms.filter((alarm) => alarm.active);
    },
  },
  actions: {
    async incrementAlarmIdTracker() {},
    async getAlarms() {
      console.log("getting alarms...");
      const res = await fetch("http://localhost:3000/alarms");
      const data = await res.json();

      this.alarms = data;
      this.loadedAlarms = true;
      console.log("alarms: ", this.alarms);
      console.log("active alarms: ", this.activeAlarms);
    },
    async addAlarm(alarm) {
      console.log("adding alarm:", alarm);
      try {
        const res = await fetch("http://localhost:3000/alarms", {
          method: "POST",
          body: JSON.stringify(alarm),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          // Check if the response status is not in the range 200-299
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        this.alarms.push(alarm); //add the alarm to the list after pushing to server
        console.log("new alarm list: ", this.alarms);
      } catch (error) {
        console.error("Failed to add alarm: ", error);
      }
    },
    async updateAlarm(updatedAlarm) {
      console.log("updating alarm with:", updatedAlarm);
      try {
        const res = await fetch(
          `http://localhost:3000/alarms/${updatedAlarm.id}`,
          {
            method: "PATCH", //PATCH FOR specific fields or PUT for the entire resource
            body: JSON.stringify(updatedAlarm),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Find the index of the alarm to update
        const index = this.alarms.findIndex(
          (alarm) => alarm.id === updatedAlarm.id
        );
        if (index !== -1) {
          // Update the alarm in the store
          this.alarms[index] = updatedAlarm;
        }
        console.log("alarm updated successfully:", this.alarms[index]);
        return this.alarms[index];
      } catch (error) {
        console.error("Failed to update alarm: ", error);
      }
    },
  },
});
