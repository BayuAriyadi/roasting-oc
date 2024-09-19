'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/roast', {
        name,
        age,
        description,
      });
      setRoast(response.data.roast);
    } catch (error) {
      console.error('Error generating roast:', error);
      setRoast('Maaf, terjadi kesalahan dalam menghasilkan roasting.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Roast My OC with AI</h1>
      <form onSubmit={handleRoast}>
        <input
          type="text"
          placeholder="Nama OC"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px', width: '80%' }}
        />
        <br />
        <input
          type="number"
          placeholder="Umur OC"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px', width: '80%' }}
        />
        <br />
        <input
          type="text"
          placeholder="Deskripsi Singkat"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={20}
          required
          style={{ marginBottom: '10px', padding: '8px', width: '80%' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px' }} disabled={loading}>
          {loading ? 'Generating Roast...' : 'Roast!'}
        </button>
      </form>
      {roast && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{roast}</p>}
    </div>
  );
}
