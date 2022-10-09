const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const formulario = document.querySelector(`#formulario`)
const inputPoke = document.querySelector(`#inputoPoke`)

const inputNombre = document.querySelector(`#inputNombre`)
const contenedorSaludo = document.querySelector(`#contenedorSaludo`)
const formularioLogueo = document.querySelector(`#formularioLogueo`)
const main = document.querySelector(`#main`)

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

//FUNCION PARA OCULTAR MSJ DE LOGUEO EN HEADER y EL MAIN CON EL BUSCADOR DE POKEMON
const funcioniNicio = ()=>{
contenedorSaludo.classList.toggle( `oculto`)
main.classList.toggle(`oculto`)
}
funcioniNicio()

/*FUNCION PARA OCULTAR IMPUT DE LOGUEO, MOSTRAR MSJ LOGUEO EN HEADER
Y MOSTRAR MAIN CON I NPUT BUCSADOR DE POKE*/
const ocultarYmostrar = () =>{
    inputNombre.classList.toggle(`oculto`)
    contenedorSaludo.classList.toggle(`aparecer`)
    main.classList.toggle(`aparecer`)
}

//FORMULARIO DE LOGUEO
formularioLogueo.onsubmit = (e)=>{
    e.preventDefault()
    contenedorSaludo.innerHTML =`<p> Bienvenid@ ${inputNombre.value}</p>`;
    ocultarYmostrar()
    
}


// FUNCION PARA ACCEDER AL FETCH DE LA API POKEMON
const searchPokemon = () => {
    formulario.onsubmit = (e) =>{
    e.preventDefault()

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputPoke.value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
    }
}
searchPokemon();


//funcion para crear RENEDERIZAR CARD
const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    
}

// FUNCION PARA DAR COLOR AL FONDO DE LA CARD DE LA IMG DEL POKEMON
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;// COLOR UNO DA CALOR AL FONDO Y COLOR DOS DA EFECTO DE LAS PELOTITAS DE FONDO 
    pokeImg.style.backgroundSize = ' 5px 5px';
}
// FUNCION PARA RENDERIZAR LOS TYPES DE ESTILO DE POKEMON( ALGUNOS POSEE UN TYPES Y OTROS DOS.)
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name; //DATA QUE NOS LLEGA YA DE LA API
        statElementAmount.textContent = stat.base_stat;//DATA QUE NOS LLEGA YA DE LA API
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}




