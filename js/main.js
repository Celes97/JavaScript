//prueba de carrito
const productos = [
    { id: 1, nombre: "buzo", precio: 10000 },
    { id: 2, nombre: "sweater", precio: 25000 },
    { id: 3, nombre: "remera", precio: 8000 }
];

    let carrito = [];
    let total = 0;

function mostrarProductos() {
    console.log("Productos disponibles:");
    productos.forEach(producto => {
    console.log(`${producto.id}. ${producto.nombre} - $${producto.precio}`);
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(prod => prod.id === idProducto);
    if (producto) {
    carrito.push(producto);
    total += producto.precio;
    console.log(`Se ha agregado al carrito: ${producto.nombre}`);
    } else {
    console.log("Producto no encontrado.");
    }
}

function verCarrito() {
    if (carrito.length === 0) {
    console.log("El carrito está vacío.");
    } else {
    console.log("Tu carrito contiene los siguientes productos:");
    carrito.forEach(item => {
        console.log(`${item.nombre} - $${item.precio}`);
    });
    console.log(`Total a pagar: $${total}`);
    }
}

function confirmarCompra() {
    if (carrito.length === 0) {
    alert("No hay productos en el carrito para comprar.");
    } else {
    const confirmacion = confirm(`¿Deseas comprar estos productos por un total de $${total}?`);
    if (confirmacion) {
        alert("¡Compra realizada con éxito!");
        carrito = []; // Vaciar el carrito después de la compra
        total = 0; // Resetear el total
    } else {
        alert("Compra cancelada.");
    }
    }
}

function iniciar() {
    let seguir = true;
    while (seguir) {
    let opcion = prompt("¿Qué deseas hacer?\n1. Ver productos\n2. Agregar producto al carrito\n3. Ver carrito\n4. Confirmar compra\n5. Salir");
    switch (opcion) {
        case "1":
            mostrarProductos();
        break;
        case "2":
    let idProducto = prompt("Ingresa el numero del producto que desea agregar:");
        agregarAlCarrito(parseInt(idProducto));
        break;
        case "3":
            verCarrito();
        break;
        case "4":
            confirmarCompra();
        break;
        case "5":
            alert("Gracias por visitar nuestra tienda. ¡Hasta pronto!");
        seguir = false;
        return;
        break;
        default:
        alert("Opción no válida. Por favor, elige una opción válida.");
        break;
}
    }
}

iniciar();
