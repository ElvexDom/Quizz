// Définition des variables pour suivre l'état du quiz
let foodData; // Variable pour stocker les données du quiz
let foodName; // Nom de l'aliment actuellement affiché
let foodIndex = 0; // Index de l'aliment actuellement affiché
let selectedAnswer; // Réponse sélectionnée par le joueur
let count = 0; // Compteur de réponses correctes

function montrerScore() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const total = urlParams.get('total');

    // Mostrar la puntuación y el total en la página de felicitaciones
    document.getElementById("resultatFinal").innerText = "Respuestas correctas: " + score + "/" + total;
}
console.log(window.location.pathname)
// Verificar si estamos en la página index.html o congratulations.html
if (window.location.href.endsWith('/index.html')) {
    // Agregar event listeners solo si estamos en index.html
    console.log(foodData);
    document.getElementById("option1").addEventListener("click", () => checkAnswer('Glucides'));
    document.getElementById("option2").addEventListener("click", () => checkAnswer('Lipides'));
    document.getElementById("option3").addEventListener("click", () => checkAnswer('Protéines'));
} else if (window.location.pathname === '/congratulations.html') {
    // Si estamos en congratulations.html, llamar a la función para mostrar la puntuación y el total
    montrerScore();
}
// Écouteurs d'événements pour les boutons d'options de réponse
document.getElementById("option1").addEventListener("click", () => checkAnswer('Glucides'));
document.getElementById("option2").addEventListener("click", () => checkAnswer('Lipides'));
document.getElementById("option3").addEventListener("click", () => checkAnswer('Protéines'));


// Fonction pour récupérer les données JSON du quiz
function recuperejson() {
    fetch('food.json') // Récupère le fichier JSON contenant les données du quiz
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            foodData = data; // Stocke les données dans la variable foodData
            showImageAndOptions(foodData); // Affiche la première question du quiz
        })
        .catch(error => console.error('Error fetching JSON:', error)); // Gère les erreurs de récupération des données JSON
}

// Fonction pour afficher l'image de l'aliment et ses options
function showImageAndOptions(foodData) {
    foodName = foodData[foodIndex].nom; // Récupère le nom de l'aliment actuellement affiché
    const foodImage = foodData[foodIndex].image; // Récupère l'image de l'aliment actuellement affiché
    document.getElementById('quizz-img').src = foodImage; // Affiche l'image de l'aliment sur la page
    document.getElementById("foodAliment").innerText = foodName; // Affiche le nom de l'aliment sur la page
}

// Fonction pour incrémenter le compteur de réponses correctes
function countCorrectAnswer() {
    count = count + 1; // Incrémente le compteur de réponses correctes
    // Affiche le nombre de réponses correctes sur la page
    document.getElementById("resultatFinal").innerText = "Correct answers: " + count + "/" + foodData.length;
}

// Fonction pour afficher le score final du quiz et rediriger vers la page de félicitations
function showFinal() {
    // Redirige l'utilisateur vers la page de félicitations avec le score final
    window.location.href = "congratulations.html?score=" + count + "&total=" + foodData.length;
}


// Fonction pour vérifier la réponse sélectionnée par le joueur
function checkAnswer(selectedAnswer) {
    // Effectue une requête pour vérifier la réponse auprès du serveur
    fetch(`/check-answer/${foodName}/${selectedAnswer}`)
        .then(response => response.text())
        .then(message => {
            // Affiche le message de réponse du serveur sur la page
            document.getElementById("response-message").innerText = JSON.parse(message).message;
            // Vérifie si la réponse du joueur est correcte
            if (JSON.parse(message).message === "Correct answer!") {
                countCorrectAnswer(); // Incrémente le compteur de réponses correctes
            } else {
                //console.log("Your answer is incorrect");
            }
        })
        .catch(error => console.error('Error:', error));

    foodIndex = foodIndex + 1; // Passe à la question suivante
    // Vérifie s'il reste des questions à afficher
    if (foodIndex < foodData.length) {
        showImageAndOptions(foodData); // Affiche la prochaine question
    } else {
        showFinal(); // Affiche le score final si toutes les questions ont été répondues
    }
}

window.addEventListener("load", function () {
    recuperejson();
});