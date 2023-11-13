import React from 'react';
import { Polyline } from 'react-leaflet';

const HighlightedTrailSegment = ({ segmentCoordinates }) => {
  const pathStyle = {
    color: 'red',
    weight: 5,
    opacity: 0.8,
  };

  return <Polyline positions={segmentCoordinates} style={pathStyle} />;
};

export default HighlightedTrailSegment;
