from flask import Flask, jsonify
from flask_cors import CORS
from qiskit import QuantumCircuit, transpile, assemble
from qiskit_aer import AerSimulator

app = Flask(__name__)
CORS(app)

def generate_random_number():
    """
    Generate a random number 1-100 using quantum superposition (7 qubits).
    Maps the 0-127 result to 1-100 range approximately.
    """
    num_qubits = 7
    qc = QuantumCircuit(num_qubits, num_qubits)

    # Apply Hadamard to all qubits for superposition
    qc.h(range(num_qubits))

    # Measure all qubits
    qc.measure_all()

    # Create simulator
    simulator = AerSimulator()

    # Run circuit with 1 shot for true randomness
    transpiled_circuit = transpile(qc, simulator)
    job = simulator.run(transpiled_circuit, shots=1)
    result = job.result()
    counts = result.get_counts()

    # Extract the binary string and convert to int
    binary_string = list(counts.keys())[0]
    # Remove spaces and reverse for correct qubit ordering
    clean_binary = binary_string.replace(' ', '')[::-1]
    raw_number = int(clean_binary, 2)

    # Map to 1-100 range (approximate uniform distribution)
    random_number = (raw_number % 100) + 1

    return random_number

@app.route('/generate', methods=['POST'])
def generate():
    random_number = generate_random_number()
    return jsonify({
        'random_number': random_number,
        'range': '1-100 (7 qubits)'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
