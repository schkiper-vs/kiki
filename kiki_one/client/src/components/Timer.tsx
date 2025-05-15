// src/components/Timer.tsx
export function Timer() {
  return (
    <div className="content-block p-6 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 theme-text">Таймер</h2>
      <div className="text-4xl font-mono theme-text">00:00</div>
      <button className="content-block mt-4 px-4 py-2 hover:bg-opacity-30">
        Старт
      </button>
    </div>
  );
}