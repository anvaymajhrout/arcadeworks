document.addEventListener('DOMContentLoaded', () => {
    const commoditySearchInput = document.getElementById('commodity-search');
    const fetchCommodityDetailsButton = document.getElementById('fetch-commodity-details');
    const commodityDetails = document.getElementById('commodity-details');
    const suggestionsContainer = document.getElementById('commodity-suggestions');
    const commodityChart = document.getElementById('commodity-chart');
    let chartInstance;

    let allCommodities = [
        'gold', 'silver', 'crude oil', 'natural gas', 'copper', 'platinum', 'wheat', 'corn', 'soybeans', 'coffee', 'cotton', 'sugar'
    ];

    commoditySearchInput.addEventListener('input', () => {
        const query = commoditySearchInput.value.toLowerCase();
        const filteredCommodities = allCommodities.filter(commodity => commodity.toLowerCase().includes(query));
        suggestionsContainer.innerHTML = '';
        filteredCommodities.forEach(commodity => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.classList.add('suggestion');
            suggestionDiv.textContent = commodity;
            suggestionDiv.addEventListener('click', () => {
                commoditySearchInput.value = suggestionDiv.textContent;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(suggestionDiv);
        });
        suggestionsContainer.style.display = filteredCommodities.length > 0 ? 'block' : 'none';
    });

    fetchCommodityDetailsButton.addEventListener('click', () => {
        const selectedCommodity = commoditySearchInput.value;
        if (selectedCommodity) {
            fetch(`https://commodities-api.com/api/latest?access_key=securitynotupdatedso&symbols=${selectedCommodity}`)
                .then(response => response.json())
                .then(data => {
                    displayCommodityDetails(data.data);
                    fetchCommodityHistory(selectedCommodity);
                });
        }
    });

    function displayCommodityDetails(data) {
        const commodity = Object.keys(data)[0];
        const price = data[commodity];
        commodityDetails.innerHTML = `
            <h2>${commodity.toUpperCase()}</h2>
            <p><strong>Current Price:</strong> ${price} USD</p>
        `;
        commodityDetails.style.display = 'block';
    }

    function fetchCommodityHistory(commodity) {
        fetch(`https://commodities-api.com/api/timeseries?access_key=YOUR_API_KEY&symbols=${commodity}&start_date=2023-01-01&end_date=2023-12-31`)
            .then(response => response.json())
            .then(data => {
                const labels = Object.keys(data.data);
                const prices = Object.values(data.data);
                renderChart(commodity, labels, prices);
            });
    }

    function renderChart(commodity, labels, prices) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        commodityChart.style.display = 'block';
        chartInstance = new Chart(commodityChart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${commodity.toUpperCase()} Price (USD)`,
                    data: prices,
                    backgroundColor: 'rgba(163, 112, 240, 0.2)',
                    borderColor: 'rgba(163, 112, 240, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
