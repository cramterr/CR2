var correct = [];
var questions = [];

document.getElementById("TriviaGet").addEventListener("click", function(event) {
  event.preventDefault();

  const url = "https://opentdb.com/api.php?amount=10&category=11&type=multiple";
  fetch(url)
  .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      correct = [];
      questions = [];
      let quiz = "";
      for (let j=0; j < json.results.length; j++) {
        let min = Math.ceil(0);
        let max = Math.floor(json.results[j].incorrect_answers.length);
        let correctanspos = Math.floor(Math.random() * (max - min) + min);
        let answers = Object.values(json.results[j].incorrect_answers);
        correct.push(json.results[j].correct_answer);
        questions.push(json.results[j].question);
        answers.splice(correctanspos, 0, json.results[j].correct_answer);
        quiz += "<form class='question'>";
        quiz += "<label>" + json.results[j].question + "</label><br>";
        for (let i=0; i < answers.length; i++) {
          quiz += "<input type='radio' id='" + json.results[j].question + i + " name='question" + i +"' value='" + answers[i] + "'>";
          quiz += "<label for='" + json.results[j].question + i + "'>" + answers[i] + "</label><br>";
        }
        quiz += "</form><hr>";
      }
      document.getElementById("quizQuestions").innerHTML = quiz;
    });

});

document.getElementById("Submit").addEventListener("click", function(event) {
    event.preventDefault();

    let gradedQuiz = "";
    for (let i=0; i < correct.length; i++) {
      var correctAnswer = false;
      gradedQuiz += "<form class='question'>";
      gradedQuiz += "<label>" + questions[i] + "</label><br>";
      console.log(correct[i])
      let groupName = "question" + i;
      var answerGroup = document.getElementsByName(groupName);
      for (let j=0; j < answerGroup.length; j++) {
        console.log(answerGroup[j]);
        if (answerGroup[j].checked) {
          if (answerGroup[j].value == correct[i]) {
            correctAnswer = true;
          }
        }
      }
      if (correctAnswer) {
        gradedQuiz += "<label>Correct! " + correct[i] + " was the right answer.</label><br>";
      } else {
        gradedQuiz += "<label>Wrong! " + correct[i] + " was the right answer.</label><br>";
      }
      gradedQuiz += "</form><hr>";
    }
    document.getElementById("quizQuestions").innerHTML = gradedQuiz;
});
