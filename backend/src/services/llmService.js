const axios = require('axios');
const { LLM_API_KEY } = require('../config/envconfig');

/**
 * Get SQL hint from LLM
 * @param {string} assignmentId
 * @param {string} userQuery
 * @returns {Promise<string>} hint text
 */
const getSQLHint = async (assignmentId, userQuery) => {
  // Example prompt engineering
  const prompt = `
You are a helpful SQL tutor. A student is working on assignment ${assignmentId}.
The student's current query is: "${userQuery || 'No query provided'}"
Provide a hint or guidance to help the student improve their SQL query.
Do NOT give the full solution.
`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const hint = response.data.choices[0].message.content;
    return hint;
  } catch (error) {
    console.error('LLM Hint Error:', error.message);
    return 'Sorry, hint generation failed. Try again later.';
  }
};

module.exports = {
  getSQLHint,
};