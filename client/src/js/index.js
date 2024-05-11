const { Workbox } = require('workbox-window');
const Editor = require('./editor');
require('./database');
require('../css/style.css');
// Import the header from your JavaScript file
const { header } = require('./header.js');

const main = document.querySelector('#main');
main.innerHTML = '';

// Function to append header text to the DOM
function appendHeaderText() {
  // Create a new pre element to preserve formatting
  const headerContainer = document.createElement('pre');
  // Set the header text as the inner HTML content of the header container
  headerContainer.innerHTML = header;
  // Append the header container to the main element
  main.appendChild(headerContainer);
}


const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();
// Call the function to append header text
appendHeaderText();

if (typeof editor === 'undefined') {
  loadSpinner();
}


// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
