const Api = '../data.json';

// OBTENER DATOS DEL MENU
export const obtenerMenu = async () => {
    try {
        const resultado = await fetch(Api);
        const menu = await resultado.json();
        return menu;
    } catch (error) {
        console.log(error);
    }
}


