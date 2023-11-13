export const calculateDistance = (pointA, pointB) => {
  const R = 6371; 
  const dLat = deg2rad(pointB[0] - pointA[0]);
  const dLon = deg2rad(pointB[1] - pointA[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pointA[0])) *
      Math.cos(deg2rad(pointB[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const findClosestPoint = (targetPoint, pathCoordinates) => {
  let closestPoint = null;
  let shortestDistance = Infinity;

  pathCoordinates.forEach((point) => {
    const distance = calculateDistance(targetPoint, point);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestPoint = point;
    }
  });

  return closestPoint;
};

export const findSegmentCoordinates = (
  start_coordinates,
  end_coordinates,
  pathCoordinates
) => {


  const startCoordsArray = start_coordinates
    .split(",")
    .map((coord) => parseFloat(coord.trim()));
  const endCoordsArray = end_coordinates
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

    console.log(startCoordsArray)
  const closestStart = findClosestPoint(startCoordsArray, pathCoordinates);
  const closestEnd = findClosestPoint(endCoordsArray, pathCoordinates);

  const startIndex = pathCoordinates.findIndex(
    (point) => point[0] === closestStart[0] && point[1] === closestStart[1]
  );

  const endIndex = pathCoordinates.findIndex(
    (point) => point[0] === closestEnd[0] && point[1] === closestEnd[1]
  );

  return pathCoordinates.slice(
    Math.min(startIndex, endIndex),
    Math.max(startIndex, endIndex) + 1
  );
};
