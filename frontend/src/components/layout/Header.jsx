/**
 * Header component for the application
 */
const Header = ({ className = '' }) => {
  return (
    <header className={`text-center py-6 lg:py-12 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 text-slate-100 tracking-tight">Quantum Random Number Generator</h1>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">A professional demonstration of true randomness harnessing quantum superposition using IBM Qiskit Runtime</p>
      </div>
    </header>
  );
};



export default Header;
