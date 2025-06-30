# secdninos.github.io
Sitio web educativo sobre el secuestro de niños infantil.




      function updateProgress(currentQuestionIndex, totalQuestions) {
        const progressBar = document.getElementById("progress-bar");
        const percent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        progressBar.style.width = percent + "%";
      }

      function mostrarRespuesta(index) {
        const respuestas = [
          "Ignorar puede significar perder una oportunidad de salvar una vida.",
          "¡Muy bien! Llamar a emergencias es lo correcto en estos casos.",
          "Puede ayudar como prueba, pero primero debe llamarse a las autoridades.",
        ];
        const colores = ["var(--red)", "var(--green)", "var(--accent)"];
        document.getElementById("respuesta-decision").textContent =
          respuestas[index];
        document.getElementById("respuesta-decision").style.color =
          colores[index];
      }
      const quizData = [
        {
          question: "¿Qué significa 'Alerta'?",
          choices: [
            "Estado de atención ante peligro",
            "Persona que secuestra",
            "Lugar seguro",
          ],
          correct: 0,
        },
        {
          question: "¿Qué es un 'Testigo'?",
          choices: [
            "Alguien que ve un hecho importante",
            "Un culpable",
            "Un policía",
          ],
          correct: 0,
        },
        {
          question: "¿Cuál es el objetivo del 'Rescate'?",
          choices: [
            "Liberar a alguien en peligro",
            "Capturar al sospechoso",
            "Ignorar la situación",
          ],
          correct: 0,
        },
        {
          question: "¿Qué es una 'Sospecha'?",
          choices: ["Duda sobre algo malo", "Prueba definitiva", "Una mentira"],
          correct: 0,
        },
        {
          question: "¿Qué busca la 'Investigación'?",
          choices: [
            "Descubrir la verdad",
            "Ignorar el problema",
            "Celebrar un evento",
          ],
          correct: 0,
        },
      ];

      const questionEl = document.getElementById("question");
      const choicesEl = document.getElementById("choices");
      const nextBtn = document.getElementById("next-btn");
      const resultEl = document.getElementById("result");

      let currentQuestion = 0;
      let score = 0;

      function loadQuestion() {
        const q = quizData[currentQuestion];
        questionEl.textContent = q.question;
        choicesEl.innerHTML = "";
        resultEl.textContent = "";
        nextBtn.style.display = "none";

        q.choices.forEach((choice, i) => {
          const btn = document.createElement("button");
          btn.textContent = choice;
          btn.classList.add("btn");
          btn.style.margin = "5px 0";
          btn.onclick = () => selectAnswer(i);
          choicesEl.appendChild(btn);
        });
      }

      function selectAnswer(choiceIndex) {
        const q = quizData[currentQuestion];
        const buttons = choicesEl.querySelectorAll("button");
        buttons.forEach((btn) => (btn.disabled = true));

        if (choiceIndex === q.correct) {
          score++;
          resultEl.textContent = "¡Correcto!";
          resultEl.style.color = "var(--green)";
        } else {
          resultEl.textContent = `Incorrecto. La respuesta correcta es: "${
            q.choices[q.correct]
          }"`;
          resultEl.style.color = "var(--red)";
        }
        nextBtn.style.display = "inline-block";
      }

      nextBtn.onclick = () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          questionEl.textContent = `¡Terminaste el quiz! Tu puntaje: ${score} / ${quizData.length}`;
          choicesEl.innerHTML = "";
          nextBtn.style.display = "none";
          resultEl.textContent =
            "Gracias por aprender y ayudar a concientizar.";
          resultEl.style.color = "var(--accent)";
        }
      };

      loadQuestion();
      function toggleSobreNosotros() {
        const section = document.getElementById("sobre-nosotros");
        section.style.display =
          section.style.display === "none" ? "block" : "none";
      }
      document.addEventListener("DOMContentLoaded", () => {
        const fadeElems = document.querySelectorAll(
          "section, .card, .prevencion ul li, .estadistica-item ul li"
        );

        function checkVisible() {
          const triggerBottom = window.innerHeight * 0.85;

          fadeElems.forEach((elem) => {
            const rect = elem.getBoundingClientRect();
            if (rect.top < triggerBottom) {
              elem.classList.add("visible");
            }
          });
        }

        window.addEventListener("scroll", checkVisible);
        checkVisible(); // Al cargar la página también
      });
      // Animación al cargar la página
      window.addEventListener("load", () => {
        const elementos = document.querySelectorAll(
          "header, section, .cards, footer"
        );
        elementos.forEach((el, index) => {
          el.classList.add("animate-on-load");
          // Animar con delay en cascada
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 300); // 300ms de delay entre cada elemento
        });
      });