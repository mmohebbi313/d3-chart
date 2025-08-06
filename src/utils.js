export function isMultiSeries(data) {
  return Array.isArray(data?.[0]?.[1]);
}

export function extractSingleSeries(data) {
  return data
    .filter(([_, value]) => value !== null)
    .map(([timestamp, value]) => ({ x: timestamp, y: value }));
}

export function extractMultiSeries(data) {
  const [s1, s2, s3] = [[], [], []];

  data.forEach(([timestamp, values]) => {
    if (!Array.isArray(values)) return;
    const [v1, v2, v3] = values;

    if (v1 !== null) s1.push({ x: timestamp, y: v1 });
    if (v2 !== null) s2.push({ x: timestamp, y: v2 });
    if (v3 !== null) s3.push({ x: timestamp, y: v3 });
  });

  return [
    { data: s1, color: "blue" },
    { data: s2, color: "green" },
    { data: s3, color: "red" }
  ];
}