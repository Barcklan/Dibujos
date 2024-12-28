// Función para manejar las pestañas
function openTab(event, tabId) {
    // Ocultar todo el contenido de las pestañas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // Eliminar la clase "active" de todos los botones
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Mostrar la pestaña seleccionada
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Añadir la clase "active" al botón seleccionado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Actualizar la URL con el parámetro de la pestaña activa
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("Bienvenido a tu colección de dibujos!");

    // Elementos principales
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const span = document.querySelector(".close");
    const images = document.querySelectorAll('.gallery .drawing img');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');
    const backButton = document.getElementById('backButton');
    const searchBtn = document.getElementById('searchBtn');
    const tabsContainer = document.querySelector('.tabs-container');

    let lastActiveTabId = 'pestaña1'; // Guardar el ID de la última pestaña activa

    // Restaurar el estado inicial desde la URL
    const params = new URLSearchParams(window.location.search);
    const activeTab = params.get('tab') || 'pestaña1'; // Pestaña predeterminada
    const searchValue = params.get('search');

    if (searchValue) {
        // Restaurar búsqueda si existe el parámetro "search"
        searchInput.value = searchValue;
        searchImage(searchValue);
    } else {
        // Restaurar pestaña activa
        openTab(null, activeTab);
    }

    // Modal: Abrir
    images.forEach(function (image) {
        image.addEventListener('click', function () {
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show"), 10);
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    // Modal: Cerrar
    if (span) {
        span.addEventListener('click', function () {
            modal.classList.remove("show");
            setTimeout(() => modal.style.display = "none", 500);
        });
    }

    // Función para buscar una imagen
    function searchImage(searchValue = null) {
        if (!searchValue) {
            searchValue = searchInput.value.trim();
        }

        const drawing = document.getElementById('drawing' + searchValue);

        // Ocultar todas las pestañas y el contenedor de pestañas
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.style.display = 'none');
        tabsContainer.style.display = 'none';

        // Mostrar el botón de "Atrás"
        backButton.style.display = 'inline-block';

        // Limpiar el resultado de búsqueda previo
        searchResult.innerHTML = '';
        searchResult.style.display = 'block';

        if (drawing) {
            const resultImage = drawing.querySelector('img').cloneNode(true);

            // Crear un contenedor para la imagen y detalles
            const container = document.createElement('div');
            container.style.textAlign = 'center';

            const title = document.createElement('h3');
            title.textContent = drawing.querySelector('.description').textContent;

            const caption = document.createElement('p');
            caption.textContent = resultImage.getAttribute('data-caption') || resultImage.alt;

            container.appendChild(resultImage);
            container.appendChild(title);
            container.appendChild(caption);

            searchResult.appendChild(container);

            // Actualizar la URL con el parámetro de búsqueda
            const params = new URLSearchParams(window.location.search);
            params.set('search', searchValue);
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        } else {
            searchResult.innerHTML = '<p>No se encontró ninguna imagen con ese número.</p>';
        }
    }

    // Función para restaurar las pestañas y ocultar el buscador
    function showAllImages() {
        // Mostrar el contenedor de pestañas
        tabsContainer.style.display = 'block';

        // Restaurar la pestaña activa previa
        openTab(null, lastActiveTabId);

        // Limpiar el resultado de búsqueda
        searchResult.innerHTML = '';
        searchResult.style.display = 'none';

        // Ocultar el botón "Atrás"
        backButton.style.display = 'none';

        // Quitar el parámetro de búsqueda de la URL
        const params = new URLSearchParams(window.location.search);
        params.delete('search');
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    // Guardar la última pestaña activa al cambiar de pestaña
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            lastActiveTabId = this.getAttribute('data-tab'); // Guarda el ID de la pestaña activa
        });
    });

    // Eventos de búsqueda y botón "Atrás"
    searchBtn.addEventListener('click', () => searchImage());
    backButton.addEventListener('click', showAllImages);

    // Inicializar EmailJS
    emailjs.init('9yiqsvuAnizhVfAhL');

    // Manejo del formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const serviceID = 'service_yf53x05';
        const templateID = 'template_whns0eq';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => alert('¡Mensaje enviado!'))
            .catch(error => alert('Error al enviar el mensaje: ' + JSON.stringify(error)));
    });
});
