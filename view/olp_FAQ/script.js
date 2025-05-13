document.getElementById('searchInput').addEventListener('input', function () {
    let input = this.value.toLowerCase();
    let faqs = document.getElementsByClassName('faq-item');
    for (let i = 0; i < faqs.length; i++) {
        let question = faqs[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (question.includes(input)) {
            faqs[i].style.display = '';
        } else {
            faqs[i].style.display = 'none';
        }
    }
});

function toggleSupportForm() {
    let form = document.getElementById('supportForm');
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}
