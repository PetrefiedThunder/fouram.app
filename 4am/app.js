document.addEventListener('DOMContentLoaded', () => {
  const uploadAudioBtn = document.getElementById('uploadAudio');
  const alarmAudio = document.getElementById('alarmAudio');
  const statusDiv = document.getElementById('status');

  // Allow the user to upload their audio
  uploadAudioBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        alarmAudio.src = url;
        alarmAudio.hidden = false;
        statusDiv.textContent = "Audio loaded successfully!";
      }
    };
    fileInput.click();
  });

  // Schedule the alarm
  function scheduleAlarm() {
    const now = new Date();
    const next4AM = new Date();
    next4AM.setHours(4, 0, 0, 0);
    if (now > next4AM) {
      next4AM.setDate(next4AM.getDate() + 1);
    }

    const timeUntil4AM = next4AM - now;
    console.log(`Alarm scheduled for ${next4AM.toLocaleString()}`);

    setTimeout(() => {
      statusDiv.textContent = "Playing alarm...";
      alarmAudio.play().catch((err) => {
        console.error('Audio playback failed:', err);
        alert('Enable audio playback in your browser settings.');
      });
    }, timeUntil4AM);
  }

  scheduleAlarm();

  // Register the service worker for offline support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('Service Worker Registered'))
      .catch((err) => console.error('Service Worker Registration Failed:', err));
  }
});