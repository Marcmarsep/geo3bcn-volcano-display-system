/**
 * MapManager handles all map-related functionalities such as loading the Google Maps API,
 * initializing the map, adding markers, and managing KML layers.
 */
class MapManager {
    /**
     * Constructs an instance of MapManager with the given configuration.
     *
     * @param {Object} config - Configuration object containing settings such as API key, default coordinates, styles URL, etc.
     */
    constructor(config) {
        this.config = config; // Stores the configuration object.
        this.map = undefined; // Placeholder for the Google Map instance.
        this.apiKey = config.googleMapsApiKey; // API key for Google Maps.
        this.callbackName = config.initCallbackName; // Callback function name for map initialization.
    }

    /**
     * Dynamically loads the Google Maps API.
     *
     * Creates a new script element for the Google Maps API using the provided API key and callback function.
     * The script is loaded asynchronously and executed after the document is parsed to avoid blocking the page load.
     */
    loadAPI() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
        script.async = true;  // Load the script asynchronously to not block the DOM parsing.
        script.defer = true;  // Execute the script after the document has been parsed.
        document.head.appendChild(script);  // Append the script to the document head.
    }


    /**
     * Initializes the Google Maps instance.
     *
     * Configures and displays a Google Map based on specified options including center coordinates, zoom level,
     * and map type. Additionally, fetches and applies custom styles for the map if a styles URL is provided.
     */
    initializeMap() {
        // Define the map options.
        const mapOptions = {
            center: new google.maps.LatLng(this.config.defaultLat, this.config.defaultLng),  // Map center coordinates.
            zoom: 13,  // Initial zoom level.
            scaleControl: true,  // Enable the scale control.
            mapTypeId: google.maps.MapTypeId.HYBRID,  // Set the map type.
        };

        // Create a new map instance.
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Apply custom styles to the map if a styles URL is provided in the configuration.
        if (this.config.stylesUrl) {
            $.get(this.config.stylesUrl).done(styles => this.map.setOptions({styles}));
        }
    }


    /**
     * Adds multiple markers to the map and ensures all markers fit within the map bounds.
     *
     * @param {Array} markers - An array of marker data, each containing latitude, longitude, and other properties.
     */
    addMarkers(markers) {
        // Return early if no markers are provided.
        if (!markers) return;

        // Create a new LatLngBounds object to manage the bounds of all markers.
        const bounds = new google.maps.LatLngBounds();

        // InfoWindow variable to be reused for each marker
        const infowindow = new google.maps.InfoWindow();

        // Iterate over each marker data and create a marker on the map.
        markers.forEach(markerData => {
            const position = new google.maps.LatLng(markerData.lat, markerData.lng);
            const marker = new google.maps.Marker({
                position,
                map: this.map,
                title: markerData.name,
                icon: "imgs/gps.png", // Assuming all markers use this icon.
            });

            // Content of the InfoWindow, you can include any HTML here.
            const contentString = `<div><h1>${markerData.name}</h1><p>${markerData.description}</p></div>`;

            marker.addListener('click', () => {
                // Set the content of the InfoWindow
                infowindow.setContent(contentString);
                // Open the InfoWindow on the clicked marker
                infowindow.open(this.map, marker);
            });

            // Extend the bounds of the map to include this marker's position.
            bounds.extend(position);
        });

        // Adjust the map view so that all markers are visible within the viewport.
        this.map.fitBounds(bounds);
    }


    /**
     * Adds a KML layer to the map. Optionally removes the existing KML layer before adding the new one.
     *
     * @param {string} kmlPath - The URL to the KML file that defines the layer.
     * @param {boolean} remove - Determines whether to remove the existing KML layer before adding the new one. Default is true.
     */
    addKmlLayer(kmlPath, remove = true) {
        // Remove the existing KML layer if the 'remove' parameter is true.
        if (remove) this.removeKmlLayer();

        // Create a new KML layer and add it to the map.
        this.currentKmlLayer = new google.maps.KmlLayer(kmlPath);
        this.currentKmlLayer.setMap(this.map); // Ensure 'this.map' is defined and points to the current Google Map.
    }


    /**
     * Removes the current KML layer from the map, if it exists.
     */
    removeKmlLayer() {
        // Check if there's a current KML layer and remove it from the map if it exists.
        if (this.currentKmlLayer) {
            this.currentKmlLayer.setMap(null);
            this.currentKmlLayer = null; // Clear the reference to the removed KML layer.
        }
    }
}

/**
 * Export MapManager as the default export of this module.
 * This makes MapManager available for import in other modules.
 */

export default MapManager;
