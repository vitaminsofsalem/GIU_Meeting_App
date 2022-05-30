export interface MapLocation {
  label: string;
  mapLeftOffset: number;
  mapTopOffset: number;
}

export const MAP_LOCATIONS: MapLocation[] = [
  {
    label: "S Building",
    mapLeftOffset: 0,
    mapTopOffset: 95,
  },
  {
    label: "M Building",
    mapLeftOffset: 95,
    mapTopOffset: 115,
  },
  {
    label: "Tennis Court",
    mapLeftOffset: 70,
    mapTopOffset: 55,
  },
  {
    label: "Volleyball Court",
    mapLeftOffset: 140,
    mapTopOffset: 30,
  },
  {
    label: "Soccer Field",
    mapLeftOffset: 210,
    mapTopOffset: 0,
  },
  {
    label: "Behind Gym",
    mapLeftOffset: 250,
    mapTopOffset: 35,
  },
  {
    label: "Restaurant Area",
    mapLeftOffset: 220,
    mapTopOffset: 95,
  },
  {
    label: "Essen",
    mapLeftOffset: 230,
    mapTopOffset: 145,
  },
  {
    label: "Walkway Seats",
    mapLeftOffset: 170,
    mapTopOffset: 65,
  },
];
