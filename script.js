
      function mostrarRespuesta(opcion) {
        const respuesta = document.getElementById("respuesta-decision");
        const opciones = document.querySelectorAll(".option-btn");
        opciones.forEach((btn) => (btn.disabled = true));
        if (opcion === 1) {
          respuesta.textContent =
            "¡Correcto! Llamar al 911 es la mejor opción.";
          respuesta.style.color = "var(--green)";
        } else {
          respuesta.textContent =
            "Incorrecto. Siempre hay que alertar a las autoridades.";
          respuesta.style.color = "var(--red)";
        }
      }

      function toggleSobreNosotros() {
        const sobreNosotros = document.getElementById("sobre-nosotros");
        if (sobreNosotros.style.display === "none") {
          sobreNosotros.style.display = "block";
        } else {
          sobreNosotros.style.display = "none";
        }
      }

      // Función para mezclar un array (Fisher-Yates)
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      // 10 preguntas, 5 opciones cada una
      const quizData = [
        {
          question: "¿Qué deberías hacer si ves a un niño solo y asustado en la calle?",
          choices: [
            "Ignorarlo, probablemente está esperando a alguien.",
            "Llamar a la policía o a un adulto responsable.",
            "Tomarlo de la mano y llevarlo contigo.",
            "Preguntarle si está perdido y avisar a un adulto cercano.",
            "Grabar la situación con tu celular."
          ],
          correct: 3
        },
        {
          question: "¿Cuál de estas señales puede indicar un posible secuestro?",
          choices: [
            "Un niño corriendo en el parque.",
            "Un adulto discutiendo con un niño que grita 'no te conozco'.",
            "Un niño llorando porque perdió su juguete.",
            "Un adulto tomando del brazo a un niño que parece incómodo.",
            "Un niño jugando solo en la plaza."
          ],
          correct: 1
        },
        {
          question: "¿Qué información es más útil para las autoridades si presencias un secuestro?",
          choices: [
            "El color de la ropa del niño.",
            "La marca y color del vehículo involucrado.",
            "El nombre del niño.",
            "La dirección exacta del hecho.",
            "La hora aproximada del suceso."
          ],
          correct: 1
        },
        {
          question: "¿Cuál NO es una medida preventiva recomendada para niños?",
          choices: [
            "No hablar con extraños.",
            "Compartir su ubicación en redes sociales.",
            "Tener una palabra clave familiar.",
            "Avisar siempre a dónde van.",
            "Aprender a pedir ayuda en público."
          ],
          correct: 1
        },
        {
          question: "¿Qué acción puede poner en riesgo a un niño?",
          choices: [
            "Aceptar regalos de desconocidos.",
            "Ir acompañado a la escuela.",
            "Avisar a sus padres si algo raro ocurre.",
            "No compartir información personal en internet.",
            "Aprender a decir NO."
          ],
          correct: 0
        },
        {
          question: "¿Cuál es la mejor forma de actuar si un desconocido te ofrece llevarte a casa?",
          choices: [
            "Aceptar si parece amable.",
            "Decirle que no y alejarte rápidamente.",
            "Pedirle su identificación.",
            "Esperar a que insista varias veces.",
            "Llamar a tus padres antes de decidir."
          ],
          correct: 1
        },
        {
          question: "¿Qué dato es menos relevante para denunciar un secuestro?",
          choices: [
            "La matrícula del vehículo.",
            "El color de la ropa del niño.",
            "La dirección exacta del hecho.",
            "El nombre del adulto sospechoso (si lo sabes).",
            "La hora aproximada del suceso."
          ],
          correct: 1
        },
        {
          question: "¿Qué deberías hacer si recibes un mensaje sospechoso en redes sociales?",
          choices: [
            "Ignorarlo y no contárselo a nadie.",
            "Responder para saber quién es.",
            "Bloquear y avisar a un adulto de confianza.",
            "Compartirlo con tus amigos.",
            "Aceptar la solicitud si tiene foto de perfil."
          ],
          correct: 2
        },
        {
          question: "¿Cuál de estas situaciones es más peligrosa?",
          choices: [
            "Ir solo a casa por un camino poco transitado.",
            "Ir acompañado de amigos.",
            "Avisar siempre a tus padres dónde estás.",
            "No hablar con extraños.",
            "Llevar un teléfono móvil cargado."
          ],
          correct: 0
        },
        {
          question: "¿Qué es lo primero que debes hacer si presencias un intento de secuestro?",
          choices: [
            "Grabar la situación con tu celular.",
            "Intervenir físicamente.",
            "Llamar inmediatamente a la policía o pedir ayuda a un adulto.",
            "Seguir caminando y no involucrarte.",
            "Publicarlo en redes sociales."
          ],
          correct: 2
        }
      ];

      const questionEl = document.getElementById("question");
      const choicesEl = document.getElementById("choices");
      const nextBtn = document.getElementById("next-btn");
      const resultEl = document.getElementById("result");
      const progressBar = document.getElementById("progress-bar");

      let currentQuestion = 0;
      let score = 0;
      let currentCorrectIndex = 0;

      function updateProgress(index, total) {
        const percent = ((index + 1) / total) * 100;
        progressBar.style.width = percent + "%";
      }

      function loadQuestion() {
        const q = quizData[currentQuestion];
        questionEl.textContent = q.question;
        choicesEl.innerHTML = "";
        resultEl.textContent = "";
        nextBtn.style.display = "none";
        updateProgress(currentQuestion, quizData.length);

        // Mezclar opciones y guardar el índice de la correcta
        const options = q.choices.map((choice, idx) => ({ choice, idx }));
        shuffle(options);
        const correctIndex = options.findIndex(opt => opt.idx === q.correct);

        options.forEach((opt, i) => {
          const btn = document.createElement("button");
          btn.textContent = opt.choice;
          btn.classList.add("btn");
          btn.style.margin = "5px 0";
          btn.onclick = () => selectAnswer(i, correctIndex);
          choicesEl.appendChild(btn);
        });
      }

      function selectAnswer(selectedIndex, correctIndex) {
        const buttons = choicesEl.querySelectorAll("button");
        buttons.forEach((btn) => (btn.disabled = true));

        if (selectedIndex === correctIndex) {
          score++;
          resultEl.textContent = "¡Correcto!";
          resultEl.style.color = "var(--green)";
        } else {
          const q = quizData[currentQuestion];
          resultEl.textContent = `Incorrecto. La respuesta correcta era: "${q.choices[q.correct]}"`;
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
          updateProgress(quizData.length - 1, quizData.length); // barra llena al final
        }
      };

      loadQuestion();

      // Animaciones extra
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
        checkVisible();
      });

      window.addEventListener("load", () => {
        const elementos = document.querySelectorAll(
          "header, section, .cards, footer"
        );
        elementos.forEach((el, index) => {
          el.classList.add("animate-on-load");
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 300);
        });
      });

      const fadeSlideElems = document.querySelectorAll(".fade-slide");
      fadeSlideElems.forEach((el) => {
        el.classList.add("fade-slide-in");
      });