/* Generado por ChatGPT y posteriormente editado */

// Botones de navegación__________________________________________________________________________________________Botones de navegación

const logo = document.querySelector(".identificadorempresa img");
const buttonSobreNosotros = document.querySelector(".nosotros");
const buttonContacto = document.querySelector(".contacto");
const buttonCatalogo = document.querySelector(".catálogo");
const Calefacción = document.querySelector(".artículoexample");
const volver = document.querySelector(".volver");

// Redirección a las páginas correspondientes___________________________________________________Redirección a las páginas correspondientes
if (logo) {
    logo.addEventListener("click", () => {
        window.location.href = "../EstructuraHtml/index.html";
    });
}

if (buttonSobreNosotros) {
    buttonSobreNosotros.addEventListener("click", () => {
        window.location.href = "../EstructuraHtml/sobrenosotros.html";
    });
}

if (buttonContacto) {
    buttonContacto.addEventListener("click", () => {
        window.location.href = "../EstructuraHtml/contacto.html";
    });
}

if (buttonCatalogo) {
    buttonCatalogo.addEventListener("click", () => {
        window.location.href = "../EstructuraHtml/catalogo.html";
    });
}

if (Calefacción) {
    Calefacción.addEventListener("click", () => {
        window.location.href = "../EstructuraHtml/articuloindi.html";
    });
}

if (volver) {
    volver.addEventListener("click", () => {
        window.location.href = "../EstructuraHtml/articulos.html";
    });
}

// Home_______________________________________________________________________________________________________________________________Home

// Sobre Nosotros___________________________________________________________________________________________________________Sobre Nosotros

// Contacto_______________________________________________________________________________________________________________________Contacto

// Catalogo_______________________________________________________________________________________________________________________Catalogo


document.addEventListener("DOMContentLoaded", function () {
    const primeraImagen = document.querySelector('.listacatalogo li img[alt="Calefacción y ACS"]');
    if (primeraImagen) {
        primeraImagen.addEventListener("click", function () {
            window.location.href = "../EstructuraHtml/articulos.html"; // Cambiar ruta si es necesario
        });
    }
});

// Articulos_____________________________________________________________________________________________________________________Articulos


// MOSTRAR MAS
document.addEventListener("DOMContentLoaded", function () {
    const mostrarMasBtn = document.querySelector(".mostrar-mas a");
    const columnaArticulo = document.querySelector(".columnaarticulo .artículos");
    const articulosOriginales = [...columnaArticulo.children]; // Clonamos los artículos originales

    mostrarMasBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Evitamos que el enlace recargue la página

        // Creamos un fragmento de documento para insertar los nuevos artículos
        const fragmento = document.createDocumentFragment();

        // Añadimos 20 nuevos artículos (5 filas de 4 artículos cada una)
        for (let i = 0; i < 20; i++) {
            const index = i % articulosOriginales.length; // Ciclar entre los artículos originales
            const nuevoArticulo = articulosOriginales[index].cloneNode(true); // Clonamos cada artículo
            fragmento.appendChild(nuevoArticulo); // Añadimos el artículo clonado al fragmento
        }

        // Añadimos el fragmento con los nuevos artículos al contenedor
        columnaArticulo.appendChild(fragmento);
    });
});

// Filtro precios__________________________________________________________________________________________________________Filtro precios

// Actualizar el precio máximo al deslizar el slider
document.getElementById('rango-max').addEventListener('input', (event) => {
    const precioMax = event.target.value;
    document.getElementById('precio-max').value = precioMax; // Actualizar el valor visible
});

document.getElementById('aplicarFiltros').addEventListener('click', () => {
    const precioMax = document.getElementById('rango-max').value;
    const marcaSeleccionada = document.querySelector('#marcaFiltroForm input[name="categoria"]:checked');
    const potenciaSeleccionada = document.querySelector('#potenciaFiltroForm input[name="categoria"]:checked');

    const articulos = document.querySelectorAll('.artículos li');

    articulos.forEach(articulo => {
        const precio = parseFloat(articulo.querySelector('.precio').textContent.replace('€', '').trim());
        
        // Extraer la marca desde el título del artículo (marca está explícitamente nombrada)
        const titulo = articulo.querySelector('h3').textContent.toUpperCase();
        const marcasDisponibles = ["VAILLANT", "COINTRA", "HERMANN", "BAXI"];
        const marca = marcasDisponibles.find(m => titulo.includes(m)) || '';

        // Extraer la potencia desde el título del artículo (por ejemplo "24kw")
        const potenciaMatch = titulo.match(/(\d+kw)/i);
        const potencia = potenciaMatch ? potenciaMatch[1].toLowerCase() : null;

        let mostrar = true;

        // Filtrar por precio
        if (precio > parseFloat(precioMax)) {
            mostrar = false;
        }

        // Filtrar por marca
        if (marcaSeleccionada && marca !== marcaSeleccionada.value) {
            mostrar = false;
        }

        // Filtrar por potencia
        if (potenciaSeleccionada && (!potencia || potencia !== potenciaSeleccionada.value)) {
            mostrar = false;
        }

        // Mostrar u ocultar el artículo
        articulo.style.display = mostrar ? 'block' : 'none';
    });
});


