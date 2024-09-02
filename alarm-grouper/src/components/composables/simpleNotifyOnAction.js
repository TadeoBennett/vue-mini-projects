function notifySuccess($q, message) {
  $q.notify({
    message: message,
    color: "purple",
    badgeColor: "green",
    badgeTextColor: "white",
    badgeClass: "shadow-3 glossy my-badge-class",
    position: "bottom",
    progress: true,
    icon: "check_circle",
  });
}

function notifyMistake($q, message) {
  $q.notify({
    message: message,
    type: "negative",
    badgeColor: "red",
    badgeTextColor: "white",
    badgeClass: "glossy my-badge-class",
    position: "bottom",
    progress: true,
    icon: "error",
  });
}


export {
  notifyMistake,
  notifySuccess
}
