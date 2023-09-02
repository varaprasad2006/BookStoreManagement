// bookstore.js

// Event listener for the "Submit" button in the Add Book form
document.getElementById("addBookForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve form values
    const barcode = document.getElementById("barcode").value;
    const stock = document.getElementById("stock").value;
    const bookname = document.getElementById("bookname").value;
    const booktype = document.getElementById("booktype").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    // Create a book object
    const book = {
        barcode,
        stock,
        bookname,
        booktype,
        price,
        description,
    };

    // Store book data in localStorage
    localStorage.setItem(barcode, JSON.stringify(book));

    // Reset the form
    document.getElementById("addBookForm").reset();
});

// Event listener for the "Show Books" button
document.getElementById("showBooksButton").addEventListener("click", function () {
    // Retrieve book data from localStorage
    const bookData = getAllBookData();

    // Clear existing table rows
    clearTable();

    // Display book data in the table
    displayBookData(bookData);
});



// Function to retrieve all book data from localStorage
function getAllBookData() {
    const bookData = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        try {
            // Attempt to parse the value as a book object
            const book = JSON.parse(value);
            if (typeof book === 'object' && book !== null) {
                // Check if the required properties exist
                if (book.barcode && book.stock && book.bookname && book.booktype && book.price && book.description) {
                    bookData.push(book);
                } else {
                    console.error(`Incomplete book data for key ${key}`);
                }
            }
        } catch (error) {
            // Handle any parsing errors
            console.error(`Error parsing book with key ${key}: ${error.message}`);
        }
    }
    return bookData;
}


// ...

// Function to clear existing table rows
function clearTable() {
    const tableBody = document.getElementById("bookTableBody");
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

// Function to display book data in the table
function displayBookData(bookData) {
    const tableBody = document.getElementById("bookTableBody");
    bookData.forEach((book) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerHTML = book.barcode;
        row.insertCell(1).innerHTML = book.stock;
        row.insertCell(2).innerHTML = book.bookname;
        row.insertCell(3).innerHTML = book.booktype;
        row.insertCell(4).innerHTML = book.price;
        row.insertCell(5).innerHTML = book.description;
    });
}
