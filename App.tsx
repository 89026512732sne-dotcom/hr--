import React, { useEffect, useState } from 'react';
import { Users, RefreshCcw } from 'lucide-react';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import DashboardStats from './DashboardStats';
import { fetchBookings, createBooking } from './bookingService';
import { Booking, BookingFormData } from './types';

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookingSubmit = async (data: BookingFormData, agenda: string) => {
    setSubmitting(true);
    try {
      const newBooking = await createBooking({
        ...data,
        agenda // Save the AI generated agenda if it exists
      });
      setBookings(prev => [newBooking, ...prev]);
    } catch (error) {
      console.error("Failed to create booking", error);
      alert("Не удалось создать запись. Пожалуйста, попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-200">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">HR Отдел</h1>
                <p className="text-xs text-emerald-600 font-medium">Бронирование Переговорной</p>
              </div>
            </div>
            <button 
              onClick={loadData}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Обновить данные"
            >
              <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Booking Form (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-700 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Забронировать</h2>
                <p className="text-emerald-100 text-sm mb-0">
                  Забронируйте слот быстро и удобно. Используйте ИИ для создания повестки встречи.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600 rounded-full opacity-50 blur-2xl"></div>
            </div>
            
            <BookingForm onSubmit={handleBookingSubmit} isSubmitting={submitting} />
          </div>

          {/* Right Column: Stats & List (8 cols) */}
          <div className="lg:col-span-8">
             <DashboardStats bookings={bookings} />
             <BookingList bookings={bookings} isLoading={loading} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;