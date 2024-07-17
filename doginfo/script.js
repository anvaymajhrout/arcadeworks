const apiKey = 'live_05JN6opGUNMEDrlQsNhBf8OHNZs6gYosGEbVS38OE8a7Y3uEFzQl8OhEiNNyuhS6';

document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.getElementById('breedSelect');
    const dogCard = document.getElementById('dogCard');
    const dogImage = document.getElementById('dogImage');
    const dogBreed = document.getElementById('dogBreed');
    const dogInfo = document.getElementById('dogInfo');

    
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {
                const li = document.createElement('li');
                li.className = 'submenu-item';
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'submenu-link';
                a.textContent = breed.name;
                a.dataset.breedId = breed.id;
                li.appendChild(a);
                breedSelect.appendChild(li);
            });

            
            document.querySelectorAll('.submenu-link').forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const breedId = event.target.dataset.breedId;
                    fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`, {
                        headers: {
                            'x-api-key': apiKey
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            const breed = data[0].breeds[0];
                            dogImage.src = data[0].url;
                            dogBreed.textContent = breed.name;
                            dogInfo.textContent = breed.temperament;
                            dogCard.classList.remove('hidden');
                        });
                });
            });
        });
});
