// Aquí puedes añadir código para hacer tu página interactiva
console.log("Bienvenido a tu colección de dibujos!");
// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener la imagen y el contenedor del modal
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Obtener todas las imágenes en la galería
var images = document.querySelectorAll('.gallery .drawing img');

// Añadir un evento de clic a cada imagen
images.forEach(function(image) {
    image.onclick = function() {
        modal.style.display = "block";
        setTimeout(function() { modal.classList.add("show"); }, 10); // Añadir clase "show" con retraso
        modalImg.src = this.src;
        captionText.innerHTML = this.nextElementSibling.innerHTML;
    }
});

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en <span> (x), cerrar el modal
span.onclick = function() { 
    modal.classList.remove("show");
    setTimeout(function() { modal.style.display = "none"; }, 500); // Espera que la transición termine
}


