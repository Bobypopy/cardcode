document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');

    let dx = 0;
    let dy = 0;
    let lastMouseX = null;
    let lastMouseY = null;

    document.addEventListener('mousemove', (e) => {
        if (lastMouseX !== null && lastMouseY !== null) {
            dx = (e.clientX - lastMouseX) * 0.1;
            dy = (e.clientY - lastMouseY) * 0.1;
        }

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    function animateLogo() {
        const logoRect = logo.getBoundingClientRect();

        if (logoRect.left + dx < 0 || logoRect.right + dx > window.innerWidth) {
            dx *= -0.8; // Change la direction et diminue la vitesse si l'icône touche les bords horizontaux
        }
        if (logoRect.top + dy < 0 || logoRect.bottom + dy > window.innerHeight) {
            dy *= -0.8; // Change la direction et diminue la vitesse si l'icône touche les bords verticaux
        }

        logo.style.left = `${logoRect.left + dx}px`;
        logo.style.top = `${logoRect.top + dy}px`;

        requestAnimationFrame(animateLogo);
    }

    animateLogo();
});
