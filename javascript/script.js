
// CARRITO DE COMPRAS
let carrito = [];

// AGREGAR PRODUCTO
function agregarProducto(nombre, precio) {
    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    actualizarCarrito();
    alert(nombre + " agregado al carrito.");
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const contador = document.getElementById("contador");
    const totalHTML = document.getElementById("total");
    // Evitar errores si algún elemento no existe
    if (!lista || !contador || !totalHTML) {
        return;
    }
    lista.innerHTML = "";
    // Carrito vacío
    if (carrito.length === 0) {
        lista.innerHTML = `
            <p class="text-center text-muted">
                El carrito está vacío.
            </p>
        `;
        contador.textContent = "0";
        totalHTML.textContent = "0.00";
        return;
    }
    let total = 0;
    let cantidadProductos = 0;
    carrito.forEach((producto, indice) => {
        const subtotal =
            producto.precio * producto.cantidad;
        total += subtotal;
        cantidadProductos += producto.cantidad;
        lista.innerHTML += `
            <div class="item-carrito">
                <div>
                    <h6>
                        ${producto.nombre}
                    </h6>
                    <small>
                        $${producto.precio.toFixed(2)}
                        x ${producto.cantidad}
                    </small>
                </div>
                <div class="d-flex align-items-center">
                    <strong class="me-2">
                        $${subtotal.toFixed(2)}
                    </strong>
                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        onclick="eliminarProducto(${indice})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    contador.textContent = cantidadProductos;
    totalHTML.textContent = total.toFixed(2);
}

// ELIMINAR PRODUCTO
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}
// CALCULAR TOTAL
function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}

// IR AL FORMULARIO DE PEDIDO
function irAlPedido() {
    // Verificar carrito
    if (carrito.length === 0) {
        alert(
            "Primero debes agregar productos al carrito."
        );
        return;
    }
    const carritoModal =
        document.getElementById("carritoModal");
    // Cerrar modal
    if (carritoModal) {
        const modal =
            bootstrap.Modal.getOrCreateInstance(
                carritoModal
            );
        modal.hide();
    }

    // Buscar sección pedido
    const seccionPedido =
        document.getElementById("pedido");
    if (seccionPedido) {
        seccionPedido.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// CUANDO CARGA LA PÁGINA
document.addEventListener(
    "DOMContentLoaded",
    function () {
        actualizarCarrito();
        // FORMULARIO DE PEDIDO
        const formularioPedido =
            document.getElementById(
                "formularioPedido"
            );
        if (formularioPedido) {
            formularioPedido.addEventListener(
                "submit",
                function (event) {
                    event.preventDefault();
                    const nombre =
                        document
                            .getElementById(
                                "nombrePedido"
                            )
                            .value
                            .trim();
                    const telefono =
                        document
                            .getElementById(
                                "telefono"
                            )
                            .value
                            .trim();
                    const direccion =
                        document
                            .getElementById(
                                "direccion"
                            )
                            .value
                            .trim();
                    const pago =
                        document
                            .getElementById(
                                "pago"
                            )
                            .value;
                    // Validar campos
                    if (
                        nombre === "" ||
                        telefono === "" ||
                        direccion === "" ||
                        pago === ""
                    ) {
                        alert(
                            "Por favor complete todos los campos obligatorios."
                        );
                        return;
                    }
                    // Validar carrito
                    if (carrito.length === 0) {
                        alert(
                            "Debe agregar al menos un producto al carrito."
                        );
                        return;
                    }
                    // Calcular total
                    const total =
                        calcularTotal();
                    const totalConfirmacion =
                        document.getElementById(
                            "totalConfirmacion"
                        );
                    if (totalConfirmacion) {

                        totalConfirmacion.textContent =
                            total.toFixed(2);

                    }
                    // Mostrar confirmación
                    const confirmacionModal =
                        document.getElementById(
                            "confirmacionModal"
                        );
                    if (confirmacionModal) {
                        const modal =
                            bootstrap.Modal.getOrCreateInstance(
                                confirmacionModal
                            );
                        modal.show();
                    }
                    // Vaciar carrito
                    carrito = [];
                    actualizarCarrito();
                    // Limpiar formulario
                    formularioPedido.reset();
                }
            );
        }
        // FORMULARIO DE CONTACTO
        const formularioContacto =
            document.getElementById(
                "formContacto"
            );
        if (formularioContacto) {
            formularioContacto.addEventListener(
                "submit",
                function (event) {
                    event.preventDefault();
                    alert(
                        "Mensaje enviado correctamente."
                    );
                    formularioContacto.reset();
                }
            );
        }
    }
);