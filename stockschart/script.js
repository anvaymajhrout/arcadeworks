function loadChart() {
    const stockSelect = document.getElementById('stockSelect').value;
    const chartContainer = document.getElementById('chartContainer');
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Create new TradingView widget
    new TradingView.widget({
        "width": "100%",
        "height": "100%",
        "symbol": stockSelect,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "chartContainer"
    });
}
