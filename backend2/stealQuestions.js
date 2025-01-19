// Function to fetch and process trivia questions
exports.fetchTriviaQuestions = async () => {
  try {
    // Fetch data from the API
    const response = await fetch(
      "https://opentdb.com/api.php?amount=50&type=multiple"
    );
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    // Process the questions
    const processedQuestions = data.results.map((item) => ({
      ...item,
      question: item.question.replace(/&#039;/g, "'").replace(/&quot;/g, '"'),
      correct_answer: item.correct_answer
        .replace(/&#039;/g, "'")
        .replace(/&quot;/g, '"'),
    }));

    return processedQuestions;
  } catch (error) {
    console.error("Error:", error);
  }
};
