document.getElementById('get-fact-btn').addEventListener('click', () => {
    const numberInput = document.getElementById('number-input');
    const resultContainer = document.getElementById('result-container');
    
    const number = numberInput.value.trim();
    
    if (!number) {
      alert('Please enter a number.');
      return;
    }
  
    fetch(`http://numbersapi.com/${number}`)
      .then(response => response.text())
      .then(fact => {
        resultContainer.textContent = fact;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching the fact. Please try again.');
      });
  });
  