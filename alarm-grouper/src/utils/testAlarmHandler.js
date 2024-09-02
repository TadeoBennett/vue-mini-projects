// src/utils/alarmHandler.js

// Global variable to keep track of the audio
let currentAudio = null;

export function setAlarmNotification(alarmTime, soundFile) {
  // Track whether the alarm has been triggered
  let alarmTriggered = false;

  // Set an interval to check every minute
  const alarmInterval = setInterval(() => {
    const now = new Date();

    // Check if current time matches the alarm time and alarm hasn't been triggered yet
    if (
      !alarmTriggered &&
      now.getHours() === alarmTime.getHours() &&
      now.getMinutes() === alarmTime.getMinutes()
    ) {
      // Set alarm triggered to true
      alarmTriggered = true;

      // Show notification
      if (Notification.permission === "granted") {
        const notification = new Notification("Alarm Alert!", {
          body: "Your alarm is going off!",
          icon: "src/assets/sounds/beat.mp3", // Optional
        });

        // Optional: Clear the interval and stop the sound when the notification is clicked
        notification.onclick = () => {
          clearInterval(alarmInterval); // Stop the alarm check
          stopAlarmSound(); // Stop the sound
        };
      }

      // Play sound
      playAlarmSound(soundFile);

      // Stop checking after alarm has been triggered
      clearInterval(alarmInterval);
    }
  }, 1000); // Check every minute
}

// Function to play the alarm sound
function playAlarmSound(soundFile) {
  // Stop any currently playing audio
  stopAlarmSound();

  // Create a new audio object
  currentAudio = new Audio(soundFile);
  currentAudio.play();
}

// Function to stop the alarm sound
function stopAlarmSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // Reset playback position
    currentAudio = null;
  }
}

export function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }
}
