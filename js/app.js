import { obtenerMenu } from "./Api.js";
import botonCarrito from "./boton.js";

export const productoCard = document.querySelector('.product__cards');

document.addEventListener('DOMContentLoaded', () =>{
    mostrarMenu();
    botonCarrito();
});

async function mostrarMenu() {

    try {
        const menus = await obtenerMenu();

        // VALIDACION DE LA API
        if(!Array.isArray(menus)){
            console.error('Los datos de la Api no son validos');
            return;
        }

        menus.forEach(menu => {
            const { image, name, category, price } = menu;

            const cardItem = document.createElement('div');
            cardItem.classList.add('product__item');
            cardItem.dataset.name = name;
            cardItem.dataset.price = price;
            cardItem.innerHTML = `
            <picture>
                <!-- Imagen para pantallas grandes (desktop) -->
                <source media="(min-width: 1024px)" srcset="${image.desktop}">
                <!-- Imagen para pantallas medianas (mobile) -->
                <source media="(min-width: 768px)" srcset="${image.tablet}">
                <!-- Imagen para pantallas pequeñas (mobile) -->
                <img src="${image.mobile}" alt="${name}" class="img__producto">
            </picture>
            <!-- BOTON CARRITO -->
            <div class="btn__producto">
                <div class="btn">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="icon add to cart" class="icon__cart">
                    Add to cart
                </div>
            </div>
            <div class="info__categoria">
                <p class="categoria__name">${category}</p>
                <p class="categoria__producto">${name}</p>
                <p class="categoria__precio">$${price.toFixed(2)}</p>
                </div>`;
            productoCard.appendChild(cardItem);
        });
    } catch (error) {
        console.log(error)
    }
}

