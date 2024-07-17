document.getElementById('generate').addEventListener('click', generatePalette);

function generatePalette() {
    fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({
            model: 'default'
        })
    })
    .then(response => response.json())
    .then(data => {
        const colors = data.result;
        const palette = document.getElementById('palette');
        palette.innerHTML = '';
        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            
            const colorCode = document.createElement('div');
            colorCode.className = 'color-code';
            colorCode.textContent = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            
            colorBox.appendChild(colorCode);
            palette.appendChild(colorBox);
        });
    })
    .catch(error => console.error('Error fetching the color palette:', error));
}
