const fetchFeedbackQuestions = (request) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/feedback/questions`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      let res = JSON.parse(response);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

export { fetchFeedbackQuestions };
