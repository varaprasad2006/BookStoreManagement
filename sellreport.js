document.addEventListener("DOMContentLoaded", function () {
    // Retrieve sales data from local storage and populate the table
    populateCustomerTable();
});

function populateCustomerTable() {
    const customerTableBody = document.getElementById("customerTableBody");

    // Clear existing rows
    customerTableBody.innerHTML = "";

    // Loop through local storage to retrieve customer data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Check if the key represents sales data
        if (key.startsWith("salesData_")) {
            const salesData = JSON.parse(localStorage.getItem(key));
            
            // Create a row in the table
            const row = customerTableBody.insertRow();
            
            // Fill in customer details and total amount
            row.insertCell(0).textContent = salesData.customerName;
            row.insertCell(1).textContent = salesData.phoneNumber;
            row.insertCell(2).textContent = salesData.totalAmount;
        }
    }
}
