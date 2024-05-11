// install.js

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Store the event to use it later
  window.deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// Event handler for the click event on the install button
butInstall.addEventListener('click', async () => {
  // Check if the deferred prompt is available
  if (window.deferredPrompt) {
    // Show the installation prompt
    window.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await window.deferredPrompt.userChoice;
    // Reset the deferred prompt variable
    window.deferredPrompt = null;
    // Hide the install button if installation was successful
    if (choiceResult.outcome === 'accepted') {
      butInstall.style.display = 'none';
    }
  }
});

// Event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  // Log the installation event
  console.log('App installed:', event);
  // Hide the install button
  butInstall.style.display = 'none';
});
