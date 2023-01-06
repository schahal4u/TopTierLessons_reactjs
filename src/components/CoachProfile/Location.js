
import React, { Fragment, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polygon,
  Circle,
  useJsApiLoader,
  CircleF,
} from "@react-google-maps/api";

import { useSelector } from "react-redux";

const Location = () => {
  // const { profileDetail } = useSelector((state) => state.getProfileDetail);
  // console.log("profileDetail", profileDetail);
  const { getCoachProfile } = useSelector((state) => state.getAllCoachResponse);
  console.log("getCoachProfile", getCoachProfile);
  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ",
  });
  // const [place, setPlace] = useState()
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
  const radius = getCoachProfile?.data?.radius
  console.log("radius", radius)
  const id = getCoachProfile?.data?.venueList?.venueId;
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius * 1000,
    zIndex: 1
  }

  const [map, setMap] = React.useState(null);

  const containerStyle = {
    width: "1065px",
    height: "500px",
  };

  const center = {
    lat: getCoachProfile?.data?.latitude || 0,
    lng: getCoachProfile?.data?.longitude || 0,
    // lat: 30.7137636,
    // lng: 76.6895554
  };
  // const cityCircle = new google.maps.Circle({
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.35,
  //   map,
  //   center: center,
  //   radius: 3000
  // });


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
            zoom={-1}
            // cityCircle={cityCircle}
            // MarkerPosition={{ lat: -34.397, lng: 150.644 }}
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
              <CircleF

                center={center}
                // radius={radius || 0}
                options={options}
              />
              <Marker
                position={{
                  lat: getCoachProfile?.data?.latitude || 0,
                  lng: getCoachProfile?.data?.longitude || 0,
                }}
              />
            </>

            <>
              {getCoachProfile?.data?.venueList?.map((venue) => {
                return (
                  <Fragment >
                    <Marker
                      position={{
                        lat: parseFloat(venue?.latitude || 0),
                        lng: parseFloat(venue?.longitude || 0),
                      }}

                    />


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
