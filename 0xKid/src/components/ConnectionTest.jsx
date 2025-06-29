import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axiosInstance.get('/health');
        setStatus(`✅ Backend connected! Server says: ${response.data.message}`);
        setError(null);
      } catch (err) {
        setStatus('❌ Backend connection failed');
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Backend Connection Test</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">{status}</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="text-sm">Error: {error}</p>
            <p className="text-xs mt-1">
              Make sure your backend is running on port 5000
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionTest; 