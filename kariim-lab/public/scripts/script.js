const dropdownBtn = document.getElementById('dropdownBtn');
const categories = document.getElementById('categories');
const items = document.querySelectorAll('.item');

dropdownBtn.addEventListener('click', function() {
    categories.classList.toggle('active');
    this.classList.toggle('active');
});

items.forEach(item => {
    item.addEventListener('click', function() {
        
        setTimeout(() => {
            categories.classList.remove('active');
            dropdownBtn.classList.remove('active');
        }, 150);
    });
});

let lastScrollY = window.scrollY;
let header = document.getElementById('header');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.scrollY;

            // If we're at the top, remove sticky behavior
            if (currentScroll < 100) {
                header.classList.remove('sticky');
                header.classList.remove('hide');
            } else {
                // Add sticky when scrolling down
                header.classList.add('sticky');
                
                // Hide when scrolling down, show when scrolling up
                if (currentScroll > lastScrollY + 5) {
                    header.classList.add('hide');
                } else if (currentScroll < lastScrollY - 5) {
                    header.classList.remove('hide');
                }
            }
            
            lastScrollY = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

// Add kategorija dropdown functionality
const kategorija = document.getElementById('kategorija');
const kategorijaDropdown = document.querySelector('.kategorija-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');

kategorija.addEventListener('click', (e) => {
    e.stopPropagation();
    kategorijaDropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!kategorija.contains(e.target)) {
        kategorijaDropdown.classList.remove('active');
    }
});

dropdownItems.forEach(item => {
    item.addEventListener('click', async function() {
        // Update category text
        document.getElementById('trenutnaKategorija').textContent = this.textContent;
        document.getElementById('odabir').textContent=this.textContent;
        // Update products display using data.js logic
        if (window.updateProductDisplay) {
            await window.updateProductDisplay();
        } else if (typeof updateProductDisplay === 'function') {
            await updateProductDisplay();
        }
        // Close dropdown with animation
        setTimeout(() => {
            kategorijaDropdown.classList.remove('active');
        }, 150);
    });
});