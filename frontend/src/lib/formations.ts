export interface Formation {
  id: string;
  name: string;
  positions: { x: number; y: number; role: string }[];
}

export const formations: Formation[] = [
  {
    id: "4-3-3",
    name: "4-3-3",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 30, y: 50, role: "CM" },
      { x: 50, y: 50, role: "CM" },
      { x: 70, y: 50, role: "CM" },
      { x: 20, y: 30, role: "LW" },
      { x: 50, y: 30, role: "ST" },
      { x: 80, y: 30, role: "RW" }
    ]
  },
  {
    id: "4-4-2",
    name: "4-4-2",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 20, y: 50, role: "LM" },
      { x: 40, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RM" },
      { x: 35, y: 30, role: "ST" },
      { x: 65, y: 30, role: "ST" }
    ]
  },
  {
    id: "3-5-2",
    name: "3-5-2",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 20, y: 50, role: "LWB" },
      { x: 40, y: 50, role: "CM" },
      { x: 50, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RWB" },
      { x: 40, y: 30, role: "ST" },
      { x: 60, y: 30, role: "ST" }
    ]
  },
  {
    id: "4-2-3-1",
    name: "4-2-3-1",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 20, y: 70, role: "LB" },
      { x: 40, y: 70, role: "CB" },
      { x: 60, y: 70, role: "CB" },
      { x: 80, y: 70, role: "RB" },
      { x: 35, y: 55, role: "CDM" },
      { x: 65, y: 55, role: "CDM" },
      { x: 30, y: 40, role: "LW" },
      { x: 50, y: 40, role: "CAM" },
      { x: 70, y: 40, role: "RW" },
      { x: 50, y: 25, role: "ST" }
    ]
  },
  {
    id: "3-4-3",
    name: "3-4-3",
    positions: [
      { x: 50, y: 90, role: "GK" },
      { x: 30, y: 70, role: "CB" },
      { x: 50, y: 70, role: "CB" },
      { x: 70, y: 70, role: "CB" },
      { x: 20, y: 50, role: "LWB" },
      { x: 40, y: 50, role: "CM" },
      { x: 60, y: 50, role: "CM" },
      { x: 80, y: 50, role: "RWB" },
      { x: 25, y: 30, role: "LW" },
      { x: 50, y: 30, role: "ST" },
      { x: 75, y: 30, role: "RW" }
    ]
  }
];


