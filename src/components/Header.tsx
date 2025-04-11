import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-black/30 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10">
      <div className="flex items-center gap-2">
        <Zap className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ElectroRide 3D
        </h1>
      </div>
      
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors">
          Save Design
        </button>
        <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors">
          Order Now
        </button>
      </div>
    </header>
  );
};