document.getElementById('travel-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const people = document.getElementById('people').value;

    // Use the Travel Advisor API to fetch travel data
    fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${destination}&limit=1&offset=0&units=km&location_id&currency=USD&sort=relevance&lang=en_US`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': '1debec99f7mshf1a911c37d0ef67p1a9916jsn678d09783472' 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const travelPlanDiv = document.getElementById('travel-plan');
        travelPlanDiv.innerHTML = generateTravelPlanHTML(data);
        document.getElementById('print-button').style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching travel plan:', error);
        const travelPlanDiv = document.getElementById('travel-plan');
        travelPlanDiv.innerHTML = `<div class="alert alert-danger">Failed to fetch travel plan. Please try again.</div>`;
    });
});

document.getElementById('print-button').addEventListener('click', function() {
    window.print();
});

function generateTravelPlanHTML(data) {
    
    let html = '<h2> Travel Plan</h2>';
    
    if (data.data && data.data.length > 0) {
        const location = data.data[0];
        html += `<h3>${location.name}</h3>`;
        html += `<p>${location.snippet}</p>`;
    } else {
        html += `<p>No travel plan available for the given destination.</p>`;
    }
    
    return html;
}
