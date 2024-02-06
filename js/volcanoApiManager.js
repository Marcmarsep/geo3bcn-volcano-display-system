/**
 * Manages API interactions for volcano-related data.
 */
class VolcanoAPIManager {
    /**
     * Constructs a new instance of the VolcanoAPIManager with the given configuration.
     *
     * @param {Object} config - Configuration object containing API settings and endpoints.
     */
    constructor(config) {
        this.config = config; // Store the configuration for use in API calls.
    }


    /**
     * Fetches summary data about volcanoes from the server.
     *
     * Makes a POST request to the server and if successful, passes the data to the provided success callback.
     * In case of any network or server errors, it logs and handles the error using the provided error callback.
     *
     * @param {Function} successCallback - Callback function to handle successful response.
     * @param {Function} errorCallback - Callback function to handle errors.
     */
    getVolcanoSummary(successCallback, errorCallback) {
        const url = `${this.config.protocol}${this.config.host}:${this.config.port}/api/geo3bcn/volcano-summary`;

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.debug("getVolcanoSummary: ", data); // TODO: Consider a more sophisticated logging mechanism
                successCallback(data);
            })
            .catch(error => {
                console.error("Error in getVolcanoSummary: ", error); // TODO:  Consider a more sophisticated logging mechanism
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }

    /**
     * Fetches available maps for a specific volcano.
     *
     * Sends a POST request to the server with the volcano filename and if successful,
     * passes the available map data to the provided success callback.
     * In case of any network or server errors, it handles the error using the provided error callback.
     *
     * @param {string} filename - The filename (ID) of the volcano to fetch available maps for.
     * @param {Function} successCallback - Callback function to handle successful response.
     * @param {Function} errorCallback - Callback function to handle errors.
     */
    getVolcanoAvailableMaps(filename, successCallback, errorCallback) {
        jQuery.ajax({
            url: `${this.config.protocol}${this.config.host}:${this.config.port}/api/geo3bcn/map-summary`,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({file_name: filename}),
            contentType: 'application/json; charset=utf-8',
            success: successCallback,
            error: errorCallback,
            timeout: 120000, // TODO: Consider adjusting based on expected server response time
        });
    }

    /**
     * Fetches metadata for a specific map associated with a volcano.
     *
     * Sends a POST request with the volcano filename and map name. On success, it logs and forwards the response
     * to the provided success callback. In case of error, it logs the error details and calls the error callback.
     *
     * @param {string} filename - The filename (ID) of the volcano.
     * @param {string} map - The specific map to fetch metadata for.
     * @param {Function} successCallback - Callback function to handle successful response.
     * @param {Function} errorCallback - Callback function to handle errors.
     */
    getMapMetadata(filename, map, successCallback, errorCallback) {
        jQuery.ajax({
            url: this.config.protocol + this.config.host + ":" + this.config.port + "/api/geo3bcn/map-metadata",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({volcan: filename, map: map}),
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                console.log('Success:', response);
                successCallback(response);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error('Error:', textStatus, errorThrown);
                if (errorCallback) errorCallback(jqXHR, textStatus, errorThrown);
            },
            timeout: 120000, // Adjust based on expected server response time
        });
    }

}
/**
 * Export VolcanoAPIManager as the default export of this module.
 * This makes VolcanoAPIManager available for import in other modules.
 */
export default VolcanoAPIManager;