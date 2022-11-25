const contenedor = document.querySelector(".items");

const contenedorCategorias = document.querySelector(".categorias");

const listaCategorias = document.querySelectorAll(".boton") ;

const botonVermas = document.querySelector(".boton-vermas");

const carro = document.querySelector(".carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocalStorage = (listaCompras) => {
  localStorage.setItem("carrito", JSON.stringify(listaCompras));
};
////////////////////render

const renderProducto = (producto) => {
    const {id, nombre, precio} = producto
    return `
    <div class="productoU">
        <img class="imagen-producto" src="./productos fotos/${id}.png" alt="">
        <div class="mid">
            <h4>${nombre}</h4>
            <h4>${precio}</h4>
        </div>
        <div class="bot">
            <button>Comprar</button>
        </div>
    </div>
    `
}
///////////// render de los todos los productos divividos 
const renderTodo = (index = 0 ) => {
    contenedor.innerHTML += controladorproductos.ProductosDivididos[index].map(renderProducto).join('');
}
//////////////// render por filtro 
const renderFiltrados = (categoria) => {
    const Lista = productosdata.filter(
    (item) => item.categoria === categoria
    );
    contenedor.innerHTML = Lista.map(renderProducto).join('');
};

//////////////// renderizador general 
const renderProductos = (index = 0, categoria = undefined) => {
    if (!categoria) {
        renderTodo(index);
        return;
        }
    renderFiltrados(categoria);
};

/////////////////// cambiador de filtro 
const Cambiarfiltro = (nuevaCategoria) => {
    const categorias = [...listaCategorias];
    categorias.forEach((datasetCategoria) => {
    if (datasetCategoria.dataset.categoria !== nuevaCategoria) {
    datasetCategoria.classList.remove("activo");
    return;
    }
    else {
    datasetCategoria.classList.add("activo");
    }
    });
};

//////////////////////// quitar ver mas si hay categoria
const quitarVerMas = (c) => {
    if (!c) {
        botonVermas.classList.remove("oculto");
        return;
        }
        botonVermas.classList.add("oculto");
};

///////////////  
const accionfiltro = (e) => {
    const categoriaseleccionada = e.target.dataset.categoria;
    Cambiarfiltro(categoriaseleccionada);
    quitarVerMas(categoriaseleccionada);
};
///////////////////////// aplicar filtros
const aplicarFiltro = (e) => {
    if (!e.target.classList.contains("boton")) return;
    accionfiltro(e);
    if (!e.target.dataset.categoria) {
      contenedor.innerHTML = "";
      renderProductos();
    } else {
      renderProductos(0, e.target.dataset.categoria);
      controladorproductos.SiguientesProductos = 1;
    }
};

const isLastIndexOF = () =>
controladorproductos.SiguientesProductos === controladorproductos.LimiteProductos;

const mostrarmas = () => {
  renderProductos(controladorproductos.SiguientesProductos);
  controladorproductos.SiguientesProductos = controladorproductos.SiguientesProductos + 1
  if (isLastIndexOF()) {
    botonVermas.classList.add("oculto");
  }
};


const init = () => {
    renderProductos();
    contenedorCategorias.addEventListener('click', aplicarFiltro)
    botonVermas.addEventListener('click', mostrarmas)
}

init();


alert('trabajo incompleto, estoy teniendo problemas con mi pc asi que estoy algo retrasado con todo, espero poder entregar algo mejor la proxima semana si se me da la oportunidad')