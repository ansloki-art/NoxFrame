import { useState, useEffect } from 'react';

export default function App() {
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    fetch('http://localhost:8000/health')
    .then(res => res.json())
    .then(data => setStatus(data.status))
    .catch(() => setStatus('error'))
  }, [])

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold text-blue-500'>NoxFrame</h1>
      <p>Backend status: {status}</p>
    </div>
  )
}