document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event');
    events.forEach(event => {
        event.addEventListener('click', () => {
            alert(event.querySelector('p').textContent);
        });
    });

    const summaryButton = document.getElementById('summaryButton');
    summaryButton.addEventListener('click', () => {
        alert("Rabindranath Tagore was a Bengali polymath who reshaped Bengali literature and music, as well as Indian art with Contextual Modernism in the late 19th and early 20th centuries. He was the first non-European to win the Nobel Prize in Literature in 1913.");
    });
});
