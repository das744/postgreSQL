import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submissions, setSubmissions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/submit', form);
    setForm({ name: '', email: '', message: '' });
    fetchSubmissions();
  };

  const fetchSubmissions = async () => {
    const res = await axios.get('http://localhost:5000/submissions');
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" /><br />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" /><br />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" /><br />
        <button type="submit">Submit</button>
      </form>

      <h2>Submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            {s.name} ({s.email}): {s.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
