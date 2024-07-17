const timelineContainer = document.getElementById('timeline-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentOffset = 0;
const limit = 5;

loadMoreBtn.addEventListener('click', () => {
  fetch(`https://gateway.marvel.com/v1/public/events?limit=${limit}&offset=${currentOffset}&apikey=plsentertheapikeyhere`)
    .then(response => response.json())
    .then(data => {
      displayEvents(data.data.results);
      currentOffset += limit;
    });
});

function displayEvents(events) {
  events.forEach(event => {
    const eventEl = document.createElement('div');
    eventEl.classList.add('timeline-event');
    
    eventEl.innerHTML = `
      <div class="card">
        <h2>${event.title}</h2>
      </div>
      <p>${event.description || 'No description available'}</p>
    `;
    
    timelineContainer.appendChild(eventEl);
  });
}


loadMoreBtn.click();
