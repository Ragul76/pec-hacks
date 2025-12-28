import { useState } from "react";
import { X, Clock, Calendar, Car, CheckCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  spotName: string;
  pricePerHour: number;
}

const BookingModal = ({ isOpen, onClose, spotName, pricePerHour }: BookingModalProps) => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const totalPrice = pricePerHour * duration;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md glass-dark rounded-3xl p-6 animate-slide-up">
        {isBooked ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-muted-foreground">
              Your spot at {spotName} is reserved.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-foreground">
                Book Parking
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="font-semibold text-foreground">{spotName}</p>
              <p className="text-sm text-muted-foreground">
                ${pricePerHour}/hour
              </p>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Car className="h-4 w-4 inline mr-2" />
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="ABC 1234"
                  className="input-eco"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Arrival Time
                </label>
                <input
                  type="datetime-local"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="input-eco"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Duration (hours)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                    className="w-12 h-12 rounded-xl border border-border hover:border-primary transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-2xl font-bold text-foreground">
                    {duration}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDuration(Math.min(24, duration + 1))}
                    className="w-12 h-12 rounded-xl border border-border hover:border-primary transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-3xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button type="submit" className="w-full btn-neon py-4 text-lg">
                  Confirm Booking
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
