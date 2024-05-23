function raiseAnalyticsTracking(eventType, data) {
  if(window.eventListenerFrameworkLoaded)  {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
  }
  else {
    document.addEventListener('framework-script-loaded', function () {
      const event = new CustomEvent(eventType, { detail: data });
      document.dispatchEvent(event);
    });
  }
}

export { raiseAnalyticsTracking }