async function generateStory() {
    const storyType = document.getElementById('storyType').value;
    const storyPrompt = document.getElementById('storyPrompt').value;
    const loader = document.getElementById('loader');
    const storyOutput = document.getElementById('storyOutput');

    
    loader.style.display = 'flex';
    storyOutput.style.display = 'none';

    
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Iwillputonceiget`
        },
        body: JSON.stringify({
            prompt: `Write a ${storyType} story based on the following prompt: ${storyPrompt}`,
            max_tokens: 500
        })
    });

    const data = await response.json();
    const story = data.choices[0].text;

    
    loader.style.display = 'none';
    storyOutput.style.display = 'block';
    storyOutput.textContent = story;
}
