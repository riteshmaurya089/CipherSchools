const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

exports.getHint = async (req, res) => {
  try {
    const { assignmentId, query } = req.body || {};

    if (!assignmentId || !query) {
      return res.status(400).json({
        error: "Missing assignmentId or query",
      });
    }

    const completion = await client.chat.completions.create({
      model: "moonshotai/Kimi-K2-Instruct-0905",
      messages: [
        {
          role: "system",
          content:
            "You are a SQL tutor. Give short hints only. Do NOT give full answers.",
        },
        {
          role: "user",
          content: `Give a helpful SQL hint for this query:\n${query}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.4,
    });

    const hint = completion.choices[0].message.content;

    res.json({
      success: true,
      hint,
      provider: "huggingface-router",
    });

  } catch (err) {
    console.error("HF ROUTER ERROR:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
};