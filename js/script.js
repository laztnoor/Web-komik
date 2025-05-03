// Toggle Menu Mobile
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Smooth Scrolling untuk semua link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Tutup menu mobile jika terbuka
        if (document.querySelector('nav ul').classList.contains('active')) {
            document.querySelector('nav ul').classList.remove('active');
        }
    });
});

// Efek scroll untuk header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Tambahkan class scrolled ke header saat load jika sudah di-scroll
if (window.scrollY > 50) {
    document.querySelector('header').classList.add('scrolled');
}

// Fungsi Pencarian
document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const komikItems = document.querySelectorAll('.komik-item');
    
    komikItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Sistem Rating
const stars = document.querySelectorAll('.stars i');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        stars.forEach((s, idx) => {
            if (idx < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
        document.getElementById('rating-text').textContent = 
            `Anda memberi rating ${rating} bintang`;
        // Simpan ke localStorage
        localStorage.setItem('comic-rating', rating);
    });
});

// Sistem Komentar
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = this.querySelector('textarea').value;
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.textContent = commentText;
    document.getElementById('comments-list').prepend(commentDiv);
    this.reset();
    
    // Simpan komentar
    const comments = JSON.parse(localStorage.getItem('comic-comments') || '[]');
    comments.push(commentText);
    localStorage.setItem('comic-comments', JSON.stringify(comments));
});