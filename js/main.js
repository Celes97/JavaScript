//index
// Inicialización de variables
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;
let productos = [];

// Cargar productos desde el JSON
fetch('data/productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        productos = data;
        mostrarProductos();
        actualizarCarrito();
    })
    .catch(error => console.error('Error al cargar los productos:', error));

    function mostrarProductos() {
    const contenedorProductos = document.getElementById("productos");
    
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.classList.add("producto-imagen");

        const nombre = document.createElement("p");
        nombre.textContent = `${producto.nombre} - $${producto.precio}`;

        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar al carrito";
        botonAgregar.onclick = () => agregarAlCarrito(producto.id);

        divProducto.appendChild(imagen);
        divProducto.appendChild(nombre);
        divProducto.appendChild(botonAgregar);

        contenedorProductos.appendChild(divProducto);
    });
}


// Agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(prod => prod.id === idProducto);
    if (producto) {
        const productoEnCarrito = carrito.find(prod => prod.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }
        total += producto.precio;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
        actualizarCarrito();
        mostrarPopup(producto);
    }
}

// Función para mostrar el popup con la información del producto
function mostrarPopup(producto) {
    const popup = document.getElementById('popup-agregado');
    const productoImg = document.getElementById('producto-img');
    const productoNombre = document.getElementById('producto-nombre');
    const productoPrecio = document.getElementById('producto-precio');
    const botonIrCarrito = document.getElementById('ir-al-carrito');
    const closeButton = document.getElementById('popup-close');

    productoImg.src = producto.imagen;
    productoNombre.textContent = producto.nombre;
    productoPrecio.textContent = `$${producto.precio.toFixed(2)}`;

    popup.style.display = 'flex';

    botonIrCarrito.onclick = function() {
        mostrarVentanaEmergente(); 
        popup.style.display = 'none';
    };

    closeButton.onclick = function() {
        popup.style.display = 'none';
    };
    document.getElementById('ir-al-carrito').addEventListener('click', function() {
        mostrarVentanaEmergente();
    });
    
    
}


window.onload = function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; 

    if (carrito.length === 0 || carrito.some(item => item.precio <= 0 || !item.id)) {
        localStorage.removeItem('carrito'); 
        carrito = []; 
    }

if (carrito.length === 0) {
    const productosCarrito = document.getElementById('productos-carrito');
    const totalCarritoPopup = document.getElementById('total-carrito-popup');
    
    while (productosCarrito.firstChild) {
        productosCarrito.removeChild(productosCarrito.firstChild);
    }

const spanTotal = document.createElement('span');
spanTotal.textContent = 'Total: $0.00';

while (totalCarritoPopup.firstChild) {
    totalCarritoPopup.removeChild(totalCarritoPopup.firstChild);
}

totalCarritoPopup.appendChild(spanTotal);


    const ventanaEmergente = document.getElementById('ventana-emergente');
    ventanaEmergente.style.display = 'none'; 
}
};

// Función para mostrar la ventana emergente del carrito
function mostrarVentanaEmergente() {
    const ventanaEmergente = document.getElementById('ventana-emergente');
    const productosCarrito = document.getElementById('productos-carrito');
    const totalCarritoPopup = document.getElementById('total-carrito-popup');
    const metodoEnvioSelect = document.getElementById('metodo-envio');
    const codigoPostalContainer = document.getElementById('codigo-postal-container');
    const calcularEnvioButton = document.getElementById('calcular-envio');
    const costoEnvio = document.getElementById('costo-envio');
    const closeButton = document.getElementById('carrito-popup-close'); 
    const iniciarCompraButton = document.getElementById('iniciar-compra');

    let total = 0; 
    let costoEnvioValue = 0;

while (productosCarrito.firstChild) {
    productosCarrito.removeChild(productosCarrito.firstChild);
}

while (totalCarritoPopup.firstChild) {
    totalCarritoPopup.removeChild(totalCarritoPopup.firstChild);
}


carrito.forEach(item => {
    const productoCarrito = document.createElement('div');
    productoCarrito.classList.add('producto-carrito');

    const imagenProducto = document.createElement('img');
    imagenProducto.src = item.imagen;
    imagenProducto.alt = item.nombre;
    imagenProducto.classList.add('producto-img');

    const spanNombrePrecio = document.createElement('span');
    spanNombrePrecio.textContent = `${item.nombre} - $${item.precio}`;

    const cantidadBoton = document.createElement('span');
    cantidadBoton.classList.add('cantidad-boton');
    cantidadBoton.dataset.id = item.id;

    const botonDecrementar = document.createElement('button');
    botonDecrementar.classList.add('decrementar', 'boton-cantidad');
    botonDecrementar.textContent = '-';
    botonDecrementar.onclick = () => modificarCantidad(item.id, -1); 

    const cantidad = document.createElement('span');
    cantidad.classList.add('cantidad');
    cantidad.textContent = item.cantidad;

    const botonIncrementar = document.createElement('button');
    botonIncrementar.classList.add('incrementar', 'boton-cantidad');
    botonIncrementar.textContent = '+';
    botonIncrementar.onclick = () => modificarCantidad(item.id, 1); 

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('eliminar', 'boton-eliminar');
    botonEliminar.textContent = 'Borrar';
    botonEliminar.onclick = () => eliminarDelCarrito(item.id); 

    cantidadBoton.appendChild(botonDecrementar);
    cantidadBoton.appendChild(cantidad);
    cantidadBoton.appendChild(botonIncrementar);

    productoCarrito.appendChild(imagenProducto);
    productoCarrito.appendChild(spanNombrePrecio);
    productoCarrito.appendChild(cantidadBoton);
    productoCarrito.appendChild(botonEliminar);

    productosCarrito.appendChild(productoCarrito);

    total += item.precio * item.cantidad;  
});


while (totalCarritoPopup.firstChild) {
    totalCarritoPopup.removeChild(totalCarritoPopup.firstChild);
}

const spanTotal = document.createElement('span');
spanTotal.textContent = `Total: $${total.toFixed(2)}`;

totalCarritoPopup.appendChild(spanTotal);


if (metodoEnvioSelect.value === 'envio') {
    document.getElementById('costo-envio-item').style.display = 'block';
    document.getElementById('envio-value').textContent = costoEnvioValue;

    const divEnvioItem = document.createElement('div');
    divEnvioItem.id = 'envio-item';

    const spanEnvio = document.createElement('span');
    spanEnvio.textContent = `Envío: $${costoEnvioValue}`;

    divEnvioItem.appendChild(spanEnvio);

    totalCarritoPopup.appendChild(divEnvioItem);
}


    ventanaEmergente.style.display = 'block';

    function modificarCantidad(productId, cantidadCambio) {
        const producto = carrito.find(item => item.id === productId);
        if (producto) {
            producto.cantidad += cantidadCambio;
            if (producto.cantidad < 1) producto.cantidad = 1; 
        }
        mostrarVentanaEmergente();
    }

    function eliminarDelCarrito(productId) {
        carrito = carrito.filter(item => item.id !== productId);  
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        mostrarVentanaEmergente(); 
    }

    metodoEnvioSelect.onchange = function() {
        if (metodoEnvioSelect.value === 'envio') {
            codigoPostalContainer.style.display = 'block';
        } else {
            codigoPostalContainer.style.display = 'none';
            document.getElementById('costo-envio-item').style.display = 'none';  
        }
    };

    calcularEnvioButton.onclick = function() {
        const codigoPostal = document.getElementById('codigo-postal').value.trim();
        let costoEnvioValue = 0;

        if (codigoPostal >= 1000 && codigoPostal <= 1893) {
            costoEnvioValue = 6000;
        } else if (['1924', '2752', '2760', '2814', '2930', '2931', '2935', '2953'].includes(codigoPostal)) {
            costoEnvioValue = 8500;
        } else {
            costoEnvioValue = 9000;
        }

        costoEnvio.textContent = `Costo de Envío: $${costoEnvioValue}`;


    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    const metodoEnvioSelect = document.getElementById('metodo-envio');

const totalCarritoPopup = document.getElementById('total-carrito-popup');
if (totalCarritoPopup) {
    while (totalCarritoPopup.firstChild) {
        totalCarritoPopup.removeChild(totalCarritoPopup.firstChild);
    }

    if (metodoEnvioSelect.value === 'envio') {
        const divSubtotal = document.createElement('div');
        divSubtotal.id = 'subtotal-item';
        const spanSubtotal = document.createElement('span');
        spanSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        divSubtotal.appendChild(spanSubtotal);
        totalCarritoPopup.appendChild(divSubtotal);

        const divEnvio = document.createElement('div');
        divEnvio.id = 'costo-envio-item';
        const spanEnvio = document.createElement('span');
        spanEnvio.textContent = `Envío: $${costoEnvioValue}`;
        divEnvio.appendChild(spanEnvio);
        totalCarritoPopup.appendChild(divEnvio);

        const divTotal = document.createElement('div');
        divTotal.id = 'total-item';
        const spanTotal = document.createElement('span');
        spanTotal.textContent = `Total: $${(subtotal + costoEnvioValue).toFixed(2)}`;
        divTotal.appendChild(spanTotal);
        totalCarritoPopup.appendChild(divTotal);
    } else {
        const divSubtotal = document.createElement('div');
        divSubtotal.id = 'subtotal-item';
        const spanSubtotal = document.createElement('span');
        spanSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        divSubtotal.appendChild(spanSubtotal);
        totalCarritoPopup.appendChild(divSubtotal);

        const divTotal = document.createElement('div');
        divTotal.id = 'total-item';
        const spanTotal = document.createElement('span');
        spanTotal.textContent = `Total: $${subtotal.toFixed(2)}`;
        divTotal.appendChild(spanTotal);
        totalCarritoPopup.appendChild(divTotal);

        if (costoEnvioItem) {
            costoEnvioItem.style.display = 'none';
        }
    }
}

metodoEnvioSelect.onchange = function() {
    const codigoPostalContainer = document.getElementById('codigo-postal-container');
    const costoEnvioItem = document.getElementById('costo-envio-item');
    
    if (metodoEnvioSelect.value === 'envio') {
        codigoPostalContainer.style.display = 'block';
    } else {
        codigoPostalContainer.style.display = 'none';
        if (costoEnvioItem) {
            costoEnvioItem.style.display = 'none';
        }
    }
};

        document.getElementById('envio-item').style.display = 'none';
    };

    closeButton.onclick = function() {
        ventanaEmergente.style.display = 'none'; 
    };

    iniciarCompraButton.onclick = function() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total.toFixed(2));
        
            window.location.href = 'pages/resumen.html';
    };
}

document.addEventListener("DOMContentLoaded", function() {
    mostrarVentanaEmergente(); 
});

function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito");
    const totalCarritoValue = document.getElementById("total-carrito-value");

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "El carrito está vacío.";
        contenedorCarrito.appendChild(mensajeVacio);
        totalCarritoValue.textContent = '0';
    } else {
        const listaCarrito = document.createElement("ul");
        carrito.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nombre} - $${item.precio}`;

            const botonRestar = document.createElement("button");
            botonRestar.textContent = "-";
            botonRestar.classList.add("cantidad-btn");
            botonRestar.onclick = () => modificarCantidad(item.id, -1);

            const cantidad = document.createElement("span");
            cantidad.textContent = item.cantidad;

            const botonSumar = document.createElement("button");
            botonSumar.textContent = "+";
            botonSumar.classList.add("cantidad-btn");
            botonSumar.onclick = () => modificarCantidad(item.id, 1);

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("eliminar-btn");

            const iconoEliminar = document.createElement("i");
            iconoEliminar.classList.add("fas", "fa-trash-alt");
            botonEliminar.appendChild(iconoEliminar);
            botonEliminar.onclick = () => eliminarDelCarrito(item.id);

            li.appendChild(botonRestar);
            li.appendChild(cantidad);
            li.appendChild(botonSumar);
            li.appendChild(botonEliminar);

            listaCarrito.appendChild(li);
        });

        contenedorCarrito.appendChild(listaCarrito);

        totalCarritoValue.textContent = total.toFixed(2);
    }
}

function confirmarCompra() {
    localStorage.setItem('totalCompra', total);
    
    if (carrito.length === 0) {
        Swal.fire({ icon: "error", title: "No hay productos en el carrito para comprar" });
    } else {
        Swal.fire({
            title: "¿Deseas comprar estos productos?",
            text: `El total es de $${total}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('carrito', JSON.stringify(carrito));
                localStorage.setItem('total', total);
                

                const costoEnvioValue = parseFloat(localStorage.getItem('costoEnvio')) || 0;
                localStorage.setItem('costoEnvio', costoEnvioValue);
                
                carrito = [];
                total = 0;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                localStorage.setItem('total', total);
                
                window.location.href = "pages/resumen.html";
            } else {
                Swal.fire("Compra cancelada.");
                carrito = [];
                total = 0;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                localStorage.setItem('total', total);
                actualizarCarrito();
            }
        });
    }
}


if (window.location.pathname.includes('index.html')) {
    mostrarProductos();
    const comprarButton = document.getElementById('comprarButton');
    if (comprarButton) {
        comprarButton.addEventListener('click', confirmarCompra);
    }
}


// Página resumen
//formulario y envío 
function actualizarResumenCarrito() {
    if (window.location.pathname.includes('resumen.html')) {
        const productosResumen = document.getElementById('productos-resumen');
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const total = parseFloat(localStorage.getItem('total')) || 0; 
        const costoEnvio = parseFloat(localStorage.getItem('costoEnvio')) || 0; 

        if (productosResumen) {
            while (productosResumen.firstChild) {
                productosResumen.removeChild(productosResumen.firstChild);
            }

            carrito.forEach(producto => {
                let item = document.createElement('div');
                item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
                productosResumen.appendChild(item);
            });
        }

        const totalCarritoValue = document.getElementById('total-carrito-value');
        if (totalCarritoValue) {
            totalCarritoValue.textContent = `$${total.toFixed(2)}`;
        }

        const envioResumen = document.getElementById('envio-resumen');
        if (costoEnvio > 0) {
            envioResumen.style.display = 'block';
            const envioCostoElement = document.getElementById('envio-costo');
            if (envioCostoElement) {
                envioCostoElement.textContent = `$${costoEnvio.toFixed(2)}`;
            }
        }

        const totalConEnvio = total + costoEnvio;
        const totalResumenValue = document.getElementById('total-resumen-value');
        if (totalResumenValue) {
            totalResumenValue.textContent = `$${totalConEnvio.toFixed(2)}`;
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    actualizarResumenCarrito();
});

function calcularEnvio() {
    const codigoPostal = document.getElementById('codigo-postal').value.trim();
    let costoEnvioValue = 0;

    if (codigoPostal >= 1000 && codigoPostal <= 1893) {
        costoEnvioValue = 6000;
    } else if (['1924', '2752', '2760', '2814', '2930', '2931', '2935', '2953'].includes(codigoPostal)) {
        costoEnvioValue = 8500;
    } else {
        costoEnvioValue = 9000;
    }

    const envioCostoSpan = document.getElementById('envio-costo');
    envioCostoSpan.textContent = costoEnvioValue;

    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    document.getElementById('total-carrito-value').textContent = `$${subtotal.toFixed(2)}`;

    const totalConEnvio = subtotal + costoEnvioValue;

    document.getElementById('total-resumen-value').textContent = `$${totalConEnvio.toFixed(2)}`;

    document.getElementById('envio-resumen').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productosResumen = document.getElementById('productos-resumen');

    while (productosResumen.firstChild) {
        productosResumen.removeChild(productosResumen.firstChild);
    }

    carrito.forEach(producto => {
        let item = document.createElement('div');
        item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        productosResumen.appendChild(item);
    });

    let subtotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    const totalCarritoValue = document.getElementById('total-carrito-value');
    if (totalCarritoValue) {
        totalCarritoValue.textContent = `$${subtotal.toFixed(2)}`;
    }

    document.getElementById('calcular-envio-btn').addEventListener('click', calcularEnvio);
});


document.getElementById('envio').addEventListener('change', function () {
    const metodoEnvio = this.value;
    const envioCostoSpan = document.getElementById('envio-costo');
    const envioResumen = document.getElementById('envio-resumen');
    
    if (metodoEnvio === 'retiro') {
        envioCostoSpan.textContent = '0';
        envioResumen.style.display = 'none';  
        actualizarTotalSinEnvio();
    } else if (metodoEnvio === 'correo') {
        envioResumen.style.display = 'block';  
        calcularEnvio(); 
    }
});

function actualizarTotalSinEnvio() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });
    document.getElementById('total-resumen-value').textContent = `$${subtotal.toFixed(2)}`;
}


function mostrarCamposPago() {
    const pagoSeleccionado = document.getElementById('pago').value;

    document.getElementById('informacion-efectivo').style.display = 'none';
    document.getElementById('informacion-transferencia').style.display = 'none';
    document.getElementById('tarjeta-info').style.display = 'none';
    
    if (pagoSeleccionado === 'efectivo') {
        Swal.fire({
            title: 'Pago en Efectivo',
            text: 'Acércate a abonar en nuestra tienda, de lunes a viernes de 9 a 17 hs.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else if (pagoSeleccionado === 'transferencia') {
        Swal.fire({
            title: 'Pago por Transferencia',
            html: 'CBU: 12345678901234567890<br>Alias: prueba.efectivo<br>Envíanos el comprobante al 1166283909',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else if (pagoSeleccionado === 'cuotas') {
        document.getElementById('tarjeta-info').style.display = 'block';
    }
}


document.getElementById('boton').addEventListener('click', function () {
    const resumenCompra = {
        productos: carrito,
        metodoEnvio: document.getElementById('envio').value,
        costoEnvio: document.getElementById('envio-costo').textContent,
        metodoPago: document.getElementById('pago').value,
        direccionEnvio: document.getElementById('direccion').value
    };

    localStorage.setItem('resumenCompra', JSON.stringify(resumenCompra));
});

function obtenerResumenCompra() {
    return JSON.parse(localStorage.getItem('resumenCompra'));
}

document.addEventListener('DOMContentLoaded', function () {
    const resumenCompra = obtenerResumenCompra();  

    if (resumenCompra) {
        const resumenProductos = document.getElementById('resumen-productos');
        const productosTitulo = document.createElement('h4');
        productosTitulo.textContent = 'Productos:';
        resumenProductos.appendChild(productosTitulo);

        resumenCompra.productos.forEach(producto => {
            const productoElemento = document.createElement('p');
            productoElemento.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
            resumenProductos.appendChild(productoElemento);
        });

        const resumenEnvio = document.getElementById('resumen-envio');
        if (resumenCompra.metodoEnvio === 'correo') {
            const envioTitulo = document.createElement('h4');
            envioTitulo.textContent = 'Envío:';
            resumenEnvio.appendChild(envioTitulo);

            const envioInfo = document.createElement('p');
            envioInfo.textContent = `Envío por correo. Costo: $${resumenCompra.costoEnvio}`;
            resumenEnvio.appendChild(envioInfo);
        } else if (resumenCompra.metodoEnvio === 'retiro') {
            const envioTitulo = document.createElement('h4');
            envioTitulo.textContent = 'Envío:';
            resumenEnvio.appendChild(envioTitulo);

            const envioInfo = document.createElement('p');
            envioInfo.textContent = 'Retiro en local (sin costo adicional).';
            resumenEnvio.appendChild(envioInfo);
        }

        const resumenPago = document.getElementById('resumen-pago');
        const pagoTitulo = document.createElement('h4');
        pagoTitulo.textContent = 'Medio de Pago:';
        resumenPago.appendChild(pagoTitulo);

        if (resumenCompra.metodoPago === 'efectivo') {
            const pagoInfo = document.createElement('p');
            pagoInfo.textContent = 'Pago en efectivo. Acércate a abonar de lunes a viernes de 9 a 17 hs.';
            resumenPago.appendChild(pagoInfo);
        } else if (resumenCompra.metodoPago === 'transferencia') {
            const pagoInfo = document.createElement('p');
            pagoInfo.textContent = 'Pago por transferencia. CBU: 12345678901234567890. Envíanos el comprobante al 1166283909.';
            resumenPago.appendChild(pagoInfo);
        } else if (resumenCompra.metodoPago === 'cuotas') {
            const pagoInfo = document.createElement('p');
            pagoInfo.textContent = 'Pago con tarjeta en 3 cuotas sin interés.';
            resumenPago.appendChild(pagoInfo);
        }
    } else {
        const mensajeError = document.createElement('h2');
        mensajeError.textContent = 'No se encontró información de la compra.';
        document.body.appendChild(mensajeError);
    }
});