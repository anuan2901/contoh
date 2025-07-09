document.addEventListener('DOMContentLoaded', () => {
    const introPage = document.getElementById('intro-page');
    const proposalPage = document.getElementById('proposal-page');
    const noButton = document.getElementById('no-button');
    const yesButton = document.getElementById('yes-button');
    const questionText = document.getElementById('question-text');

    // Fungsi untuk menampilkan halaman proposal dan menyembunyikan intro
    window.showProposalPage = () => {
        introPage.classList.add('hidden');
        setTimeout(() => { // Memberi sedikit jeda untuk transisi opacity
            introPage.style.display = 'none'; // Sembunyikan sepenuhnya setelah transisi
            proposalPage.classList.remove('hidden');
        }, 500); // Sesuaikan dengan durasi transisi CSS
    };

    if (noButton) {
        // Mencegah klik pada tombol 'Tidak'
        noButton.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah aksi default
            event.stopPropagation(); // Menghentikan penyebaran event
            alert("Eitss, tombol ini tidak bisa ditekan."); // Pesan pop-up
        });

        // Membuat tombol "Tidak" bergerak menjauh jika kursor mendekat
        noButton.addEventListener('mouseover', () => {
            if (noButton.classList.contains('disabled')) {
                const currentX = noButton.offsetLeft;
                const currentY = noButton.offsetTop;
                const parentWidth = noButton.parentElement.clientWidth;
                const parentHeight = noButton.parentElement.clientHeight;

                // Pastikan tombol tetap dalam batas kontainer
                let newX = Math.random() * (parentWidth - noButton.offsetWidth);
                let newY = Math.random() * (parentHeight - noButton.offsetHeight);

                // Hindari menumpuk dengan tombol 'yes'
                const yesRect = yesButton.getBoundingClientRect();
                const noRect = noButton.getBoundingClientRect();

                // Loop untuk mencari posisi yang tidak bertabrakan
                let attempts = 0;
                const maxAttempts = 50;
                while (
                    attempts < maxAttempts &&
                    (newX < yesRect.right && newX + noRect.width > yesRect.left &&
                     newY < yesRect.bottom && newY + noRect.height > yesRect.top)
                ) {
                    newX = Math.random() * (parentWidth - noButton.offsetWidth);
                    newY = Math.random() * (parentHeight - noButton.offsetHeight);
                    attempts++;
                }

                noButton.style.position = 'absolute';
                noButton.style.left = `${newX}px`;
                noButton.style.top = `${newY}px`;
                noButton.style.transition = 'all 0.3s ease-out';
            }
        });

        // Mengembalikan posisi tombol "Tidak" saat kursor menjauh
        noButton.addEventListener('mouseout', () => {
            if (noButton.classList.contains('disabled')) {
                noButton.style.position = 'static'; // Kembali ke posisi normal
                noButton.style.transform = 'none';
                noButton.style.transition = 'none'; // Matikan transisi untuk reset cepat
            }
        });
    }

    if (yesButton) {
        // Fungsi yang dijalankan saat tombol "Mau!" diklik
        yesButton.addEventListener('click', () => {
            questionText.textContent = "YESS! Terima kasih banyak, Cantiii!";
            yesButton.style.display = 'none'; // Sembunyikan tombol "Mau!"
            noButton.style.display = 'none'; // Sembunyikan tombol "Tidak"
            alert("Terima kasih sudah memilih 'Mau!'! Aku tau ko kamu bakal milih mau hahaha"); // Notifikasi
            // Anda bisa menambahkan animasi atau elemen baru di sini
        });
    }
});