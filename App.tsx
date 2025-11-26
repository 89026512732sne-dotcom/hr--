import React, { useMemo, useState } from 'react';

const formatDate = (value: string) => {
  if (!value) return '18.09.2025';
  try {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('ru-RU');
  } catch {
    return value;
  }
};

const App: React.FC = () => {
  const [name, setName] = useState('Имя');
  const [date, setDate] = useState('2025-09-18');

  const formattedDate = useMemo(() => formatDate(date), [date]);
  const displayName = name.trim() || 'Имя';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-80 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">Слайд 1</p>
                <h1 className="text-2xl font-semibold mt-2">Конструктор приветствия</h1>
                <p className="text-sm text-slate-500 mt-1">Измени данные справа и получи готовый кадр.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-xs font-semibold text-slate-500 tracking-wide">Имя</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-slate-500 tracking-wide">Дата</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </label>
            </div>
          </div>

          <div className="bg-emerald-600 text-white rounded-2xl shadow-lg p-5">
            <p className="text-sm font-semibold">Совет</p>
            <p className="text-sm text-emerald-50 mt-1">Используй понятное имя и актуальную дату — они мгновенно появятся на превью слайда.</p>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-50 to-white" />
              <div className="absolute inset-0 flex flex-col md:flex-row">
                <div className="relative z-10 w-full md:w-3/5 px-8 py-10 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-emerald-600 font-black text-2xl flex items-center justify-center shadow-lg">
                      G
                    </div>
                    <div className="font-semibold text-3xl tracking-tight text-slate-900">GRASS</div>
                  </div>

                  <div className="mt-10 space-y-4">
                    <div>
                      <p className="text-sm text-emerald-900/70 font-semibold">GRASS</p>
                      <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                        Привет, {displayName}!
                      </h2>
                    </div>
                    <p className="text-lg text-emerald-900/80 max-w-xl">
                      Компания «GRASS» рада сделать тебе предложение
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-full shadow-lg shadow-emerald-200">
                      <div className="text-sm font-semibold">Предложение о работе от {formattedDate}</div>
                    </div>
                  </div>
                </div>

                <div className="relative flex-1 flex items-end justify-center md:justify-end pr-6 pb-6">
                  <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-100/70 rounded-full blur-3xl" />
                  <div className="absolute right-10 top-10 w-24 h-24 bg-white/70 rounded-full" />
                  <div className="relative flex items-end gap-6">
                    <div className="relative w-40 h-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-white to-emerald-50" />
                      <div className="relative p-4 flex flex-col justify-between h-full">
                        <div>
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center">bio</div>
                          <p className="mt-2 text-sm font-semibold text-slate-800">Crispi</p>
                          <p className="text-xs text-slate-500">Для стирки 2в1</p>
                        </div>
                        <div className="space-y-1 text-[10px] text-emerald-700 font-semibold">
                          <p>1.67 кг</p>
                          <p>5 л</p>
                          <p>гипоаллергенно</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-4 bg-white/80 rounded-[32px] blur" />
                      <div className="relative w-40 h-48 bg-white rounded-[28px] shadow-2xl border border-slate-100 p-4 flex flex-col justify-between text-center">
                        <div className="text-emerald-600 font-bold text-xl">bio</div>
                        <div className="text-slate-800 font-semibold">Натуральная<br />формула</div>
                        <div className="text-xs text-slate-500">Безопасно<br />для всей семьи</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
