import { Clock, DollarSign, Leaf, Navigation, Car, Zap } from "lucide-react";

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  time: string;
  price: number;
  greenScore: number;
  available: number;
  total: number;
  isEcoFriendly: boolean;
  hasEVCharging: boolean;
}

interface ParkingCardProps {
  spot: ParkingSpot;
  onNavigate: (id: string) => void;
  onBook: (id: string) => void;
}

const ParkingCard = ({ spot, onNavigate, onBook }: ParkingCardProps) => {
  const getGreenScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="card-eco group cursor-pointer">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-semibold text-lg text-foreground">
                {spot.name}
              </h3>
              {spot.isEcoFriendly && (
                <span className="badge-eco">
                  <Leaf className="h-3 w-3" />
                  Eco
                </span>
              )}
              {spot.hasEVCharging && (
                <span className="badge-neon">
                  <Zap className="h-3 w-3" />
                  EV
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{spot.address}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">${spot.price}</span>
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <Clock className="h-4 w-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-semibold text-foreground">{spot.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <Car className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Available</p>
              <p className="font-semibold text-foreground">
                {spot.available}/{spot.total}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <Leaf className={`h-4 w-4 ${getGreenScoreColor(spot.greenScore)}`} />
            <div>
              <p className="text-xs text-muted-foreground">Green</p>
              <p className={`font-semibold ${getGreenScoreColor(spot.greenScore)}`}>
                {spot.greenScore}%
              </p>
            </div>
          </div>
        </div>

        {/* Green Score Bar */}
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 gradient-eco"
            style={{ width: `${spot.greenScore}%` }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate(spot.id)}
            className="flex-1 btn-eco"
          >
            <Navigation className="h-4 w-4" />
            Navigate
          </button>
          <button
            onClick={() => onBook(spot.id)}
            className="flex-1 px-6 py-3 font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
