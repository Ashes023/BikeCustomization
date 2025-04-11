import React from 'react';
import { useStore, COLORS, FRAME_TYPES, HANDLEBAR_TYPES, SEAT_TYPES, WHEEL_SIZES, BATTERY_TYPES, MOTOR_POWERS, RANGES } from '../store';
import { Settings, Palette, Ruler, RotateCcw, Battery, Zap, Gauge } from 'lucide-react';

export const CustomizationPanel: React.FC = () => {
  const store = useStore();
  
  return (
    <div className="w-80 bg-black/30 backdrop-blur-md border-l border-white/10 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-bold">Customize Your E-Bike</h2>
        </div>
        
        {/* Frame Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Palette className="h-4 w-4" /> Frame
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Frame Type</label>
            <div className="grid grid-cols-2 gap-2">
              {FRAME_TYPES.map((type) => (
                <button
                  key={type}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.frameType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setFrameType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Frame Color</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    store.frameColor.name === color.name
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => store.setFrameColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Wheels Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Ruler className="h-4 w-4" /> Wheels
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Wheel Size</label>
            <div className="grid grid-cols-4 gap-2">
              {WHEEL_SIZES.map((size) => (
                <button
                  key={size}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.wheelSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setWheelSize(size)}
                >
                  {size}"
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Wheel Color</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    store.wheelColor.name === color.name
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => store.setWheelColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Electric Components Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" /> Electric Components
          </h3>
          
          {/* Battery */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2 flex items-center gap-1">
              <Battery className="h-3 w-3" /> Battery Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BATTERY_TYPES.map((type) => (
                <button
                  key={type}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.batteryType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setBatteryType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Battery Color</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    store.batteryColor.name === color.name
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => store.setBatteryColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Motor */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2 flex items-center gap-1">
              <Gauge className="h-3 w-3" /> Motor Power
            </label>
            <div className="grid grid-cols-4 gap-2">
              {MOTOR_POWERS.map((power) => (
                <button
                  key={power}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.motorPower === power
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setMotorPower(power)}
                >
                  {power}W
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Motor Color</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    store.motorColor.name === color.name
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => store.setMotorColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Range */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Battery Range</label>
            <div className="grid grid-cols-4 gap-2">
              {RANGES.map((range) => (
                <button
                  key={range}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.rangeKm === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setRangeKm(range)}
                >
                  {range}km
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Handlebar Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Handlebar</h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Handlebar Type</label>
            <div className="grid grid-cols-2 gap-2">
              {HANDLEBAR_TYPES.map((type) => (
                <button
                  key={type}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.handlebarType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setHandlebarType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Handlebar Color</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    store.handlebarColor.name === color.name
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => store.setHandlebarColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Seat Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Seat</h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Seat Type</label>
            <div className="grid grid-cols-2 gap-2">
              {SEAT_TYPES.map((type) => (
                <button
                  key={type}
                  className={`py-2 px-3 rounded-md text-sm ${
                    store.seatType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => store.setSeatType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Seat Color</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    store.seatColor.name === color.name
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => store.setSeatColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Reset Button */}
        <button 
          className="w-full py-2 flex items-center justify-center gap-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
          onClick={() => useStore.setState({
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
          })}
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Default
        </button>
      </div>
    </div>
  );
};