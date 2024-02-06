# Geo3bcn Volcano Display System

## Configuration

To configure the Geo3bcn Volcano system, follow these steps by editing the `config.json` file:

- `host`: The hostname of your Flask app.
- `webHost`: The web host URL.
- `port`: The port number your Flask app is listening on.
- `protocol`: The protocol used (e.g., http for debugging or https for deployment).
- `googleMapsApiKey`: Your Google Maps API key.
- `initCallbackName`: The callback function name for map initialization.
- `defaultLat`: The default latitude for the map center.
- `defaultLng`: The default longitude for the map center.

## Uploading Your Files

To deploy this web application, simply upload your files to your web server as you would for any standard web page.

### Important Note

Please take note of the following important consideration:

This web application utilizes HTML inclusions. Ensure that Server Side Includes (SSI) are enabled on your server to ensure proper functionality.
