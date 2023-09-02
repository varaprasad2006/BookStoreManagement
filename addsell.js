// Define an array to store the selected billing items
let billingItems = [];

// Variables to store customer details
let customerName;
let phoneNumber;

// Event listener for the "Continue to Billing" button
document.getElementById("continueToBillingButton").addEventListener("click", function () {
    // Retrieve customer name and phone number
    customerName = document.getElementById("customerName").value;
    phoneNumber = document.getElementById("phoneNumber").value;

    // Display customer name and phone number on the right side
    const billingInfo = document.querySelector(".col-md-6"); // Replace with the appropriate selector
    billingInfo.innerHTML = `
        <h6>Billing Information</h6>
        <p>Customer Name: ${customerName}</p>
        <p>Phone Number: ${phoneNumber}</p>
    `;

    // Populate the "Select Book Item" dropdown with books from local storage
    populateBookDropdown();
});

// Function to populate the "Select Book Item" dropdown
function populateBookDropdown() {
    const selectBookDropdown = document.getElementById("selectBook");

    // Clear existing options
    selectBookDropdown.innerHTML = "";

    // Retrieve book data from localStorage and add each book as an option
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        try {
            // Attempt to parse the value as a book object
            const book = JSON.parse(value);
            
            if (book && book.bookname) {
                const option = document.createElement("option");
                option.value = key;
                option.text = book.bookname;
                selectBookDropdown.appendChild(option);
            }
        } catch (error) {
            console.error(`Error parsing book with key ${key}: ${error.message}`);
        }
    }
}

// Rest of your code for adding billing items, updating the table, and saving sales data...

// Event listener for the "Add" button
document.getElementById("addBillingItem").addEventListener("click", function () {
    const selectBookDropdown = document.getElementById("selectBook");
    const selectedBookKey = selectBookDropdown.value;
    const selectedQuantity = parseInt(document.getElementById("quantity").value);

    // Retrieve the selected book from local storage
    const selectedBook = JSON.parse(localStorage.getItem(selectedBookKey));

    // Calculate the cost
    const cost = selectedBook.price * selectedQuantity;

    // Create a billing item object
    const billingItem = {
        barcode: selectedBook.barcode,
        bookname: selectedBook.bookname,
        price: selectedBook.price,
        quantity: selectedQuantity,
        cost: cost,
    };

    // Add the billing item to the array
    billingItems.push(billingItem);

    // Clear the quantity input
    document.getElementById("quantity").value = "1";

    // Update the table with billing items
    updateBillingTable();
});

// Function to update the billing table
function updateBillingTable() {
    const billingTableBody = document.getElementById("billingTableBody");

    // Clear existing rows
    billingTableBody.innerHTML = "";

    // Add rows for each billing item
    billingItems.forEach((billingItem, index) => {
        const row = billingTableBody.insertRow();
        row.insertCell(0).innerHTML = billingItem.barcode;
        row.insertCell(1).innerHTML = billingItem.bookname;
        row.insertCell(2).innerHTML = billingItem.price;
        row.insertCell(3).innerHTML = billingItem.quantity;
        row.insertCell(4).innerHTML = billingItem.cost;

        // Create a delete button for each row
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", function () {
            // Remove the billing item from the array
            billingItems.splice(index, 1);
            // Update the table
            updateBillingTable();
        });
        row.insertCell(5).appendChild(deleteButton);
    });

    // Calculate and display the total amount
    const totalAmount = billingItems.reduce((total, item) => total + item.cost, 0);
    const totalAmountDiv = document.getElementById("totalAmount");
    totalAmountDiv.innerHTML = `<strong>Total Amount:</strong> ${totalAmount}`;
}

// Event listener for the "Save and Print" button
document.getElementById("saveAndPrintButton").addEventListener("click", function () {
    // Create an object to store the sales data for this customer
    const salesData = {
        customerName: customerName,
        phoneNumber: phoneNumber,
        items: billingItems, // Billing items array
        totalAmount: calculateTotalAmount(), // Function to calculate total amount
    };

    // Generate a unique key for this sales data
    const salesDataKey = `salesData_${new Date().getTime()}`;

    // Save the sales data to local storage with the unique key
    localStorage.setItem(salesDataKey, JSON.stringify(salesData));

    // Open the print.html page in a new window/tab, passing the salesDataKey as a URL parameter
    window.open(`print.html?salesDataKey=${salesDataKey}`);

    // Optionally, clear the billing items and reset the form
    billingItems = [];
    updateBillingTable();
    document.getElementById("customerName").value = "";
    document.getElementById("phoneNumber").value = "";

    // Refresh the current page (addsell.html)
    window.location.href = "addsell.html";
});

// Function to calculate total amount
function calculateTotalAmount() {
    return billingItems.reduce((total, item) => total + item.cost, 0);
}
