/**
 * Component displaying history of generated numbers
 */
const History = ({ history, onClear, onRemove }) => {
  if (!history || history.length === 0) return null;

  return (
    <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 xl:p-10 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-indigo-400 text-xl lg:text-2xl xl:text-3xl font-bold">
          Recent Quantum Measurements
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-3 lg:gap-4 justify-center">
        {history.map((num, i) => (
          <span
            key={i}
            className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-4 py-2 lg:px-5 lg:py-3 rounded-full border border-indigo-500/30 font-semibold text-base lg:text-lg hover:from-indigo-500/40 hover:to-purple-500/40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group relative"
            onClick={() => onRemove && onRemove(num)}
            title="Click to remove from history"
          >
            {num}
            {onRemove && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                ×
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
};

export default History;
