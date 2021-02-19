export const pad = d => {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

export const stringify = (map) => {
 return JSON.stringify(Array.from(map.entries()));
}

export const newMap = (string) => {
  return new Map(JSON.parse(string));
}