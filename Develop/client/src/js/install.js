// Get a reference to the 'buttonInstall' element from the DOM.
const butInstall = document.getElementById('buttonInstall');

// This event is fired when the browser considers the PWA ready for installation.
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent automatically showing the prompt.
  event.preventDefault();

  // Save the event for later use, so we can trigger the installation prompt when the user clicks the install button.
  deferredPrompt = event;

  // Update the UI to notify the user they can add to the home screen.
  butInstall.style.display = 'block';
});

// When user click on button
butInstall.addEventListener('click', async () => {
  // Show the installation prompt to the user.
  deferredPrompt.prompt();

  // Wait for the user's response to the installation prompt.
  const choiceResult = await deferredPrompt.userChoice;

  // Handle the user's response (accepted or dismissed).
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
});

// Add a handler for the `appinstalled` event.
// This event is fired when the PWA has been successfully installed.
window.addEventListener('appinstalled', (event) => {
  // Update the UI to indicate the app has been installed.
  // For example, you might hide the installation button.
  butInstall.style.display = 'none';

  // Log the installation to the console.
  console.log('PWA was installed');
});
