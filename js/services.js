document.addEventListener("DOMContentLoaded", function() {
    var foodSelect = document.getElementById("food");
    var drinkSelect = document.getElementById("drink");
    var quantityInput = document.getElementById("quantity");
    var totalPriceSpan = document.getElementById("total-price-value");

    function calculateTotalPrice() {
        var foodPrice = parseFloat(foodSelect.value);
        var drinkPrice = parseFloat(drinkSelect.value);
        var quantity = parseInt(quantityInput.value);
        var totalCost = (foodPrice + drinkPrice) * quantity;
        totalPriceSpan.textContent = totalCost;
    }

    // Calculate total price when the page loads
    calculateTotalPrice();

    // Update total price whenever user changes food, drink, or quantity
    foodSelect.addEventListener("change", calculateTotalPrice);
    drinkSelect.addEventListener("change", calculateTotalPrice);
    quantityInput.addEventListener("input", calculateTotalPrice);
});


// Assuming selectedFood, selectedDrink, and quantity are variables containing selected food, drink, and quantity information
const queryParams = new URLSearchParams();
queryParams.set('food', selectedFood);
queryParams.set('drink', selectedDrink);
queryParams.set('quantity', quantity);
window.location.href = `summary.html?${queryParams.toString()}`;


    // Store selectedFood, selectedDrink, and quantity in session storage
    sessionStorage.setItem('selectedFood', selectedFood);
    sessionStorage.setItem('selectedDrink', selectedDrink);
    sessionStorage.setItem('quantity', quantity);

    // Redirect to summary page
    window.location.href = 'summary.html';

