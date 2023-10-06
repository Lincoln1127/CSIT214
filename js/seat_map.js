const rows = 5; // Number of rows (same as number of columns for a square grid)
const columns = 5; // Number of columns (same as number of rows for a square grid)

function generateSeatNumber(row, column) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rowLabel = alphabet[row];
    return `${rowLabel}${column + 1}`;
}

// Generate available seats based on rows and columns
const availableSeats = [];
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        const seatNumber = generateSeatNumber(row, column);
        availableSeats.push(seatNumber);
    }
}

const seatMap = document.getElementById("seatMap");

function createSeatElement(seatNumber) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.textContent = seatNumber;
    seat.addEventListener("click", () => selectSeat(seatNumber));
    return seat;
}

function selectSeat(seatNumber) {
    alert(`Seat ${seatNumber} selected!`);
    // You can perform any other action here based on the selected seat
    // For example, you can display a confirmation message, store the selected seat in a database, etc.
}

function populateSeatMap() {
    availableSeats.forEach(seatNumber => {
        const seat = createSeatElement(seatNumber);
        seatMap.appendChild(seat);
    });
}

// Populate seat map when the page loads
populateSeatMap();


let selectedSeats = []; // Array to store selected seats

function selectSeat(seatNumber) {
    // Check if the seat is already selected
    const index = selectedSeats.indexOf(seatNumber);
    if (index !== -1) {
        // If already selected, remove it from the array (deselect)
        selectedSeats.splice(index, 1);
    } else {
        // If not selected, add it to the array (select)
        selectedSeats.push(seatNumber);
    }

    // You can update the seat UI here to show selection/deselection visually

    // Construct URL with selected seat data and redirect to summary page
    const queryParams = new URLSearchParams();
    queryParams.set('selectedSeats', selectedSeats.join(','));

    // Redirect to summary page with selected seat data as query parameter
    window.location.href = `summary.html?${queryParams.toString()}`;
}


