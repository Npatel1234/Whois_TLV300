import { useState } from 'react';
import WhoisForm from './components/WhoisForm.jsx';
import WhoisTable from './components/WhoisTable.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState('domain');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Whois Lookup</h1>
      <WhoisForm setResult={setResult} setError={setError} setDataType={setDataType} />
      {error && <ErrorMessage message={error} />}
      {result && <WhoisTable data={result} dataType={dataType} />}
    </div>
  );
}

export default App;