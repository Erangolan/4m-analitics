import React, { useState, useEffect } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from "./Components/Marker";
import Map from './Components/Map';
import Form from "./Components/Form";
import { Direction, maxDeviation } from './Resources';

const render = (status: Status) => <h1>{status}</h1>

const App: React.VFC = () => {
  const [zoom, setZoom] = useState(13);
  const [initialValues, setInitialValues] = useState<google.maps.LatLngLiteral>({ lat: -33, lng: 151 })
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(initialValues);
  const [position, setPosition] = useState<google.maps.LatLngLiteral>(initialValues);
  const updateZoom = (value) => setZoom(value)
  const getRandomNum = (min = 0, max = 0.001) => Math.random() * (max - min) + min;

  useEffect(() => {
    const interval = setInterval(() => {
      moveMarker()
    }, 500);

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCenter({ ...position })
    setInitialValues({ ...position })
  }, [Math.abs(position.lat - initialValues.lat || position.lng - initialValues.lng) > maxDeviation])

  const moveMarker = () => {
    const direction = Math.floor(getRandomNum(0, 4))
    const degree = getRandomNum()
    updatePosition(direction, degree)
  }

  const updatePosition = (direction, degree) => {
    const field = direction === Direction.North || direction === Direction.South ? 'lng' : 'lat'
    setPosition(prevState => ({
      ...prevState,
      [field]: direction % 2 === 0 ? position[field] + degree : position[field] - degree
    }));
  }

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} render={render}>
        <Map
          center={center}
          zoom={zoom}
          onIdle={onIdle}
          style={{ flexGrow: "1", height: "100%" }}
        >
          <Marker position={position} />
        </Map>
      </Wrapper>
      <Form onZoom={updateZoom} position={position} center={center} setCenter={setCenter} />
    </div>
  );
};

export default App;
