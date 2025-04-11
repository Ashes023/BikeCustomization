import { create } from 'zustand';
import { Vector3 } from 'three';

export type BikeColor = {
  name: string;
  color: string;
};

export type BikeComponent = {
  name: string;
  options: string[];
  current: string;
};

export type BikeState = {
  frameColor: BikeColor;
  wheelColor: BikeColor;
  handlebarColor: BikeColor;
  seatColor: BikeColor;
  batteryColor: BikeColor;
  motorColor: BikeColor;
  wheelSize: number;
  frameType: string;
  handlebarType: string;
  seatType: string;
  batteryType: string;
  motorPower: number;
  rangeKm: number;
  cameraPosition: [number, number, number];
};

export type BikeStore = BikeState & {
  setFrameColor: (color: BikeColor) => void;
  setWheelColor: (color: BikeColor) => void;
  setHandlebarColor: (color: BikeColor) => void;
  setSeatColor: (color: BikeColor) => void;
  setBatteryColor: (color: BikeColor) => void;
  setMotorColor: (color: BikeColor) => void;
  setWheelSize: (size: number) => void;
  setFrameType: (type: string) => void;
  setHandlebarType: (type: string) => void;
  setSeatType: (type: string) => void;
  setBatteryType: (type: string) => void;
  setMotorPower: (power: number) => void;
  setRangeKm: (range: number) => void;
};

export const COLORS: BikeColor[] = [
  { name: 'Matte Black', color: '#1a1a1a' },
  { name: 'Racing Red', color: '#cc0000' },
  { name: 'Electric Blue', color: '#0066cc' },
  { name: 'Forest Green', color: '#006633' },
  { name: 'Bright Orange', color: '#ff6600' },
  { name: 'Silver', color: '#c0c0c0' },
  { name: 'White', color: '#ffffff' },
  { name: 'Yellow', color: '#ffcc00' },
  { name: 'Purple', color: '#660099' },
  { name: 'Pink', color: '#ff66cc' },
];

export const FRAME_TYPES = ['City', 'Mountain', 'Folding', 'Cargo'];
export const HANDLEBAR_TYPES = ['Flat', 'Cruiser', 'Riser', 'Bullhorn'];
export const SEAT_TYPES = ['Comfort', 'Sport', 'Cruiser', 'Ergonomic'];
export const BATTERY_TYPES = ['Integrated', 'External', 'Dual', 'Removable'];
export const MOTOR_POWERS = [250, 500, 750, 1000]; // in watts
export const RANGES = [40, 60, 80, 100]; // in kilometers
export const WHEEL_SIZES = [20, 26, 27.5, 29];

export const useStore = create<BikeStore>((set) => ({
  frameColor: COLORS[0],
  wheelColor: COLORS[5],
  handlebarColor: COLORS[0],
  seatColor: COLORS[0],
  batteryColor: COLORS[6],
  motorColor: COLORS[5],
  wheelSize: WHEEL_SIZES[2],
  frameType: FRAME_TYPES[0],
  handlebarType: HANDLEBAR_TYPES[0],
  seatType: SEAT_TYPES[0],
  batteryType: BATTERY_TYPES[0],
  motorPower: MOTOR_POWERS[1],
  rangeKm: RANGES[1],
  cameraPosition: [5, 2, 5],
  
  setFrameColor: (color) => set({ frameColor: color }),
  setWheelColor: (color) => set({ wheelColor: color }),
  setHandlebarColor: (color) => set({ handlebarColor: color }),
  setSeatColor: (color) => set({ seatColor: color }),
  setBatteryColor: (color) => set({ batteryColor: color }),
  setMotorColor: (color) => set({ motorColor: color }),
  setWheelSize: (size) => set({ wheelSize: size }),
  setFrameType: (type) => set({ frameType: type }),
  setHandlebarType: (type) => set({ handlebarType: type }),
  setSeatType: (type) => set({ seatType: type }),
  setBatteryType: (type) => set({ batteryType: type }),
  setMotorPower: (power) => set({ motorPower: power }),
  setRangeKm: (range) => set({ rangeKm: range }),
}));