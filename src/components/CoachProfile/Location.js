import React, { Fragment } from "react";
import {
  GoogleMap,
  Marker,
  Polygon,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useSelector } from "react-redux";

const Location = () => {
  const { profileDetail } = useSelector((state) => state.getProfileDetail);
  console.log("profileDetail", profileDetail);

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ",
  });

  const paths = [
    //getCirclePoints(myLatLng, 100, 1, true),
    //getCirclePoints(myLatLng, 50, -1, false)
    // drawCircle(new google.maps.LatLng(-33.9, 151.2), 32, 1),
    // drawCircle(
    //   new google.maps.LatLng(
    //     profileDetail?.data?.latitude,
    //     profileDetail?.data?.longitude
    //   ),
    //   profileDetail?.data?.radius,
    //   -1
    // ),
  ];

  const optionsPolygon = {
    fillColor: "#c6d0fc",
    fillOpacity: 0.7,
    strokeColor: "#3852CA",
    strokeOpacity: 0.3,
    strokeWeight: 1,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  const [map, setMap] = React.useState(null);

  const containerStyle = {
    width: "1365px",
    height: "500px",
  };

  const center = {
    lat: profileDetail?.data?.latitude,
    lng: profileDetail?.data?.longitude,
  };

  const places = [
    {
      id: 1,
      name: "Park Slope",
      latitude: "30.7046486",
      longitude: "76.71787259999999",
      circle: {
        radius: 3000,
        options: {
          strokeColor: "#ff0000",
        },
      },
    },
  ];

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
            zoom={12}
            MarkerPosition={{ lat: -34.397, lng: 150.644 }}
            onLoad={onLoad}
            onUnmount={onUnmount}
            // onGoogleApiLoaded={({ map, maps }) =>
            //   new google.maps.Circle({
            //     strokeColor: "#FF0000",
            //     strokeOpacity: 0.8,
            //     strokeWeight: 2,
            //     fillColor: "#FF0000",
            //     fillOpacity: 0.3,
            //     map,
            //     // center: latlng,
            //     radius: 275,
            //   })
            // }
          >
            <>
              {places.map((place) => {
                return (
                  <Fragment key={place.id}>
                    <Marker
                      position={{
                        lat: parseFloat(place.latitude),
                        lng: parseFloat(place.longitude),
                      }}
                    />
                    {place.circle && (
                      <Polygon
                        //onLoad={onLoad}
                        // paths={paths}
                        options={optionsPolygon}
                      />
                      // <Circle
                      //   defaultCenter={{
                      //     lat: parseFloat(place.latitude),
                      //     lng: parseFloat(place.longitude),
                      //   }}
                      //   radius={place.circle.radius}
                      //   options={place.circle.options}
                      // />
                    )}
                  </Fragment>
                );
              })}
            </>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Location;
