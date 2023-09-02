document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the sales data from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const salesDataKey = urlParams.get("salesDataKey");

    // Retrieve the sales data from local storage
    const salesData = JSON.parse(localStorage.getItem(salesDataKey));

    if (salesData) {
        // Display customer information
        const customerInfo = document.getElementById("customerInfo");
        customerInfo.innerHTML = `
            <p><strong>Customer Name:</strong> ${salesData.customerName}</p>
            <p><strong>Phone Number:</strong> ${salesData.phoneNumber}</p>
        `;

        // Display billing items
        const billingItemsTable = document.getElementById("billingItemsTable");
        salesData.items.forEach((item) => {
            const row = billingItemsTable.insertRow();
            row.insertCell(0).textContent = item.barcode;
            row.insertCell(1).textContent = item.bookname;
            row.insertCell(2).textContent = item.price;
            row.insertCell(3).textContent = item.quantity;
            row.insertCell(4).textContent = item.cost;
        });

        // Calculate and display the total amount
        const totalAmount = salesData.totalAmount;
        const totalAmountDiv = document.getElementById("totalAmount");
        totalAmountDiv.innerHTML = `<p><strong>Total Amount:</strong> ${totalAmount}</p>`;
    } else {
        // Sales data not found, display an error message
        const customerInfo = document.getElementById("customerInfo");
        customerInfo.innerHTML = `<p><strong>Error:</strong> Sales data not found.</p>`;
    }
});
