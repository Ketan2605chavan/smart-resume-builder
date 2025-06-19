// src/components/Form.js
import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: '',
    experience: ''
  });

  const [suggestion, setSuggestion] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/resume/resume', formData);
      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Smart Resume Builder</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" onChange={handleChange} required /><br />
        <input name="education" placeholder="Education" onChange={handleChange} required /><br />
        <input name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} required /><br />
        <textarea name="experience" placeholder="Experience" onChange={handleChange} required /><br />
        <button type="submit">Get Suggestion</button>
      </form>
      {suggestion && <p><strong>Suggestion:</strong> {suggestion}</p>}
    </div>
  );
};

export default Form;
