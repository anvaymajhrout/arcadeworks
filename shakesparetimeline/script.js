document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event');
    events.forEach(event => {
        event.addEventListener('click', () => {
            alert(event.querySelector('p').textContent);
        });
    });
});
