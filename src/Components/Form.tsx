import * as React from "react";
import * as googlemaps from "@googlemaps/react-wrapper";

type FormProps = {
  position: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral;
  onZoom: (zoomVal: number) => number;
}

const Form: React.VFC = ({ position, center, onZoom }: FormProps) => {
  const [zoom, setZoom] = React.useState(13);

  const handleZoom = (e) => {
    setZoom(Number(e.target.value))
    onZoom(Number(e.target.value))
  }

  return (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(e) => handleZoom(e)}
      />
      <br />
      <label htmlFor="lat">center latitude</label>
      <input
        type="number"
        readOnly
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(e) => ({ ...center, lat: Number(e.target.value) })}
      />
      <br />
      <label htmlFor="lng">center longitude</label>
      <input
        type="number"
        id="lng"
        readOnly
        name="lng"
        value={center.lng}
        onChange={(e) => ({ ...center, lng: Number(e.target.value) })}
      />

      <label htmlFor="lat">position lat</label>
      <input
        type="number"
        id="lat"
        name="lat"
        readOnly
        value={position.lat}
        onChange={(e) => ({ ...center, lat: Number(e.target.value) })}
      />
      <br />
      <label htmlFor="lng">position lng</label>
      <input
        type="number"
        id="lng"
        readOnly
        name="lng"
        value={position.lng}
        onChange={(e) => ({ ...center, lng: Number(e.target.value) })}
      />
    </div>
  );
};

export default Form;
