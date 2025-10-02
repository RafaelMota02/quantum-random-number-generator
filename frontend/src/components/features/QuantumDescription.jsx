/**
 * Component describing the quantum randomness engine
 */
const QuantumDescription = () => {
  const concepts = [
    {
      title: 'Quantum Superposition',
      description: 'Qubits exist in multiple states simultaneously until measurement.',
      gradient: 'bg-indigo-500/10 border-indigo-500/20',
      titleClass: 'text-indigo-300',
    },
    {
      title: 'Entanglement',
      description: 'Qubits remain correlated regardless of physical separation.',
      gradient: 'bg-purple-500/10 border-purple-500/20',
      titleClass: 'text-purple-300',
    },
    {
      title: 'Measurement Collapse',
      description: 'Observing the quantum system forces probabilistic outcomes.',
      gradient: 'bg-pink-500/10 border-pink-500/20',
      titleClass: 'text-pink-300',
    },
  ];

  return (
    <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 xl:p-10 border border-white/10">
      <h3 className="text-indigo-400 mb-4 text-xl lg:text-2xl xl:text-3xl font-bold">
        Quantum Randomness Engine
      </h3>
      <p className="text-slate-200 leading-relaxed text-sm md:text-base lg:text-lg xl:text-xl opacity-90 max-w-4xl">
        This application harnesses the fundamental principles of quantum mechanics through IBM's Qiskit Runtime. By preparing 7 qubits in a superposition state and measuring the quantum circuit, we extract true randomness that cannot be predicted by classical algorithms. Unlike pseudorandom generators, this implementation provides cryptographically secure randomness with no periodicity or predictability.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {concepts.map((concept, index) => (
          <div key={index} className={`rounded-lg p-4 border ${concept.gradient}`}>
            <h4 className={`font-semibold mb-2 ${concept.titleClass}`}>
              {concept.title}
            </h4>
            <p className="text-xs text-slate-400">{concept.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuantumDescription;
