document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fly-in, .fade-in');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top <= windowHeight * 0.75) {
                element.classList.add('visible');
            }
        });
    }

    document.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check
    checkVisibility();
});



// Tombol konfirmasi
document.getElementById("confirmBtn").addEventListener("click", function() {
    alert("Order confirmed!");
    // Lakukan lebih banyak tindakan sesuai kebutuhan (misalnya, mengirim data pemesanan ke server)
    document.getElementById("DetailOrder").style.display = "none";
});

// Tombol batal
document.getElementById("cancelBtn").addEventListener("click", function() {
    document.getElementById("DetailOrder").style.display = "none";
});

// Function to calculate total
function calculateTotal(quantity, price) {
    // Konversi quantity ke bilangan bulat untuk menghindari masalah perhitungan
    quantity = parseInt(quantity);

    // Pastikan quantity dan price adalah angka yang valid
    if (isNaN(quantity) || isNaN(price)) {
        console.error("Invalid quantity or price");
        return 0;
    }

    // Hitung total
    return quantity * price;
}


// Fungsi untuk format rupiah
function formatRupiah(angka, prefix) {
    var numberString = angka.toString().replace(/[^,\d]/g, '');
    var split = numberString.split(',');
    var sisa = split[0].length % 3;
    var rupiah = split[0].substr(0, sisa);
    var ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? 'Rp ' + rupiah : '';
}

// Sample food data
const foodData = [
    { name: "Burger", price: 500000 },
    { name: "Pasta", price: 200000 },
    { name: "Lasagna", price: 250000 },
    { name: "Drink Choco", price: 150000 },
    { name: "Pizza", price: 300000 },
    { name: "Hot Dog", price: 50000 },
    { name: "Juice", price: 100000 },
    { name: "Biryani", price: 600000 },
    { name: "Chocolate", price: 700000 },
    { name: "Ice Cream", price: 750000 },
    { name: "Pancake", price: 100000 },
    { name: "Sandwich", price: 200000 },
    // Add more food items as needed
];

// Function to populate food selection dropdown
function populateFoodOptions() {
        const foodSelection = document.getElementById("foodSelection");

        foodData.forEach((food) => {
            const option = document.createElement("option");
            option.value = food.price;
            option.text = `${food.name} - Rp ${food.price}`;
            foodSelection.add(option);
        });
 }
 window.addEventListener("load", function() {
    populateFoodOptions();
});
// Function to update food details based on selection// Objek untuk menyimpan detail makanan terpilih
var selectedFoodDetails = {};

// Function to update food details based on selection
function updateFoodDetails() {
    var foodSelection = document.getElementById("foodSelection");
    var selectedOption = foodSelection.options[foodSelection.selectedIndex];

    // Menyimpan detail makanan terpilih
    selectedFoodDetails.name = selectedOption.text.split(' - ')[0];
    selectedFoodDetails.price = parseFloat(selectedOption.value);

    // Anda dapat menggunakan selectedFoodDetails.name dan selectedFoodDetails.price dalam logika Anda selanjutnya
    console.log("Selected Food Name:", selectedFoodDetails.name);
    console.log("Selected Food Price:", selectedFoodDetails.price);

    // Jika Anda ingin menampilkan nama makanan terpilih, Anda dapat memperbarui elemen HTML
    var selectedFoodNameElement = document.getElementById("selectedFoodName");
    if (selectedFoodNameElement) {
        selectedFoodNameElement.innerText = selectedFoodDetails.name;
    }
}

document.getElementById("orderBtn").addEventListener("click", function() {
    // Get form values
    var name = document.querySelector('.input:nth-child(1) input').value;
    var email = document.querySelector('.input:nth-child(2) input').value;
    var number = document.querySelector('.input:nth-child(3) input').value;
    var quantity = document.querySelector('.input:nth-child(4) input').value;
    var address = document.querySelector('.input:nth-child(6) input').value;

    // Ambil harga langsung dari nilai dropdown
    var foodPrice = selectedFoodDetails.price;

    // Calculate total
    var total = calculateTotal(quantity, foodPrice);

    

    // Create order details HTML
    var orderDetailsHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number:</strong> ${number}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Food Name:</strong> <span id="selectedFoodName">${selectedFoodDetails.name}</span></p>
        <p><strong>Price:</strong> ${formatRupiah(foodPrice, "Rp ")}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Total:</strong> ${formatRupiah(total, "Rp ")}</p>
    `;

    // Display order details
    document.querySelector('.order-details').innerHTML = orderDetailsHTML;
    document.getElementById("DetailOrder").style.display = "block";
});

                document.addEventListener('DOMContentLoaded', function () {
                    const searchButton = document.querySelector('.search-btn');
                    const searchInput = document.querySelector('.search-txt');
            
                    searchButton.addEventListener('click', function (event) {
                        event.preventDefault(); 

                        const query = searchInput.value.trim();
            if (query !== '') {
                console.log('Melakukan pencarian untuk: ' + query);
            } else {
                console.log('Kotak pencarian kosong.');
            }
        });
    });
// Ambil elemen-elemen yang diperlukan dari DOM
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-txt');
const menuCards = document.querySelectorAll('.menu_card');

// Tambahkan event listener untuk tombol pencarian

searchBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah aksi default dari tombol submit

    const searchTerm = searchInput.value.toLowerCase(); // Ambil input pencarian dan konversi menjadi huruf kecil

    menuCards.forEach(card => {
        const cardTitle = card.querySelector('h2').innerText.toLowerCase(); // Ambil judul menu dan konversi menjadi huruf kecil

        // Cek apakah judul menu mengandung kata kunci pencarian
        if (cardTitle.includes(searchTerm)) {
            card.style.display = 'block'; // Tampilkan card menu jika cocok dengan pencarian
        } else {
            card.style.display = 'none'; // Sembunyikan card menu jika tidak cocok dengan pencarian
        }
    });
});

// Data makanan
var foodOptions = [
    "Food Option 1",
    "Food Option 2",
    "Food Option 3"
];

// Fungsi untuk memperbarui pilihan makanan dalam dropdown
function updateFoodDetails() {
    var select = document.getElementById("foodSelection");
    select.innerHTML = '<option value="">Select food...</option>'; // Reset pilihan

    foodOptions.forEach(function (food) {
        var option = document.createElement("option");
        option.text = food;
        option.value = food;
        select.appendChild(option);
    });
}
// Fungsi untuk memperbarui detail pesanan
function updateFoodDetails() {
    var selectedFood = document.getElementById("foodSelection").value;
    var selectedFoodName = document.getElementById("selectedFoodName");

    if (selectedFood !== "") {
        selectedFoodName.textContent = "Selected Food: " + selectedFood;
    } else {
        selectedFoodName.textContent = ""; // Hapus teks jika tidak ada makanan yang dipilih
    }
}
// Tangani pengiriman formulir
document.getElementById("orderBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah pengiriman formulir ke action yang ditentukan

    // Dapatkan nilai dari formulir
    var formData = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        number: document.querySelector("input[name='number']").value,
        quantity: document.querySelector("input[name='quantity']").value,
        food: document.querySelector("select[name='food']").value,
        address: document.querySelector("input[name='address']").value
    };

    // Lakukan validasi formulir di sini (opsional)

    // Kirim data formulir ke server (di sini bisa menggunakan metode seperti AJAX atau fetch)

    // Contoh tampilan detail pesanan setelah pengiriman formulir
    document.getElementById("Order").style.display = "none"; // Sembunyikan bagian Order
    document.getElementById("DetailOrder").style.display = "block"; // Tampilkan bagian Detail Order
});
function showOrderDetails() {
    // Mendapatkan nilai input dari formulir
    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var number = document.querySelector('input[name="number"]').value;
    var quantity = document.querySelector('input[name="quantity"]').value;
    var foodSelection = document.querySelector('select[name="food"]');
    var selectedFood = foodSelection.options[foodSelection.selectedIndex];
    var food =  selectedFood.text;
    var foodPrice = selectedFood.dataset.price; // Mendapatkan harga makanan dari atribut data-price
    var address = document.querySelector('input[name="address"]').value;

    // Menyusun detail pesanan
    var orderDetails = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Number: ${number}</p>
            <p>Quantity: ${quantity}</p>
            <p>Food: ${food} </p> 
            <p>Address: ${address}</p>
        `;

    // Menampilkan detail pesanan pada bagian order-details di halaman
    document.querySelector('.order-details').innerHTML = orderDetails;

    // Menampilkan detail pesanan pada bagian selectedFoodName di halaman
    document.getElementById('selectedFoodName').innerText = "Selected Food: " + food;

    // Menampilkan bagian detail-order
    document.getElementById('DetailOrder').style.display = 'block';
}

// Menambahkan event listener ke tombol Order Now
document.getElementById('orderBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Menghentikan aksi default dari tombol

    // Panggil fungsi untuk menampilkan detail pesanan
    showOrderDetails();
});

// Fungsi untuk menyembunyikan bagian detail-order pada event klik Cancel
document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('DetailOrder').style.display = 'none';
});

// Fungsi untuk mengeksekusi order saat klik tombol Confirm (bolehkan atau simpan ke server)
document.getElementById('confirmBtn').addEventListener('click', function() {
    // Tambahkan logika disini untuk menindaklanjuti pesanan, bisa simpan ke server atau tampilkan pesan konfirmasi
    alert('Order confirmed!');
    document.getElementById('DetailOrder').style.display = 'none'; // Sembunyikan bagian detail-order setelah konfirmasi
});

