"use client";
import { MapPin } from 'lucide-react';

export default function LocationMap() {
  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center">
        <MapPin size={48} className="text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">Global Office Locations</p>
        <p className="text-gray-500 text-sm mt-1">Boston, MA • London, UK</p>
      </div>
    </div>
  );
}
