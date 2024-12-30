(() => {
    // Variable para almacenar la última pestaña activa
    let lastActiveTabId = 'pestaña1'; // Predeterminado a la pestaña 1

    // Función para manejar las pestañas
    function openTab(event, tabId) {
        const tabContents = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tab-button');

        // Ocultar todas las pestañas y quitar la clase "active"
        tabContents.forEach(content => (content.style.display = 'none'));
        tabButtons.forEach(button => button.classList.remove('active'));

        // Mostrar la pestaña seleccionada
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) selectedTab.style.display = 'block';

        // Marcar el botón seleccionado como "active"
        if (event && event.currentTarget) event.currentTarget.classList.add('active');

        // Actualizar la URL con la pestaña activa
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tabId);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

        // Guardar la pestaña activa
        lastActiveTabId = tabId;
    }

    // Hacer que openTab sea accesible globalmente
    window.openTab = openTab;

    document.addEventListener('DOMContentLoaded', function () {
        console.log("Bienvenido a tu colección de dibujos!");

        // Elementos principales
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");
        const span = document.querySelector(".close");
        const images = document.querySelectorAll('.gallery .drawing img');
        const tabsContainer = document.querySelector('.tabs-container');
        const searchInput = document.getElementById('searchInput');
        const searchResult = document.getElementById('searchResult');
        const backButton = document.getElementById('backButton');
        const searchBtn = document.getElementById('searchBtn');

        // Restaurar estado inicial desde la URL
        const params = new URLSearchParams(window.location.search);
        const activeTab = params.get('tab') || 'pestaña1';
        const searchValue = params.get('search');

        // Establecer la pestaña activa inicial
        lastActiveTabId = activeTab;
        openTab(null, activeTab);

        if (searchValue) {
            searchInput.value = searchValue;
            searchImage(searchValue);
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
        
        // Función para buscar imágenes
        function searchImage(searchValue = null) {
            searchValue = searchValue || searchInput.value.trim();

            // Obtener la pestaña visible antes de ocultarla
            const activeTabElement = document.querySelector('.tab-content[style="display: block;"]');
            if (activeTabElement) {
                lastActiveTabId = activeTabElement.id; // Guardamos el ID de la pestaña visible
                console.log(`Pestaña activa antes de la búsqueda: ${lastActiveTabId}`);
            }

            // Ocultar todas las pestañas y el contenedor
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => (content.style.display = 'none'));
            tabsContainer.style.display = 'none';

            // Mostrar el contenedor de resultados
            searchResult.style.display = 'block';
            searchResult.innerHTML = '';
            backButton.style.display = 'inline-block';

            // Buscar la imagen deseada
            const drawing = document.getElementById('drawing' + searchValue);
            if (drawing) {
                const resultImage = drawing.querySelector('img').cloneNode(true);

                // Crear contenedor para el resultado
                const container = document.createElement('div');
                container.style.textAlign = 'center';

                const title = document.createElement('h3');
                title.textContent = drawing.querySelector('.description').textContent;

                const caption = document.createElement('p');
                caption.textContent = resultImage.getAttribute('data-caption') || resultImage.alt;

                container.append(resultImage, title, caption);
                searchResult.appendChild(container);

                // Actualizar la URL con el parámetro de búsqueda
                const params = new URLSearchParams(window.location.search);
                params.set('search', searchValue);
                params.delete('tab'); // Removemos el tab temporalmente durante la búsqueda
                window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
            } else {
                searchResult.innerHTML = '<p>No se encontró ninguna imagen con ese número.</p>';
            }
        }

        // Restaurar pestañas al salir de la búsqueda
        function showAllImages() {
            // Mostrar el contenedor de pestañas
            tabsContainer.style.display = 'block';

            // Restaurar la última pestaña activa antes de la búsqueda
            if (lastActiveTabId) {
                openTab(null, lastActiveTabId);
                console.log(`Restaurando la pestaña activa a: ${lastActiveTabId}`);
            } else {
                openTab(null, 'pestaña1'); // Valor predeterminado
            }

            searchResult.style.display = 'none';
            searchResult.innerHTML = '';
            backButton.style.display = 'none';

            // Quitar parámetro "search" de la URL
            const params = new URLSearchParams(window.location.search);
            params.delete('search');
            params.set('tab', lastActiveTabId);
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }

        // Asignar eventos a botones
        searchBtn.addEventListener('click', () => searchImage());
        backButton.addEventListener('click', showAllImages);

        // Guardar la última pestaña activa al cambiar de pestaña
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                lastActiveTabId = this.getAttribute('data-tab'); // Guardar el ID de la pestaña activa
            });
        });
        emailjs.init('9yiqsvuAnizhVfAhL'); // Reemplaza 'YOUR_USER_ID' con tu User ID de EmailJS

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const serviceID = 'service_yf53x05';
        const templateID = 'template_whns0eq';

        emailjs.sendForm(serviceID, templateID, this)
            .then(function() {
                alert('¡Mensaje enviado!. ¡Muchas Gracias, Saludos!');
            }, function(error) {
                alert('Error al enviar el mensaje: ' + JSON.stringify(error));
            });
    });
    });
    
})();
// Función para regresar al inicio de la página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave
    });
}
