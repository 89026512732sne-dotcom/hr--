import { Booking } from './types';

// --- КОНФИГУРАЦИЯ ---
// Вставьте сюда URL вашего развернутого веб-приложения Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwhd6rem5TH0Q7eclsqw3xj8JXmcJL4p1qAPlO7XVNLJKi51ixEjKZopPwuAt-hR8PQ/exec";

// --- MOCK DATA (Для демо режима) ---
const INITIAL_DATA: Booking[] = [
  { id: '1', date: '2023-10-27', startTime: '09:00', endTime: '10:00', employeeName: 'Анна Петрова', topic: 'Еженедельная планерка', agenda: 'Обсуждение KPI' },
  { id: '2', date: '2023-10-27', startTime: '14:00', endTime: '15:30', employeeName: 'Иван Сидоров', topic: 'Собеседование Frontend', agenda: 'Техническое интервью' },
  { id: '3', date: '2023-10-28', startTime: '11:00', endTime: '12:00', employeeName: 'Елена Смирнова', topic: 'Бюджет Q4', agenda: 'Согласование сметы' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBookings = async (): Promise<Booking[]> => {
  // 1. REAL API MODE
  if (API_URL) {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  }

  // 2. DEMO / LOCAL STORAGE MODE
  await delay(800); 
  const stored = localStorage.getItem('hr_bookings_ru');
  if (stored) {
    return JSON.parse(stored);
  }
  return [...INITIAL_DATA];
};

export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
  const newBooking: Booking = {
    ...booking,
    id: Math.random().toString(36).substr(2, 9),
  };

  // 1. REAL API MODE
  if (API_URL) {
    // Отправляем данные в Google Apps Script
    // Используем simple POST request.
    // Google Script должен быть опубликован как "Anyone" (Все), чтобы это сработало без CORS.
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(newBooking),
    });

    if (!response.ok) throw new Error('Failed to send data to Google Sheet');
    
    const result = await response.json();
    if (result.status === 'error') throw new Error(result.message);
    
    return newBooking;
  }

  // 2. DEMO / LOCAL STORAGE MODE
  await delay(1200);
  const stored = localStorage.getItem('hr_bookings_ru');
  const currentList = stored ? JSON.parse(stored) : INITIAL_DATA;
  const newList = [newBooking, ...currentList];
  localStorage.setItem('hr_bookings_ru', JSON.stringify(newList));
  
  return newBooking;
};