function showFlightDetails(flightId) {
    // Redirect to a new URL (seat-map.html) with the flight ID as a query parameter
    window.location.href = `seat_map.html?id=${flightId}`;
}
