// Data Komik (Bisa diganti dengan API atau database)
const comicsData = [
    {
        id: 1,
        title: "Petualangan di Dunia Ajaib",
        cover: "images/comic1.jpg",
        genre: ["fantasy", "adventure"],
        chapters: 24,
        rating: 4.8,
        description: "Ikuti petualangan Riko yang tersesat di dunia ajaib penuh makhluk misterius."
    },
    {
        id: 2,
        title: "Cinta di Kampus Biru",
        cover: "images/comic2.jpg",
        genre: ["romance", "drama"],
        chapters: 16,
        rating: 4.5,
        description: "Kisah cinta segitiga yang rumit antara tiga mahasiswa di kampus bergengsi."
    },
    {
        id: 3,
        title: "Pahlawan Bayangan",
        cover: "images/comic3.jpg",
        genre: ["action", "superhero"],
        chapters: 32,
        rating: 4.9,
        description: "Seorang pahlawan super yang bekerja di balik bayangan untuk melindungi kota."
    },
    {
        id: 4,
        title: "Dapur Cinta",
        cover: "images/comic4.jpg",
        genre: ["romance", "comedy"],
        chapters: 12,
        rating: 4.3,
        description: "Kisah cinta yang dimulai dari dapur restoran kecil di pinggiran kota."
    },
    {
        id: 5,
        title: "Negeri Mimpi",
        cover: "images/comic5.jpg",
        genre: ["fantasy", "adventure"],
        chapters: 18,
        rating: 4.7,
        description: "Perjalanan epik menuju negeri mimpi yang bisa mengubah kenyataan."
    },
    {
        id: 6,
        title: "Detektif SMA",
        cover: "images/comic6.jpg",
        genre: ["mystery", "comedy"],
        chapters: 20,
        rating: 4.4,
        description: "Seorang siswa SMA yang menyelesaikan kasus-kasus misterius di sekolahnya."
    },
    {
        id: 7,
        title: "Samurai Cyber",
        cover: "images/comic7.jpg",
        genre: ["action", "sci-fi"],
        chapters: 28,
        rating: 4.8,
        description: "Samurai dari masa lalu terbangun di dunia cyberpunk masa depan."
    },
    {
        id: 8,
        title: "Bunga di Antara Duri",
        cover: "images/comic8.jpg",
        genre: ["romance", "drama"],
        chapters: 14,
        rating: 4.6,
        description: "Kisah cinta yang penuh rintangan antara dua orang dari dunia yang berbeda."
    }
];

// Data Genre
const genresData = [
    { name: "Action", icon: "fa-fist-raised", count: 42 },
    { name: "Romance", icon: "fa-heart", count: 36 },
    { name: "Fantasy", icon: "fa-dragon", count: 28 },
    { name: "Comedy", icon: "fa-laugh-squint", count: 31 },
    { name: "Sci-Fi", icon: "fa-robot", count: 19 },
    { name: "Mystery", icon: "fa-search", count: 23 },
    { name: "Horror", icon: "fa-ghost", count: 17 },
    { name: "Drama", icon: "fa-theater-masks", count: 25 }
];

// DOM Elements
const comicsGrid = document.querySelector('.comics-grid');
const genresGrid = document.querySelector('.genres-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('load-more');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMobile = document.querySelector('.nav-mobile');
const modal = document.getElementById('comic-modal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.querySelector('.modal-body');

// Variabel State
let currentGenre = 'all';
let displayedComics = 4;

// Fungsi untuk menampilkan komik
function displayComics(comics) {
    comicsGrid.innerHTML = '';
    
    comics.slice(0, displayedComics).forEach(comic => {
        const comicCard = document.createElement('div');
        comicCard.className = 'comic-card';
        comicCard.innerHTML = `
            <img src="${comic.cover}" alt="${comic.title}" class="comic-cover">
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <div class="comic-meta">
                    <span>${comic.chapters} Ch</span>
                    <span>⭐ ${comic.rating}</span>
                </div>
            </div>
        `;
        
        // Tambahkan event listener untuk membuka modal
        comicCard.addEventListener('click', () => openComicModal(comic));
        
        comicsGrid.appendChild(comicCard);
    });
    
    // Sembunyikan tombol load more jika tidak ada komik lagi
    if (displayedComics >= comics.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Fungsi untuk menampilkan genre
function displayGenres() {
    genresGrid.innerHTML = '';
    
    genresData.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.innerHTML = `
            <i class="fas ${genre.icon}"></i>
            <h3>${genre.name}</h3>
            <p>${genre.count} Komik</p>
        `;
        
        genresGrid.appendChild(genreCard);
    });
}

// Fungsi untuk filter komik berdasarkan genre
function filterComics() {
    if (currentGenre === 'all') {
        return comicsData;
    } else {
        return comicsData.filter(comic => comic.genre.includes(currentGenre));
    }
}

// Fungsi untuk membuka modal komik
function openComicModal(comic) {
    modalBody.innerHTML = `
        <div class="modal-comic-cover">
            <img src="${comic.cover}" alt="${comic.title}">
        </div>
        <div class="modal-comic-info">
            <h2>${comic.title}</h2>
            <div class="modal-comic-meta">
                <span><strong>Genre:</strong> ${comic.genre.join(', ')}</span>
                <span><strong>Chapters:</strong> ${comic.chapters}</span>
                <span><strong>Rating:</strong> ⭐ ${comic.rating}/5</span>
            </div>
            <p class="modal-comic-desc">${comic.description}</p>
            <div class="modal-comic-actions">
                <button class="btn read-btn">Baca Sekarang</button>
                <button class="btn bookmark-btn">Bookmark</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup modal
function closeComicModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
// Filter komik berdasarkan genre
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hapus class active dari semua tombol
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Tambahkan class active ke tombol yang diklik
        btn.classList.add('active');
        
        // Update genre yang aktif
        currentGenre = btn.dataset.genre;
        displayedComics = 4;
        
        // Filter dan tampilkan komik
        const filteredComics = filterComics();
        displayComics(filteredComics);
    });
});

// Load more comics
loadMoreBtn.addEventListener('click', () => {
    displayedComics += 4;
    const filteredComics = filterComics();
    displayComics(filteredComics);
});

// Toggle menu mobile
mobileMenuBtn.addEventListener('click', () => {
    navMobile.classList.toggle('active');
});

// Tutup modal ketika klik di luar modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeComicModal();
    }
});

// Tutup modal ketika tombol close diklik
closeModal.addEventListener('click', closeComicModal);

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    displayComics(comicsData);
    displayGenres();
    
    // Smooth scroll untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Tutup menu mobile jika terbuka
                if (navMobile.classList.contains('active')) {
                    navMobile.classList.remove('active');
                }
            }
        });
    });
    
    // Tambahkan shadow ke header saat scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.header').style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            document.querySelector('.header').style.boxShadow = 'none';
        }
    });
});

// Tambahkan di bagian atas setelah deklarasi variabel
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Fungsi untuk mencari komik
function searchComics(query) {
    if (!query.trim()) {
        searchResults.style.display = 'none';
        return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const results = comicsData.filter(comic => 
        comic.title.toLowerCase().includes(lowerCaseQuery) ||
        comic.genre.some(g => g.toLowerCase().includes(lowerCaseQuery)) ||
        comic.description.toLowerCase().includes(lowerCaseQuery)
    );
    
    displaySearchResults(results);
}

// Fungsi untuk menampilkan hasil pencarian
function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Tidak ada komik yang ditemukan</div>';
    } else {
        results.forEach(comic => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <img src="${comic.cover}" alt="${comic.title}">
                <div class="search-result-info">
                    <h4>${comic.title}</h4>
                    <p>${comic.genre.join(', ')} • ${comic.chapters} Ch</p>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                openComicModal(comic);
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
            
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.style.display = 'block';
}

// Event Listeners untuk pencarian
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchComics(searchInput.value);
});

searchInput.addEventListener('input', () => {
    searchComics(searchInput.value);
});

// Tutup hasil pencarian ketika klik di luar
document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Tambahkan event listener untuk escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchResults.style.display = 'none';
    }
});

// Tambahkan di bagian variabel DOM Elements
const trendingScroll = document.querySelector('.trending-comics-scroll');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Fungsi untuk menampilkan komik trending
function displayTrendingComics() {
    // Ambil 10 komik pertama (atau bisa diacak/berdasarkan rating)
    const trendingComics = [...comicsData].sort((a, b) => b.rating - a.rating).slice(0, 10);
    
    trendingScroll.innerHTML = '';
    
    trendingComics.forEach(comic => {
        const comicCard = document.createElement('div');
        comicCard.className = 'trending-comic-card';
        comicCard.innerHTML = `
            <img src="${comic.cover}" alt="${comic.title}" class="trending-comic-cover">
            <div class="trending-comic-info">
                <h3 class="trending-comic-title">${comic.title}</h3>
                <div class="trending-comic-meta">
                    <span>${comic.chapters} Ch</span>
                    <span>⭐ ${comic.rating}</span>
                </div>
            </div>
        `;
        
        // Tambahkan event listener untuk membuka modal
        comicCard.addEventListener('click', () => openComicModal(comic));
        
        trendingScroll.appendChild(comicCard);
    });
}

// Fungsi untuk scroll horizontal
function scrollHorizontal(container, direction) {
    const scrollAmount = 300;
    container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
    });
}

// Event Listeners untuk scroll arrows
leftArrow.addEventListener('click', () => scrollHorizontal(trendingScroll, 'left'));
rightArrow.addEventListener('click', () => scrollHorizontal(trendingScroll, 'right'));

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    displayComics(comicsData);
    displayGenres();
    displayTrendingComics(); // Tambahkan ini
    
    // ... kode lainnya tetap sama
});

// Tambahkan di bagian variabel DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const moonIcon = themeToggleBtn.querySelector('.fa-moon');
const sunIcon = themeToggleBtn.querySelector('.fa-sun');

// Fungsi untuk toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Toggle icon
    moonIcon.style.display = document.body.classList.contains('dark-mode') ? 'none' : 'block';
    sunIcon.style.display = document.body.classList.contains('dark-mode') ? 'block' : 'none';
    
    // Simpan preferensi di localStorage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Event listener untuk theme toggle
themeToggleBtn.addEventListener('click', toggleDarkMode);

// Cek preferensi dark mode saat load
document.addEventListener('DOMContentLoaded', () => {
    // ... kode yang sudah ada
    
    // Cek preferensi dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    
    // ... kode lainnya
});