import React, { useState } from 'react';
import { Calendar, Clock, User, Sparkles, FileText, Loader2 } from 'lucide-react';
import { BookingFormData } from './types';
import { generateMeetingAgenda } from './geminiService';

interface BookingFormProps {
  onSubmit: (data: BookingFormData, agenda: string) => Promise<void>;
  isSubmitting: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    employeeName: '',
    topic: ''
  });
  
  const [generatedAgenda, setGeneratedAgenda] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAISuggestion = async () => {
    if (!formData.topic) return;
    
    setIsGeneratingAI(true);
    
    // Calculate duration
    const start = parseInt(formData.startTime.replace(':', ''));
    const end = parseInt(formData.endTime.replace(':', ''));
    // Rough approximation for duration in minutes
    let duration = 60;
    if (end > start) {
        const startH = Math.floor(start / 100);
        const startM = start % 100;
        const endH = Math.floor(end / 100);
        const endM = end % 100;
        duration = (endH * 60 + endM) - (startH * 60 + startM);
    }

    try {
      const agenda = await generateMeetingAgenda(formData.topic, duration);
      setGeneratedAgenda(agenda);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, generatedAgenda);
    // Reset form fields partially
    setFormData(prev => ({...prev, topic: '', employeeName: ''}));
    setGeneratedAgenda('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <Calendar className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Запись в переговорную</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50"
            />
          </div>
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Начало</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="time"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Окончание</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="time"
                name="endTime"
                required
                value={formData.endTime}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Employee Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ФИО Сотрудника</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="employeeName"
              required
              placeholder="Например, Иванов Иван"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50"
            />
          </div>
        </div>

        {/* Meeting Topic & AI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Тема встречи</label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="topic"
                required
                placeholder="Например, Стратегия Q4"
                value={formData.topic}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50"
              />
            </div>
            <button
              type="button"
              onClick={handleAISuggestion}
              disabled={!formData.topic || isGeneratingAI}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center w-12 border border-purple-200"
              title="Сгенерировать повестку с ИИ"
            >
              {isGeneratingAI ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Generated Agenda Display */}
        {generatedAgenda && (
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-sm text-emerald-800 animate-fadeIn">
             <p className="font-semibold mb-1 flex items-center gap-2">
               <Sparkles className="w-3 h-3" /> Повестка от ИИ:
             </p>
             <p className="whitespace-pre-line">{generatedAgenda}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform transition-all active:scale-95 disabled:opacity-70 disabled:scale-100 flex justify-center items-center gap-2 mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Ждите...
            </>
          ) : (
            'Записаться'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;