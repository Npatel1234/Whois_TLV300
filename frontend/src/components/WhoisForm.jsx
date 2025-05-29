import { useState } from 'react';
import axios from 'axios';

function WhoisForm({ setResult, setError, setDataType }) {
  const [domain, setDomain] = useState('');
  const [dataType, setLocalDataType] = useState('domain');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/whois', {
        domainName: domain,
        dataType: dataType
      });
      setResult(response.data);
      setDataType(dataType);
    } catch (err) {
      console.error('Whois API Error:', err.response || err); // Add this line for debugging
      setError(err.response?.data?.error || 'An error occurred while fetching Whois data');
    }
  };

  return (
    <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Domain Name</label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="e.g., amazon.com"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Data Type</label>
        <select
          value={dataType}
          onChange={(e) => setLocalDataType(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="domain">Domain Information</option>
          <option value="contact">Contact Information</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Lookup
      </button>
    </form>
  );
}

export default WhoisForm;