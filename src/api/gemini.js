export async function generateMessage(context) {
  const response = await fetch("./netlify/functions/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ context }),
  });

  const data = await response.json();
  return data.message;
}
