import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation2 } from "lucide-react";

interface ParkingLocation {
  id: string;
  name: string;
  position: [number, number];
  available: number;
  price: number;
}

interface ParkingMapProps {
  locations: ParkingLocation[];
  center?: [number, number];
  onMarkerClick?: (id: string) => void;
}

const ParkingMap = ({ 
  locations, 
  center = [40.7128, -74.0060],
  onMarkerClick 
}: ParkingMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleMarkerClick = (id: string) => {
    setSelectedLocation(id);
    onMarkerClick?.(id);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-card">
      {/* Map Background - Simulated dark map style */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, hsl(220 40% 8%) 0%, hsl(220 35% 12%) 100%)
          `,
        }}
      >
        {/* Grid pattern for map effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(220 30% 25%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(220 30% 25%) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Radial glow effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, hsl(142 70% 45% / 0.1) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Location Markers */}
      <div className="absolute inset-0 p-8">
        {locations.map((location, index) => {
          const xPos = 20 + (index % 3) * 30 + Math.random() * 10;
          const yPos = 20 + Math.floor(index / 3) * 35 + Math.random() * 10;
          const isSelected = selectedLocation === location.id;

          return (
            <button
              key={location.id}
              onClick={() => handleMarkerClick(location.id)}
              className={`absolute group transition-all duration-300 ${
                isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'
              }`}
              style={{
                left: `${xPos}%`,
                top: `${yPos}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Marker */}
              <div 
                className={`
                  relative w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isSelected 
                    ? 'gradient-eco glow-eco' 
                    : 'bg-primary/80 hover:bg-primary'
                  }
                `}
              >
                <MapPin className="h-5 w-5 text-primary-foreground" />
                
                {/* Pulse effect */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
                )}
              </div>

              {/* Tooltip */}
              <div 
                className={`
                  absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                  px-3 py-2 rounded-xl bg-card border border-border shadow-lg
                  transition-all duration-300 whitespace-nowrap
                  ${isSelected ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}
                `}
              >
                <p className="font-semibold text-foreground text-sm">{location.name}</p>
                <p className="text-xs text-muted-foreground">
                  {location.available} spots • ${location.price}/hr
                </p>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-card" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
          +
        </button>
        <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
          −
        </button>
        <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary hover:bg-muted transition-colors">
          <Navigation2 className="h-5 w-5" />
        </button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-background/50 text-xs text-muted-foreground">
        EcoPark Smart Map
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/30 to-transparent" />
      </div>
    </div>
  );
};

export default ParkingMap;
