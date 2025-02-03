'use client';

import { useState, useEffect } from 'react';
import { Loading } from '@/components/loading/Loading';

interface DatabaseStatus {
  status: 'success' | 'error';
  message: string;
  timestamp?: Date;
  error?: string;
}

export default function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        const response = await fetch('/api/test-db');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        setStatus({
          status: 'error',
          message: 'Failed to check database connection',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setLoading(false);
      }
    }

    checkConnection();
  }, []);

  if (loading) {
    return <Loading text="Checking database connection..." />;
  }

  return (
    <div className="p-4 rounded-lg border" role="status">
      <h2 className="text-lg font-semibold mb-2">Database Status</h2>
      
      {status && (
        <div className={`p-3 rounded ${
          status.status === 'success' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          <p className="font-medium">{status.message}</p>
          {status.timestamp && (
            <p className="text-sm mt-1">
              Last checked: {new Date(status.timestamp).toLocaleString()}
            </p>
          )}
          {status.error && (
            <p className="text-sm mt-1">Error: {status.error}</p>
          )}
        </div>
      )}
    </div>
  );
}