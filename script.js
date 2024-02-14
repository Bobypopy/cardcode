// Récupération des éléments du DOM
const logo = document.querySelector('.logo');
const image = document.querySelector('img');
const screen = document.querySelector('body');

// Variables pour la physique du jeu
let isDragging = false;
let power = 0;
let angle = 0;
let velocityX = 0;
let velocityY = 0;
const friction = 0.98; // Facteur de décélération
const powerMultiplier = 0.1; // Multiplicateur de puissance

// Fonction pour gérer le mouvement lors du glissement de la souris
function handleMouseMove(event) {
  if (isDragging) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    angle = Math.atan2(mouseY - logo.offsetTop, mouseX - logo.offsetLeft);
  }
}

// Fonction pour gérer le début du glissement
function handleMouseDown() {
  isDragging = true;
}

// Fonction pour gérer la fin du glissement
function handleMouseUp() {
  isDragging = false;
  power = Math.sqrt((logo.offsetLeft - event.clientX) ** 2 + (logo.offsetTop - event.clientY) ** 2) * powerMultiplier;
  velocityX = Math.cos(angle) * power;
  velocityY = Math.sin(angle) * power;
}

// Fonction de mise à jour de la position des boules
function update() {
  if (!isDragging) {
    velocityX *= friction;
    velocityY *= friction;

    // Vérification des collisions avec le bord de l'écran
    if (logo.offsetLeft < 0 || logo.offsetLeft + logo.offsetWidth > screen.offsetWidth) {
      velocityX *= -1;
    }
    if (logo.offsetTop < 0 || logo.offsetTop + logo.offsetHeight > screen.offsetHeight) {
      velocityY *= -1;
    }

    // Mise à jour de la position des boules
    logo.style.left = `${logo.offsetLeft + velocityX}px`;
    logo.style.top = `${logo.offsetTop + velocityY}px`;
  }
  
  // Appel de la fonction update à chaque trame
  requestAnimationFrame(update);
}

// Ajout des écouteurs d'événements pour gérer le mouvement de la souris
screen.addEventListener('mousemove', handleMouseMove);
screen.addEventListener('mousedown', handleMouseDown);
screen.addEventListener('mouseup', handleMouseUp);

// Lancer la mise à jour des positions des boules
update();


