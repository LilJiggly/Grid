document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Generate the list of images
    const images = [];
    const totalImages = 5; // Adjust this to the maximum number of images you have

    for (let i = 1; i <= totalImages; i++) {
        const imgSrc = `images/image${i}.jpg`;
        // Check if the image exists
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            images.push(imgSrc);
            appendImage(imgSrc);
        };
    }

    function appendImage(src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = src;
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = img.src;
        });
        gallery.appendChild(img);
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
