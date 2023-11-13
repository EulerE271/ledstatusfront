import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { useParams } from "react-router-dom";
import { findSegmentCoordinates } from '../../utils/map/geoUtils';

const fetchGeoJsonData = async (
  setGeoJsonData,
  setShelters,
  setCenterPosition,
  trailId
) => {

  try {

    const response = await axios.get(
      `/geodata/${trailId}`
    );


    if (response.data.geoData) {
      setGeoJsonData(response.data.geoData);
    } else {
      console.error("Geo data is not in the expected format:", response.data);
    }

    if (response.data.shelters) {
      setShelters(response.data.shelters);
    } else {
      console.warn("No shelter data received:", response.data);
    }
  } catch (error) {
    console.error("Error fetching trail data:", error);
  }
};

const createIcon = (iconUrl) => {
  return L.icon({
    iconUrl: iconUrl || "./images/default-icon.png",
    iconSize: [32, 32],
    popupAnchor: [0, -15], 
  });
};


const Map = ({ start_coordinates, end_coordinates }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [shelters, setShelters] = useState(null);
  const [centerPosition, setCenterPosition] = useState(
    start_coordinates.split(",").map((coord) => parseFloat(coord.trim()))
  );

  const [segmentCoordinates, setSegmentCoordinates] = useState(null);


  const { trailId } = useParams();

  useEffect(() => {

    fetchGeoJsonData(setGeoJsonData, setShelters, setCenterPosition, trailId);
  }, [trailId]);

  const checkpoint = {
    lat: 65.814239,
    lon: 15.106394,
    message: "CheckPoint 1: Beautiful Views!",
  };

  const pathStyle = {
    color: "#f47a60",
    weight: 7,
  };

  const hoverStyle = {
    color: "#ff0000",
    weight: 10,
  };

  const onEachFeature = (feature, layer) => {
    let popup = L.popup({ autoPan: false });

    layer.on({
      mouseover: (event) => {
        layer.setStyle(hoverStyle);

        popup
          .setLatLng(event.latlng)
          .setContent(feature.properties.name)
          .openOn(layer._map);
      },
      mouseout: (event) => {
        layer.setStyle(pathStyle);
        layer._map.closePopup();
      },
    });
  };

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.opentopomap.org/">OpenTopoMap</a> contributors'
      />

      {geoJsonData && (
        <>
          <GeoJSON
            data={geoJsonData}
            style={() => pathStyle}
            onEachFeature={onEachFeature}
          />
        </>
      )}

      {shelters &&
        shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            position={shelter.coordinates
              .split(",")
              .map((coord) => parseFloat(coord))}
            icon={createIcon(shelter.icon)}
          >
            <Popup>{shelter.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
