import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', summary: '',
    education: '', experience: '', projects: '', skills: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/resume/suggest', formData);
      setAiSuggestions(res.data.suggestions);
    } catch (err) {
      console.error(err);
      alert('Failed to get suggestions');
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('suggestion-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume-suggestions.pdf');
    });
  };

  const fields = ['name', 'email', 'phone', 'summary', 'education', 'experience', 'projects', 'skills'];

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Smart Resume Builder</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {fields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-700 capitalize">{field}</label>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
              rows={field === 'summary' ? 2 : 3}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Get AI Suggestions
        </button>
      </form>

      {aiSuggestions && (
        <div className="mt-6 p-4 border rounded bg-gray-50" id="suggestion-content">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">AI Suggestions</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{aiSuggestions}</pre>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={downloadPDF}
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
