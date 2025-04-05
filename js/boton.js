import { productoCard } from "./app.js";

// EVENTO CLICK EN LOS BOTONES
function actualizarBoton(button, producto) {

    // PRODUCTO SELECCIONADO 
    const imgProducto = producto.querySelector('.img__producto')

    // CAMBIOS DEL BOTON E IMAGEN
    imgProducto.classList.add('producto--activo')
    button.classList.add('acciones')
    button.innerHTML = `
        <div class="acciones">
            <button class="icons btn-decrement">
                <img src="/assets/images/icon-decrement-quantity.svg" alt="Restar">
            </button>
            <p class="number">1</p>
            <button class="icons btn-increment">
                <img src="/assets/images/icon-increment-quantity.svg" alt="Sumar">
            </button>
        </div>
    `;
}

function decrementarButton(producto) {

    const number = producto.querySelector('.number');
    if(!number) return console.error('No se encuentra .number');

    let cantidad = parseInt(number.textContent)

    if( cantidad > 1){
        number.textContent = cantidad - 1;
    } else {
        const btn = producto.querySelector('.btn');
        const imgProducto = producto.querySelector('.img__producto');

        if(btn){
            btn.classList.remove('acciones');
            btn.innerHTML = `
                <img src="./assets/images/icon-add-to-cart.svg" alt="icon add to cart" class="icon__cart">
                Add to cart
            `;
        }

        if(imgProducto){
            imgProducto.classList.remove('producto--activo')
        }
    }
}

function incrementarButton(producto) {

    const number = producto.querySelector('.number');
    if(!number) return console.error('No se encuentra .number');

    let cantidad = parseInt(number.textContent);

    number.textContent = cantidad + 1;
}

function botonCarrito() {

    productoCard.addEventListener('click', (e) => {

        const incrementBtn = e.target.closest('.btn-increment');
        const decrementBtn = e.target.closest('.btn-decrement');
        const button = e.target.closest('.btn')

        if (incrementBtn) {
            const producto = incrementBtn.closest('.product__item');
            incrementarButton(producto);
            return;
        }

        if (decrementBtn) {
            const producto = decrementBtn.closest('.product__item');
            decrementarButton(producto);
            return;
        }

        if (button) {
            const producto = button.closest('.product__item');
            const { name, price } = producto.dataset;

             // Actualizar el contenido del botón
            actualizarBoton(button, producto);
            console.log(`Has añadido el producto ${name} con un costo de $${price}`)
        }
    })
}

export default botonCarrito