// Récupération des éléments du DOM
const logo = document.querySelector('.logo');
const image = document.querySelector('img');
const screen = document.querySelector('body');

// Variables pour la physique du jeu
let isDragging = false;
let mass = 1; // Masse de la boule
let power = 0;
let angle = 0;
let velocityX = 0;
let velocityY = 0;
let angularVelocity = 0; // Vitesse angulaire de rotation
const friction = 0.98; // Facteur de décélération
const powerMultiplier = 0.1; // Multiplicateur de puissance
const angularFriction = 0.95; // Facteur de décélération de rotation
const frictionCoefficient = 0.05; // Coefficient de frottement avec la table

// Fonction pour gérer le mouvement lors du glissement de la souris
function handleMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    angle = Math.atan2(mouseY - logo.offsetTop, mouseX - logo.offsetLeft);
}

// Fonction de mise à jour de la position des boules
function update() {
    if (isDragging) {
        power = Math.sqrt((logo.offsetLeft - event.clientX) ** 2 + (logo.offsetTop - event.clientY) ** 2) * powerMultiplier;
        velocityX = Math.cos(angle) * power / mass;
        velocityY = Math.sin(angle) * power / mass;
    }
    
    velocityX *= friction;
    velocityY *= friction;

    // Frottement avec la table
    velocityX -= velocityX * frictionCoefficient;
    velocityY -= velocityY * frictionCoefficient;

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

    // Rotation de la boule
    angularVelocity *= angularFriction;
    logo.style.transform = `rotate(${angularVelocity}deg)`;

    // Appel de la fonction update à chaque trame
    requestAnimationFrame(update);
}

// Ajout des écouteurs d'événements pour gérer le mouvement de la souris
screen.addEventListener('mousemove', handleMouseMove);

// Lancer la mise à jour des positions des boules
update();

