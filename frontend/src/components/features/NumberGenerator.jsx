
import Button from '../ui/Button.jsx';

/**
 * Number generator component with display and generate button
 */
const NumberGenerator = ({ randomNumber, onGenerate, loading }) => {
  return (
    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 lg:p-12 xl:p-16 shadow-2xl border border-white/10 text-center transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-500/20">
      <div className="mb-8">
        <span className={`inline-block ${randomNumber !== '?' ? 'generated' : ''} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl number`}>
          {randomNumber}
        </span>
      </div>
      <Button
        onClick={onGenerate}
        disabled={loading}
        size="md"
      >
        {loading ? 'Initializing Quantum Circuit...' : 'Generate True Random Number'}
      </Button>
      <p className="text-slate-400 text-sm md:text-base xl:text-lg mt-6">
        Quantum Range: 1-100 using 7 entangled qubits
      </p>
    </section>
  );
};



export default NumberGenerator;
