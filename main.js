const listadoDeBebidas = [
    { id: 1, nombre: "Coca 2.25L", precio: 4500, imagen: "./img/Coca Cola 2.25.png" },
    { id: 2, nombre: "Fernet 1L", precio: 12000, imagen: "./img/Fernet.jfif" },
    { id: 3, nombre: "Campari 0.75L", precio: 8500, imagen: "./img/Campari.jpg" },
    { id: 4, nombre: "Cepita 1L", precio: 2500, imagen: "./img/Cepita.jpg" },
    { id: 5, nombre: "Gin 0.75L", precio: 10000, imagen: "./img/Gin.jpeg" },
    { id: 6, nombre: "Tónica", precio: 2500, imagen: "./img/Tonica 2.jpg" },
];

const cart = {
    selections: {}, // { id, nombre, precio, cantidad }
    totalPrice: function () {
        let suma = 0;
        for (let i = 0; i < listadoDeBebidas.length; i++) {
            var seleccion = this.selections[listadoDeBebidas[i].nombre];
            if (seleccion) {
                suma = suma + seleccion.precio * seleccion.cantidad;
            }
        }
        return suma;
    },
    actualizarCarrito: function () {
        // actualizo las cards de seleccion
        let listadoSeleccionesNode = document.getElementById("carrito-elementos");
        // borro todo
        listadoSeleccionesNode.innerHTML = "";

        for (let i = 0; i < listadoDeBebidas.length; i++) {
            var seleccion = this.selections[listadoDeBebidas[i].nombre];
            if (seleccion) {
                let tarjetaSeleccion = document.createElement("div");
                tarjetaSeleccion.classList.add("card", "mb-3");

                let rowTarjeta = document.createElement("div");
                rowTarjeta.classList.add("row", "g0");

                tarjetaSeleccion.append(rowTarjeta);

                let divImg = document.createElement("div");
                divImg.classList.add("col-4");

                rowTarjeta.append(divImg);

                let img = document.createElement("img");
                img.classList.add("img-fluid", "rounded-start");
                img.src = seleccion.imagen;

                divImg.append(img);

                let divOcho = document.createElement("div");
                divOcho.classList.add("col-8");

                rowTarjeta.append(divOcho);

                let divBody = document.createElement("div");
                divBody.classList.add("card-body");

                divOcho.append(divBody);

                let nombreDiv = document.createElement("h5");
                nombreDiv.classList.add("card-title");
                nombreDiv.innerHTML = seleccion.nombre + " x" + seleccion.cantidad;

                let divFooter = document.createElement("div");
                divFooter.classList.add("card-footer");

                tarjetaSeleccion.append(divFooter);

                let totalItem = document.createElement("small");
                totalItem.classList.add("text-body-secondary");
                totalItem.innerHTML = "Total: $" + seleccion.precio * seleccion.cantidad;

                divFooter.append(totalItem);

                let precioDiv = document.createElement("p");
                precioDiv.classList.add("card-text");
                precioDiv.innerHTML = "1 unidad: $" + seleccion.precio;

                divBody.append(nombreDiv, precioDiv);
                listadoSeleccionesNode.append(tarjetaSeleccion);
            }
        }

        // actualizo el precio total
        let carritoTotalNode = document.getElementById("carrito-total");
        carritoTotalNode.innerHTML = "Total: $" + this.totalPrice();
    },
    agregarProducto: function (producto) {
        if (this.selections[producto.nombre]) {
            this.selections[producto.nombre].cantidad = this.selections[producto.nombre].cantidad + 1;
        }
        else {
            this.selections[producto.nombre] = {
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1,
                imagen: producto.imagen
            };
        }
        this.actualizarCarrito();
        console.log(this.selections);
    }
};

function crearElementos() {
    let listadoProductosNode = document.getElementById("productos-simples");

    listadoDeBebidas.forEach(bebida => {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card", "col-4", "text-center", "g-2");

        let nombreDiv = document.createElement("h4");
        nombreDiv.innerHTML = bebida.nombre;

        let precioDiv = document.createElement("div");
        precioDiv.innerHTML = bebida.precio;

        let imagenImg = document.createElement("img");
        imagenImg.src = bebida.imagen;

        let buttonCart = document.createElement("button");
        buttonCart.classList.add("btn", "btn-secondary");
        buttonCart.innerHTML = "Agregar al carrito";
        buttonCart.onclick = () => {
            cart.agregarProducto(bebida);
        }

        tarjeta.append(nombreDiv, precioDiv, imagenImg, buttonCart);

        listadoProductosNode.append(tarjeta);
    });
}

function inicio() {
    crearElementos();
    cart.actualizarCarrito();
}

inicio();