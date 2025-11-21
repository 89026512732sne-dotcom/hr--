import React from 'react';
import { Clock, User, CalendarDays, FileText } from 'lucide-react';
import { Booking } from './types';

interface BookingListProps {
  bookings: Booking[];
  isLoading: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, isLoading }) => {
  // Sort bookings by Date then Time (Newest dates first)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`).getTime();
    const dateB = new Date(`${b.date}T${b.startTime}`).getTime();
    return dateB - dateA; // Descending
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-3 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (sortedBookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarDays className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Нет записей</h3>
        <p className="text-gray-500">Будьте первым, кто забронирует переговорную.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Занятое время</h3>
        <span className="text-xs font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
          {bookings.length} Активно
        </span>
      </div>

      {sortedBookings.map((booking) => (
        <div 
          key={booking.id} 
          className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CalendarDays className="w-4 h-4" />
                {new Date(booking.date).toLocaleDateString('ru-RU', { weekday: 'short', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                {booking.startTime} - {booking.endTime}
              </div>
            </div>
            
            <div className="flex flex-col items-start sm:items-end space-y-1">
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <User className="w-4 h-4 text-gray-400" />
                {booking.employeeName}
              </div>
              {booking.topic && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="w-3 h-3" />
                  {booking.topic}
                </div>
              )}
            </div>
          </div>

          {/* Agenda Section (if available) */}
          {booking.agenda && (
             <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Повестка (ИИ)</p>
                <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all">
                  {booking.agenda}
                </p>
             </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;