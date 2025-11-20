export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  employeeName: string;
  topic?: string;
  agenda?: string;
}

export interface BookingFormData {
  date: string;
  startTime: string;
  endTime: string;
  employeeName: string;
  topic: string;
}
