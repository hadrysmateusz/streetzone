export const areNotificationsSupported = () => {
  if (!("serviceWorker" in navigator)) {
    // Service Workers are not supported.
    return false
  }

  if (!("PushManager" in window)) {
    // The Push API is not supported.
    return false
  }

  if (!("Notification" in window)) {
    // Notifications are not supported
  }

  return true
}

export default areNotificationsSupported
