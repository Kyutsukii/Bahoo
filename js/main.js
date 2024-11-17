(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Countdown Timer
    function countDownTimer() {	
        var endTime = new Date("31 December 2023 10:00:00 GMT+00:00");
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (days < "10") {
            days = "0" + days;
        }
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#cdt-days").html(days + "<span>-Days-</span>");
        $("#cdt-hours").html(hours + "<span>-Hours-</span>");
        $("#cdt-minutes").html(minutes + "<span>-Mins-</span>");
        $("#cdt-seconds").html(seconds + "<span>-Secs-</span>");

    }

    setInterval(function () {
        countDownTimer();
    }, 1000);

    // Array untuk menyimpan produk yang dipilih
let cart = [];

// Tambahkan ke keranjang
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        // Tambahkan produk ke array cart
        cart.push({ name: productName, price: parseInt(productPrice) });

        updateCartView(); // Perbarui tampilan keranjang
        showNotification(productName); // Tampilkan notifikasi
    });
});

// Fungsi untuk memperbarui tampilan keranjang
function updateCartView() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Kosongkan keranjang

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${item.name} - Rp. ${item.price.toLocaleString('id-ID')}
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Hapus</button>
        `;
        cartList.appendChild(listItem);
    });

    calculateTotalPrice(); // Perbarui total harga

    // Add event listener to remove button dynamically
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index); // Hapus item berdasarkan index
        });
    });
}

// Fungsi untuk menghitung total harga
function calculateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').innerText = totalPrice.toLocaleString('id-ID');
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1); // Hapus item dari array cart
    updateCartView(); // Perbarui tampilan keranjang
}

// Tampilkan notifikasi
function showNotification(productName) {
    const notification = document.getElementById('notification');
    notification.innerText = `${productName} telah ditambahkan ke keranjang!`;
    notification.style.display = 'block'; // Tampilkan notifikasi

    // Fade-out notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.opacity = '1';
        }, 500);
    }, 3000);
}

// Kirim ke WhatsApp
document.getElementById('send-to-whatsapp').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }

    // Format pesan untuk WhatsApp
    let message = "Halo, saya ingin memesan produk berikut:\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Rp. ${item.price.toLocaleString('id-ID')}\n`;
    });

    message += "\nTotal: Rp. " + cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('id-ID');
    message += "\n\nTerima kasih!";

    // Encode pesan ke format URL
    const whatsappMessage = encodeURIComponent(message);

    // Nomor WhatsApp tujuan
    const whatsappNumber = "6285158661238"; // Ganti dengan nomor WhatsApp Anda

    // Buka WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
});
    
})(jQuery);

