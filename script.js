function showInvitation(event) {
    event.preventDefault();

    // Ambil elemen cover dan invitation
    let cover = document.getElementById("cover");
    let invitation = document.getElementById("invitation");

    // Fade-out cover
    cover.style.opacity = "0";
    setTimeout(() => {
        cover.style.display = "none";
    }, 80); // Setelah animasi selesai, baru sembunyikan

    // Fade-in invitation
    setTimeout(() => {
        invitation.style.display = "flex"; // Pastikan elemen tampil dulu
        setTimeout(() => {
            invitation.classList.add("show"); // Tambahkan animasi fade-in
        }, 50);
    }, 80);
}

document.addEventListener("DOMContentLoaded", function () {
    const scrollItems = document.querySelectorAll(".scroll-item");
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // Hanya jalankan sekali per elemen
          }
        });
      },
      { threshold: 0.2 }
    );
  
    scrollItems.forEach((item) => {
      observer.observe(item);
    });
  });

document.getElementById("rsvp-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah halaman refresh

    const form = event.target;
    const formData = new FormData(form);

    // Tampilkan loading screen
    document.getElementById("loading-screen").style.display = "flex";

    fetch("https://script.google.com/macros/s/AKfycbwBApzthuch9ku9pRWrpG5JhYSCtkgzLmmsvRRaWxLXDhgCxOlxAEaSvi9aw9L9g0j6/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Sembunyikan loading screen
        document.getElementById("loading-screen").style.display = "none";

        // Tampilkan pesan sukses atau error
        const messageElement = document.getElementById("response-message");
        messageElement.style.display = "block";

        if (data.result === "success") {
            messageElement.textContent = "✅ Kehadiran Anda telah dikonfirmasi!";
            messageElement.classList.add("success");
            messageElement.classList.remove("error");
        } else {
            messageElement.textContent = "❌ Gagal mengirim, coba lagi!";
            messageElement.classList.add("error");
            messageElement.classList.remove("success");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("loading-screen").style.display = "none"; // Sembunyikan loading jika gagal

        const messageElement = document.getElementById("response-message");
        messageElement.textContent = "❌ Terjadi kesalahan, coba lagi!";
        messageElement.classList.add("error");
        messageElement.classList.remove("success");
        messageElement.style.display = "block";
    });
});

document.addEventListener("click", function () {
  let audio = document.getElementById("bg-music");
  audio.play();
});
