import config from './config.js';
import UIManager from './uIManager.js';

const uiManager = new UIManager(config);

/**
 * Initializes the application.
 *
 * This function is responsible for setting up initial UI components,
 * binding event listeners, and initializing the map and volcano summary.
 */
function initApp() {
    // Set up DOM event listeners when the document is ready.
    $(document).ready(function () {
        // Fade out the disclaimer when the disclaimer button is clicked.
        $("#disclaimer-button").click(function () {
            $("#disclaimer").fadeOut(200);
        });
    });

    // Initialize the map view.
    uiManager.initializeMap();
    // Fetch and display the summary information for volcanoes.
    uiManager.setVolcanoSummary();
}

// Load the map API when the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', () => uiManager.loadAPI());

// Make the initApp function available globally so it can be called from the HTML.
window.initApp = initApp;