document.getElementById('remove-bg-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('image-input');
    const resultContainer = document.getElementById('result-container');
    
    if (fileInput.files.length === 0) {
      alert('Please select an image first.');
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    fetch('https://api.hotpot.ai/remove-background', {
      method: 'POST',
      headers: {
        'apikey': 'Plsentertheapikeyhere'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        resultContainer.innerHTML = `<img src="${data.output_url}" alt="Background removed">`;
      } else {
        alert('Failed to remove background. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing your request. Please try again.');
    });
  });
  