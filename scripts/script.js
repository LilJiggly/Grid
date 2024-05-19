document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("girl.html")) {
        const gallery = document.getElementById('gallery');
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        const closeBtn = document.getElementsByClassName('close')[0];
        const prevBtn = document.getElementsByClassName('prev')[0];
        const nextBtn = document.getElementsByClassName('next')[0];
        const counter = document.getElementById('counter');
        const imageIndex = document.getElementById('imageIndex');
        const totalImagesSpan = document.getElementById('totalImages');
        const leftArea = document.querySelector('.left-area');
        const rightArea = document.querySelector('.right-area');

        const images = [];
        const totalImages = 500; // Adjust this to the maximum number of images you have

        for (let i = 1; i <= totalImages; i++) {
            const imgSrcWebp = `images/image${i}.webp`;
            const imgSrcPng = `images/image${i}.png`;
            
            const img = new Image();
            img.src = imgSrcWebp;
            
            img.onload = () => {
                images.push(imgSrcWebp);
                appendImage(imgSrcWebp);
                updateTotalImages();
            };
            
            img.onerror = () => {
                img.src = imgSrcPng;
                
                img.onload = () => {
                    images.push(imgSrcPng);
                    appendImage(imgSrcPng);
                    updateTotalImages();
                };
                
                img.onerror = () => {
                    console.error(`Failed to load image: ${imgSrcWebp} and ${imgSrcPng}`);
                };
            };
        }

        let currentIndex = 0;

        function appendImage(src) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = src;

            const div = document.createElement('div');
            div.classList.add('grid-item');

            div.appendChild(img);

            img.addEventListener('click', () => {
                currentIndex = images.indexOf(src);
                showModal(currentIndex);
            });

            gallery.appendChild(div);
        }

        function showModal(index) {
            modal.style.display = 'flex';
            modalImage.src = images[index];
            updateCounter(index);
            document.body.classList.add('modal-open'); // Lock background scroll
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
            document.body.classList.remove('modal-open'); // Unlock background scroll
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

        leftArea.addEventListener('click', showPrev);
        rightArea.addEventListener('click', showNext);
    }

    // Detect touch device
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    if (isTouchDevice()) {
        // Add a class to the body if it's a touch device
        document.body.classList.add('touch-device');
    } else {
        // Show next and prev buttons if not a touch device
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
});
