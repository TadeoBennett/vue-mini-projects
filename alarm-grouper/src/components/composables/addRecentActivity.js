import {ref} from 'vue'




function addRecentActivity(action, actionOn, object) {
  // Create a new activity entry
  const newActivity = {
    action,
    actionOn,
    object,
    timestamp: new Date().toISOString()  // Optional: to track when the action occurred
  };

  // Load the current list from localStorage
  const savedActivities = JSON.parse(localStorage.getItem('recentActivities')) || [];

  // Add the new activity to the list
  savedActivities.unshift(newActivity);

  // Limit the number of stored activities, e.g., keep only the latest 10 actions
  if (savedActivities.length > 10) {
    savedActivities.pop();
  }

  // Save the updated list back to localStorage
  localStorage.setItem('recentActivities', JSON.stringify(savedActivities));

  // Update the in-memory list
  RecentActivityList = savedActivities;
}



export default addRecentActivity
