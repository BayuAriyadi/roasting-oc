import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [roast, setRoast] = useState('');

  const handleRoast = (e) => {
    e.preventDefault();
    const roasts = [
      `Wow, ${name}, umur ${age}, dengan deskripsi ${description} itu? Benar-benar OC yang 'unik'!`,
      `Seriusan, ${name}? OC yang umur ${age} dan hanya deskripsi "${description}"?`,
      `OC ${name} yang ${age} tahun itu bikin siapa pun mikir dua kali. Deskripsi "${description}" terlalu singkat buat di-roast!`,
    ];
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    setRoast(randomRoast);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Roast My OC</h1>
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
          maxLength="20"
          required
          style={{ marginBottom: '10px', padding: '8px', width: '80%' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px' }}>Roast!</button>
      </form>
      {roast && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{roast}</p>}
    </div>
  );
}
