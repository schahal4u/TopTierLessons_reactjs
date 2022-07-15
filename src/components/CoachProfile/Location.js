import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "1365px",
  height: "500px",
};

const center = {
  lat: 30.7333,
  lng: 76.7794,
};

const Location = () => {
  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="loc_container">
      <h1>Location</h1>
      <div className="map_conatiner mt-5">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Location;
