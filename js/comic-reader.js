const comicPages = [
    'images/komik/halaman1.jpg',
    'images/komik/halaman2.jpg',
    'images/komik/halaman3.jpg',
    // Tambahkan lebih banyak halaman
];

let currentPage = 0;

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < comicPages.length - 1) {
        currentPage++;
        updatePage();
    }
});

function updatePage() {
    document.getElementById('comic-page').src = comicPages[currentPage];
    document.getElementById('page-indicator').textContent = 
        `Halaman ${currentPage + 1} dari ${comicPages.length}`;
}