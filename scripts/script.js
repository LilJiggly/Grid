document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    const prevBtn = document.getElementsByClassName('prev')[0];
    const nextBtn = document.getElementsByClassName('next')[0];
    const counter = document.getElementById('counter');
    const imageIndex = document.getElementById('imageIndex');
    const totalImagesSpan = document.getElementById('totalImages');

    const images = [];
    const totalImages = 500; // Adjust this to the maximum number of images you have

    for (let i = 1; i <= totalImages; i++) {
        const imgSrc = `images/image${i}.webp`;
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            images.push(imgSrc);
            appendImage(imgSrc);
            updateTotalImages();
        };
    }

    let currentIndex = 0;

    function appendImage(src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = src;
        img.addEventListener('click', () => {
            currentIndex = images.indexOf(src);
            showModal(currentIndex);
        });
        gallery.appendChild(img);
    }

    function showModal(index) {
        modal.style.display = 'flex';
        modalImage.src = images[index];
        updateCounter(index);
    }

    function updateCounter(index) {
        imageIndex.value = index + 1;
        totalImagesSpan.textContent = ` / ${images.length}`;
    }

    function updateTotalImages() {
        totalImagesSpan.textContent = ` / ${images.length}`;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showModal(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        showModal(currentIndex);
    }

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    window.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                showPrev();
            } else if (event.key === 'ArrowRight') {
                showNext();
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });

    imageIndex.addEventListener('change', (event) => {
        const index = parseInt(event.target.value, 10) - 1;
        if (index >= 0 && index < images.length) {
            currentIndex = index;
            showModal(currentIndex);
        }
    });
});
