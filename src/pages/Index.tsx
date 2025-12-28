import { useState } from "react";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/parking/SearchBar";
import ParkingCard from "@/components/parking/ParkingCard";
import ParkingMap from "@/components/parking/ParkingMap";
import BookingModal from "@/components/parking/BookingModal";
import { Leaf, Zap, Shield, MapPin } from "lucide-react";
import { toast } from "sonner";

const parkingSpots = [
  {
    id: "1",
    name: "Central EcoPark Hub",
    address: "123 Green Street, Downtown",
    distance: "0.3 mi",
    time: "3 min",
    price: 2.5,
    greenScore: 92,
    available: 24,
    total: 50,
    isEcoFriendly: true,
    hasEVCharging: true,
  },
  {
    id: "2",
    name: "Riverside Smart Lot",
    address: "456 River Road, Waterfront",
    distance: "0.5 mi",
    time: "5 min",
    price: 1.8,
    greenScore: 78,
    available: 15,
    total: 30,
    isEcoFriendly: true,
    hasEVCharging: false,
  },
  {
    id: "3",
    name: "Tech District Garage",
    address: "789 Innovation Blvd",
    distance: "0.8 mi",
    time: "8 min",
    price: 3.0,
    greenScore: 85,
    available: 42,
    total: 100,
    isEcoFriendly: true,
    hasEVCharging: true,
  },
  {
    id: "4",
    name: "Urban Green Parking",
    address: "321 Eco Lane, Midtown",
    distance: "1.2 mi",
    time: "12 min",
    price: 1.5,
    greenScore: 95,
    available: 8,
    total: 20,
    isEcoFriendly: true,
    hasEVCharging: true,
  },
];

const mapLocations = parkingSpots.map((spot) => ({
  id: spot.id,
  name: spot.name,
  position: [
    40.7128 + (Math.random() - 0.5) * 0.02,
    -74.006 + (Math.random() - 0.5) * 0.02,
  ] as [number, number],
  available: spot.available,
  price: spot.price,
}));

const Index = () => {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSpot, setBookingSpot] = useState<typeof parkingSpots[0] | null>(null);

  const handleSearch = (query: string) => {
    toast.success(`Searching for parking near: ${query || "your location"}`);
  };

  const handleNavigate = (id: string) => {
    const spot = parkingSpots.find((s) => s.id === id);
    toast.success(`Starting navigation to ${spot?.name}`);
  };

  const handleBook = (id: string) => {
    const spot = parkingSpots.find((s) => s.id === id);
    if (spot) {
      setBookingSpot(spot);
      setIsBookingOpen(true);
    }
  };

  const handleMarkerClick = (id: string) => {
    setSelectedSpot(id);
    const element = document.getElementById(`parking-card-${id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Find <span className="text-primary text-glow">Eco-Friendly</span> Parking
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Smart parking solutions for a greener city. Save time, save money, save the planet.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border">
              <div className="p-2 rounded-xl bg-primary/10">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Eco Score</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border">
              <div className="p-2 rounded-xl bg-secondary/10">
                <Zap className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">EV Charging</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border">
              <div className="p-2 rounded-xl bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">Secure</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="h-[400px] lg:h-[600px] lg:sticky lg:top-24 animate-fade-in">
              <ParkingMap
                locations={mapLocations}
                onMarkerClick={handleMarkerClick}
              />
            </div>

            {/* Parking Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-semibold text-xl text-foreground">
                    Nearby Parking
                  </h2>
                </div>
                <span className="text-sm text-muted-foreground">
                  {parkingSpots.length} spots found
                </span>
              </div>

              {parkingSpots.map((spot, index) => (
                <div
                  key={spot.id}
                  id={`parking-card-${spot.id}`}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ParkingCard
                    spot={spot}
                    onNavigate={handleNavigate}
                    onBook={handleBook}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        spotName={bookingSpot?.name || ""}
        pricePerHour={bookingSpot?.price || 0}
      />
    </div>
  );
};

export default Index;
