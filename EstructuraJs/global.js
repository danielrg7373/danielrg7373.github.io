/* Generado por ChatGPT y posteriormente editado */

// Botones de navegación__________________________________________________________________________________________Botones de navegación

const logo = document.querySelector(".identificadorempresa img");
const buttonSobreNosotros = document.querySelector(".nosotros");
const buttonContacto = document.querySelector(".contacto");
const buttonCatalogo = document.querySelector(".catalogo");
const calefaccion = document.querySelector(".articuloexample");
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

if (calefaccion) {
    calefaccion.addEventListener("click", () => {
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
    const columnaArticulo = document.querySelector(".columnaarticulo .articulos");
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
// Filtros
const rangoMaxInput = document.getElementById("rango-max");
const precioMaxTexto = document.getElementById("precio-max");
const aplicarFiltrosBtn = document.getElementById("aplicarFiltros");
const borrarFiltrosBtn = document.getElementById("borrarFiltros");

function aplicarFiltros() {
    const precioMax = parseFloat(rangoMaxInput.value);
    const marcaSeleccionada = document.querySelector('#marcaFiltroForm input[name="categoria"]:checked');
    const potenciaSeleccionada = document.querySelector('#potenciaFiltroForm input[name="categoria"]:checked');
    const articulos = document.querySelectorAll(".articulos li");
    
    articulos.forEach(articulo => {
        const precio = parseFloat(articulo.querySelector('.precio').textContent.replace('€', '').trim());
        const titulo = articulo.querySelector('h3').textContent.toUpperCase();
        const marcasDisponibles = ["VAILLANT", "COINTRA", "HERMANN", "BAXI"];
        const marca = marcasDisponibles.find(m => titulo.includes(m)) || "";
        const potenciaMatch = titulo.match(/(\d+kw)/i);
        const potencia = potenciaMatch ? potenciaMatch[1].toLowerCase() : null;
        let mostrar = true;
        if (precio > precioMax) mostrar = false;
        if (marcaSeleccionada && marca !== marcaSeleccionada.value) mostrar = false;
        if (potenciaSeleccionada && (!potencia || potencia !== potenciaSeleccionada.value)) mostrar = false;
        articulo.style.display = mostrar ? "block" : "none";
    });
    actualizarURL(precioMax, marcaSeleccionada, potenciaSeleccionada);
}

function actualizarURL(precioMax, marca, potencia) {
    const params = new URLSearchParams();
    if (precioMax) params.set("precioMax", precioMax);
    if (marca) params.set("marca", marca.value);
    if (potencia) params.set("potencia", potencia.value);
    history.pushState({}, "", "?" + params.toString());
}

function cargarFiltrosDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("precioMax")) {
        rangoMaxInput.value = params.get("precioMax");
        precioMaxTexto.value = params.get("precioMax");
    }
    if (params.has("marca")) {
        const marcaInput = document.querySelector(`#marcaFiltroForm input[value="${params.get("marca")}"]`);
        if (marcaInput) marcaInput.checked = true;
    }
    if (params.has("potencia")) {
        const potenciaInput = document.querySelector(`#potenciaFiltroForm input[value="${params.get("potencia")}"]`);
        if (potenciaInput) potenciaInput.checked = true;
    }
    aplicarFiltros();
}

if (rangoMaxInput && precioMaxTexto) {
    rangoMaxInput.addEventListener("input", (event) => {
        precioMaxTexto.value = event.target.value;
    });
}

if (aplicarFiltrosBtn) {
    aplicarFiltrosBtn.addEventListener("click", aplicarFiltros);
}

if (borrarFiltrosBtn) {
    borrarFiltrosBtn.addEventListener("click", () => {
        rangoMaxInput.value = rangoMaxInput.max;
        precioMaxTexto.value = rangoMaxInput.max;
        document.querySelectorAll('#marcaFiltroForm input[name="categoria"], #potenciaFiltroForm input[name="categoria"]').forEach(input => input.checked = false);
        history.pushState({}, "", window.location.pathname);
        document.querySelectorAll(".articulos li").forEach(articulo => articulo.style.display = "block");
    });
}

cargarFiltrosDesdeURL();
