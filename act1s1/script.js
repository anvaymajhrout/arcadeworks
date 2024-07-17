
document.addEventListener('DOMContentLoaded', () => {
    const playSpeechButton = document.getElementById('play-speech');
    const sceneContent = document.querySelector('.scene-content');
    const nextSceneButton = document.getElementById('next-scene');

    playSpeechButton.addEventListener('click', () => {
        const speech = new SpeechSynthesisUtterance(sceneContent.textContent);
        speech.lang = 'en-US';
        speech.pitch = 1;
        speech.rate = 1;
        speech.volume = 1;
        speechSynthesis.speak(speech);
    });

    const difficultWords = document.querySelectorAll('.difficult-word');

    difficultWords.forEach(word => {
        word.addEventListener('click', () => {
            alert(word.getAttribute('title'));
        });
    });

    nextSceneButton.addEventListener('click', () => {
        window.location.href = 'path/to/next/scene.html'; // Update this with the actual path to the next scene
    });

    console.log('Julius Caesar Act 1, Scene 1 page loaded.');
});
