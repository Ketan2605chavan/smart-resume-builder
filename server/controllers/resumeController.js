const generateSuggestion = (req, res) => {
  try {
    const { name, email, phone, summary, education, experience, projects, skills } = req.body;

    const suggestion = `
📌 Resume Suggestions for ${name}
----------------------------------------
✅ Summary:
${summary}

🎓 Education:
${education}

💼 Experience:
${experience}

📂 Projects:
${projects}

🛠️ Skills:
${skills}

📫 Contact: ${email} | 📞 ${phone}
    `.trim();

    res.json({ suggestions: suggestion });
  } catch (error) {
    console.error('Error generating suggestion:', error.message);
    res.status(500).json({ error: 'Something went wrong while generating the suggestion.' });
  }
};

module.exports = { generateSuggestion };
