// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");

        let jugadores = obtenerJugadoresLocalStorage();

        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        jugadores.push({ nombre, edad, posicion });
        guardarJugadoresLocalStorage(jugadores);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función para mostrar la pantalla principal
const mostrarPantallaPrincipal = () => {
    const body = document.body;
    body.innerHTML = `
        <h1>Gestor de equipo de fútbol</h1>
        <button onclick="agregarJugador()">Agregar jugador</button>
        <button onclick="listarJugadores()">Listar jugadores</button>
        <button onclick="asignarPosicion()">Asignar posición</button>
        <button onclick="realizarCambio()">Realizar cambio durante el partido</button>
    `;
};

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    try {
        let jugadores = obtenerJugadoresLocalStorage();
        const body = document.body;
        body.innerHTML = ''; // Limpiar el contenido anterior

        const lista = document.createElement('ul');
        jugadores.forEach(jugador => {
            const item = document.createElement('li');
            item.textContent = `${jugador.nombre} - Edad: ${jugador.edad} - Posición: ${jugador.posicion}`;
            lista.appendChild(item);
        });
        body.appendChild(lista);

        const botonRegresar = document.createElement('button');
        botonRegresar.textContent = 'Regresar';
        botonRegresar.onclick = mostrarPantallaPrincipal;
        body.appendChild(botonRegresar);

        alert('Lista de jugadores actualizada correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async () => {
    try {
        const nombre = prompt("Ingrese el nombre del jugador:");
        const nuevaPosicion = prompt("Ingrese la nueva posición del jugador:");

        let jugadores = obtenerJugadoresLocalStorage();
        const jugador = jugadores.find(jugador => jugador.nombre === nombre);

        if (!jugador) {
            throw new Error('Jugador no encontrado.');
        }

        jugador.posicion = nuevaPosicion;
        guardarJugadoresLocalStorage(jugadores);

        alert(`Posición de ${nombre} actualizada a ${nuevaPosicion} correctamente.`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async () => {
    try {
        const jugadorEntrante = prompt("Ingrese el nombre del jugador entrante:");
        const jugadorSaliente = prompt("Ingrese el nombre del jugador saliente:");

        let jugadores = obtenerJugadoresLocalStorage();
        const indiceEntrante = jugadores.findIndex(jugador => jugador.nombre === jugadorEntrante);
        const indiceSaliente = jugadores.findIndex(jugador => jugador.nombre === jugadorSaliente);

        if (indiceEntrante === -1 || indiceSaliente === -1) {
            throw new Error('Uno o ambos jugadores no están en el equipo.');
        }

        [jugadores[indiceEntrante], jugadores[indiceSaliente]] = [jugadores[indiceSaliente], jugadores[indiceEntrante]];
        guardarJugadoresLocalStorage(jugadores);

        alert(`Cambio realizado: ${jugadorSaliente} sale, ${jugadorEntrante} entra.`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
