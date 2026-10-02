import React, { useState } from 'react';
import { MapPin, Navigation, Bus, Train, AlertCircle, ExternalLink, Search } from 'lucide-react';

interface ExamHub {
  city: string;
  name: string;
  address: string;
  nearestTransit: string;
  lockerAvailability: 'Available at private shop outside (₹20-50)' | 'Inside center locker (Limited)' | 'No storage available';
  travelTips: string;
  mapQuery: string;
}

const HUBS: ExamHub[] = [
  {
    city: 'Delhi-NCR (Noida)',
    name: 'iON Digital Zone iDZ Noida Sector 62',
    address: 'C-56/28, Sector 62, Noida, Uttar Pradesh 201309',
    nearestTransit: 'Noida Electronic City Metro Station (Blue Line) - 800m auto / e-rickshaw',
    lockerAvailability: 'Available at private shop outside (₹20-50)',
    travelTips: 'Massive rush during morning shifts. Board Metro 45 mins earlier than usual to avoid security gate bottlenecks.',
    mapQuery: 'iON+Digital+Zone+iDZ+Sector+62+Noida',
  },
  {
    city: 'Delhi-NCR (Mundka)',
    name: 'iON Digital Zone Mundka',
    address: 'Rohtak Road, Near Mundka Industrial Area Metro Station, Delhi 110041',
    nearestTransit: 'Mundka Industrial Area Metro (Green Line) - Gate No. 2, 400m walk',
    lockerAvailability: 'Available at private shop outside (₹20-50)',
    travelTips: 'Directly walkable from Green Line Metro. Heavy traffic on Rohtak Road during peak morning hours.',
    mapQuery: 'iON+Digital+Zone+Mundka+Delhi',
  },
  {
    city: 'Patna',
    name: 'iON Digital Zone iDZ Patliputra',
    address: 'Industrial Estate, Patliputra Colony, Patna, Bihar 800013',
    nearestTransit: 'Patliputra Railway Station (3 km) / Patna Junction (6.5 km)',
    lockerAvailability: 'Available at private shop outside (₹20-50)',
    travelTips: 'Shared autos available from Patna Junction Dak Bungalow crossing. Keep 45-min transit buffer.',
    mapQuery: 'iON+Digital+Zone+Patliputra+Patna',
  },
  {
    city: 'Lucknow',
    name: 'iON Digital Zone Chinhat',
    address: 'Deva Road, Chinhat Industrial Area, Lucknow, Uttar Pradesh 226028',
    nearestTransit: 'Polytechnic Chauraha (4 km) / Charbagh Railway Station (14 km)',
    lockerAvailability: 'Available at private shop outside (₹20-50)',
    travelTips: 'Board shared auto or City Bus from Polytechnic Chauraha towards Chinhat / Matiyari.',
    mapQuery: 'iON+Digital+Zone+Chinhat+Lucknow',
  },
  {
    city: 'Kolkata',
    name: 'iON Digital Zone Salt Lake Sector V',
    address: 'College More, Sector V, Bidhannagar, Kolkata, West Bengal 700091',
    nearestTransit: 'Salt Lake Sector V Metro Station (Green Line) - 500m walk',
    lockerAvailability: 'Inside center locker (Limited)',
    travelTips: 'Easily accessible via Green Line Metro or AC buses from Howrah / Sealdah stations.',
    mapQuery: 'iON+Digital+Zone+Salt+Lake+Sector+V+Kolkata',
  },
  {
    city: 'Mumbai / Thane',
    name: 'iON Digital Zone Pawane / Turbhe',
    address: 'MIDC Industrial Area, Turbhe / Pawane, Navi Mumbai, Maharashtra 400705',
    nearestTransit: 'Turbhe Railway Station (Harbour Line) / Thane Station (12 km)',
    lockerAvailability: 'Available at private shop outside (₹20-50)',
    travelTips: 'Local trains on Trans-Harbour line connect Turbhe. Shared auto rickshaws ply from station.',
    mapQuery: 'iON+Digital+Zone+Pawane+Navi+Mumbai',
  },
  {
    city: 'Jaipur',
    name: 'iON Digital Zone Kukas',
    address: 'RIICO Industrial Area, Delhi-Jaipur Highway, Kukas, Jaipur, Rajasthan 302028',
    nearestTransit: 'Sindhi Camp Bus Stand (24 km) / Jaipur Junction (26 km)',
    lockerAvailability: 'Available at private shop outside (₹20-50)',
    travelTips: 'Far outside central Jaipur. Low-floor AC city bus route 1A/2 or pre-booked taxi recommended. Leave 2 hours early.',
    mapQuery: 'iON+Digital+Zone+Kukas+Jaipur',
  },
];

export const CenterTransitGuide: React.FC = () => {
  const [searchCity, setSearchCity] = useState<string>('');

  const filteredHubs = HUBS.filter(
    (hub) =>
      hub.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      hub.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
            <Navigation className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Exam Center Locator & TCS iON Transit Navigator
            </h3>
            <p className="text-[11px] text-slate-500">
              One-tap Google Maps directions, nearest metro/rail transit & locker guidelines for test centers.
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search by city (e.g. Noida, Patna)..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Warning Box */}
      <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-snug text-[11px]">
          <strong>Critical Center Advice:</strong> Examination centers do not take custody of mobile phones, bags, or electronic gadgets. Unofficial private vendors charge ₹20 to ₹50 for luggage holding, but security is unverified. If possible, travel with a guardian or leave valuables at home.
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {filteredHubs.map((hub, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-white transition-all space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-700 text-[11px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {hub.city}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{hub.lockerAvailability}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">{hub.name}</h4>
              <p className="text-[11px] text-slate-600 leading-snug">{hub.address}</p>

              <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Train className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{hub.nearestTransit}</span>
                </div>
                <p className="text-[10px] text-slate-500">{hub.travelTips}</p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${hub.mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs text-[11px]"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
