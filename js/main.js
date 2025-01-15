// Inicialización de variables
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;
let productos = [];

// Cargar los productos desde el archivo JSON
fetch('data/productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        productos = data;
        mostrarProductos(); // Una vez cargados los productos, los mostramos
        actualizarCarrito(); // Actualizamos el carrito al inicio
    })
    .catch(error => console.error('Error al cargar los productos:', error));

// Función para mostrar los productos en la página
function mostrarProductos() {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de mostrar los productos

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");

        divProducto.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(prod => prod.id === idProducto);
    if (producto) {
        carrito.push(producto);
        total += producto.precio;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);

        actualizarCarrito();
    }
}

// Función para actualizar la visualización del carrito y total
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito");
    const totalElement = document.getElementById("total");

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        contenedorCarrito.innerHTML = "<ul>" + carrito.map(item => `<li>${item.nombre} - $${item.precio}</li>`).join('') + "</ul>";
    }

    totalElement.textContent = `Total a pagar: $${total}`;
}

// Función para confirmar la compra
function confirmarCompra() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito para comprar.");
    } else {
        const confirmacion = confirm(`¿Deseas comprar estos productos por un total de $${total}?`);
        if (confirmacion) {
            alert("¡Compra realizada con éxito!");
            carrito = [];
            total = 0;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            localStorage.setItem('total', total);
            actualizarCarrito();
        } else {
            alert("Compra cancelada.");
        }
    }
}

// Evento para manejar la confirmación de compra
document.getElementById('comprarButton').addEventListener('click', confirmarCompra);