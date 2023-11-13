function StageDetails({
  distance,
  minTime,
  maxTime,
  cabin,
  timeUnit,
  level,
  avgMin,
  avgMax,
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-gray-700 ">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Detaljer</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailItem label="Avstånd" value={`${distance} km`} />
        <DetailItem label="Tid" value={`${minTime} - ${maxTime} ${timeUnit}`} />
        <DetailItem label="Boende" value={cabin || "Not available"} />

        {(level === "subtrail" || level === "trail") &&
          (avgMin !== avgMax ? (
            <DetailItem
              label="Distans per dag"
              value={`${avgMin} - ${avgMax} km (${Math.round(
                avgMin / 2.8
              )} - ${Math.round(avgMax / 2.8)} timmar)`}
            />
          ) : (
            <DetailItem
              label="Distans"
              value={`${avgMin} km (${Math.round(avgMax / 2.8)} timmar)`}
            />
          ))}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      <p className="text-lg text-gray-800">{value}</p>
    </div>
  );
}

export default StageDetails;
