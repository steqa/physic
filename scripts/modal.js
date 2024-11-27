const closeBtns = document.querySelectorAll('#closeModal');

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById(btn.getAttribute('data-modal-id'));
        modal.style.display = 'none';
    });
});
