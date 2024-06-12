// Constants
const MOVIES = ["Volver al futuro", "Dia de la independencia", "John Wick"];
const DAYS = ["Jueves", "Viernes", "Sabado", "Domingo"];
const TIMES = ["18:00", "20:00", "22:30"];

const SOLD_OUT = [
    { movie: "Volver al futuro", day: "Sabado", time: "20:00" },
    { movie: "Volver al futuro", day: "Sabado", time: "22:30" },
    { movie: "Dia de la independencia", day: "Sabado", time: "20:00" },
    { movie: "John Wick", day: "Viernes", time: "22:30" },
    { movie: "John Wick", day: "Sabado", time: "18:00" },
    { movie: "John Wick", day: "Sabado", time: "20:00" },
    { movie: "John Wick", day: "Sabado", time: "22:30" },
    { movie: "John Wick", day: "Domingo", time: "22:30" }
];

// Functions
function welcomeMessage() {
    alert("Bienvenido a Cines JS!");
    alert("A continuacion te guiaremos por el proceso para comprar entradas.");
}

function getCustomerName() {
    let name = prompt("Por favor ingresa tu nombre:");
    if (name === null) {
        return null;
    }
    return name;
}

function selectMovie() {
    let selectedMovie = selectFromList("Por favor selecciona una pelicula:", MOVIES);
    if (selectedMovie === null) {
        return null;
    }
    let choiceIndex = parseInt(selectedMovie) - 1;
    return MOVIES[choiceIndex];
}

function selectDay() {
    let selectedDay = selectFromList("Por favor selecciona un dia:", DAYS);
    if (selectedDay === null) {
        return null;
    }
    let choiceIndex = parseInt(selectedDay) - 1;
    return DAYS[choiceIndex];
}

function selectTime() {
    let selectedTime = selectFromList("Por favor selecciona un horario:", TIMES);
    if (selectedTime === null) {
        return null;
    }
    let choiceIndex = parseInt(selectedTime) - 1;
    return TIMES[choiceIndex];
}

function selectNumberOfTickets() {
    let numTickets = prompt("Por favor ingresa la cantidad de entradas a comprar (maximo 4):");
    if (numTickets === null) {
        return null;
    }
    numTickets = parseInt(numTickets);
    while (numTickets < 1 || numTickets > 4) {
        numTickets = parseInt(prompt("Por favor ingresa la cantidad de entradas a comprar (maximo 4):"));
        if (numTickets === null) {
            return null;
        }
    }
    return numTickets;
}

function generateSeatingGrid() {
    let grid = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(Math.random() > 0.5 ? 'O' : ' ');
        }
        grid.push(row);
    }
    return grid;
}

function displaySeatingGrid(grid) {
    let display = "      PANTALLA       \n";
    display += "   | A | B | C | D | E \n";
    for (let i = 0; i < grid.length; i++) {
        display += (i + 1).toString() + ' ';
        display += "|";
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === ' ') {
                display += "   |";
            } else {
                display += " " + grid[i][j] + " |";
            }
        }
        display += "\n";
    }
    return display;
}

function selectSeat(grid, ticketNum) {
    let input = prompt(displaySeatingGrid(grid) + `\nSelecciona el asiento para la entrada ${ticketNum} (ej: '1A'):`);
    if (input === null) {
        return null;
    }
    let row = parseInt(input[0]) - 1;
    let col = input[1].toUpperCase().charCodeAt(0) - 65;
    while (grid[row][col] === 'O' || grid[row][col] === 'X') {
        alert("El asiento se encuentra ocupado. Por favor seleccione otro.");
        input = prompt(displaySeatingGrid(grid) + `Selecciona el asiento para la entrada ${ticketNum} (ej: '1A'):`);
        if (input === null) {
            return null;
        }
        row = parseInt(input[0]) - 1;
        col = input[1].toUpperCase().charCodeAt(0) - 65;
    }
    grid[row][col] = 'X';
    return { row: row + 1, col: String.fromCharCode(65 + col) };
}

function confirmTickets(customer, movie, day, time, tickets) {
    let ticketDetails = tickets.map(function(ticket, index) {
        return `Entrada ${index + 1}: Asiento ${ticket.row}${ticket.col}`;
    }).join('\n');
    return confirm(`Por favor confirme su compra:\n\nNombre: ${customer}\nPelicula: ${movie}\nDia: ${day}\nHorario: ${time}\n${ticketDetails}`);
}

function goodbyeMessage() {
    alert("Gracias por su compra. Disfrute de la pelicula!");
}

function selectFromList(message, array) {
    let list = '';
    for (let index = 0; index < array.length; index++) {
        list += `${index + 1}. ${array[index]}\n`;
    }
    if (list === '') {
        return null;
    }
    let choice = prompt(`${message}\n\n${list}`);
    if (choice === null) {
        return null;
    }
    let choiceIndex = parseInt(choice);
    if (isNaN(choiceIndex) || choiceIndex < 1 || choiceIndex > array.length) {
        alert("La opcion ingresada no es valida. Por favor ingrese una opcion de la lista.");
        return selectFromList(message, array);
    }
    return choice;
}

function isSoldOut(movie, day, time) {
    for (let i = 0; i < SOLD_OUT.length; i++) {
        if (SOLD_OUT[i].movie === movie && SOLD_OUT[i].day === day && SOLD_OUT[i].time === time) {
            return true;
        }
    }
    return false;
}

function cancelPurchase() {
    alert("Compra cancelada.");
}

// Main Process
function mainProcess() {

    welcomeMessage();

    let customerName = getCustomerName();
    if (customerName === null) {
        cancelPurchase();
        return;
    }
    
    let selectedMovie = selectMovie();
    if (selectedMovie === null) {
        cancelPurchase();
        return;
    }
    
    let selectedDay = selectDay();
    if (selectedDay === null) {
        cancelPurchase();
        return;
    }
    
    let selectedTime = selectTime();
    if (selectedTime === null) {
        cancelPurchase();
        return;
    }

    while (isSoldOut(selectedMovie, selectedDay, selectedTime)) {
        alert("La funcion seleccionada se encuentra agotada. Por favor seleccione otro dia / horario.");
        selectedDay = selectDay();
        if (selectedDay === null) {
            cancelPurchase();
            return;
        }
        selectedTime = selectTime();
        if (selectedTime === null) {
            cancelPurchase();
            return;
        }
    }
    
    let numberOfTickets = selectNumberOfTickets();
    if (numberOfTickets === null) {
        cancelPurchase();
        return;
    }
    
    let seatingGrid = generateSeatingGrid();
    let tickets = [];
    for (let i = 0; i < numberOfTickets; i++) {
        let seat = selectSeat(seatingGrid, i + 1);
        if (seat === null) {
            cancelPurchase();
            return;
        }
        tickets.push(seat);
    }
    
    if (confirmTickets(customerName, selectedMovie, selectedDay, selectedTime, tickets)) {
        goodbyeMessage();
    } else {
        cancelPurchase();
    }
}

// Start the process
mainProcess();
