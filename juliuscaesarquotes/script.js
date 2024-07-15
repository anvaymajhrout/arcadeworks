document.getElementById('generateQuoteBtn').addEventListener('click', function() {
    const quotes = [
        "Veni, vidi, vici. (I came, I saw, I conquered.)",
        "The die is cast.",
        "It is better to create than to learn! Creating is the essence of life.",
        "Cowards die many times before their actual deaths.",
        "Experience is the teacher of all things.",
        "Men in general are quick to believe that which they wish to be true.",
        "If you must break the law, do it to seize power: in all other cases observe it.",
        "No one is so brave that he is not disturbed by something unexpected.",
        "I love the name of honor, more than I fear death.",
        "As a rule, men worry more about what they can't see than about what they can.",
        "In war, events of importance are the result of trivial causes.",
        "I had rather be first in a village than second at Rome.",
        "The difference between a republic and an empire is the loyalty of one’s army.",
        "What we wish, we readily believe, and what we ourselves think, we imagine others think also.",
        "It is easier to find men who will volunteer to die, than to find those who are willing to endure pain with patience.",
        "I came, I saw, I conquered.",
        "As a rule, what is out of sight disturbs men's minds more seriously than what they see.",
        "It is not these well-fed long-haired men that I fear, but the pale and the hungry-looking.",
        "In the end, it is impossible not to become what others believe you are.",
        "The fault, dear Brutus, is not in our stars, but in ourselves.",
        "Cry havoc and let slip the dogs of war.",
        "Beware the ides of March.",
        "I am constant as the Northern Star, of whose true-fix'd and resting quality there is no fellow in the firmament.",
        "Yond Cassius has a lean and hungry look. He thinks too much. Such men are dangerous.",
        "Not that I loved Caesar less, but that I loved Rome more.",
        "Let me have men about me that are fat, sleek-headed men, and such as sleep o' nights: yond Cassius has a lean and hungry look; he thinks too much: such men are dangerous.",
        "Et tu, Brute? (And you, Brutus?)",
        "Men at some time are masters of their fates: The fault, dear Brutus, is not in our stars, but in ourselves, that we are underlings.",
        "Cowards die many times before their deaths; The valiant never taste of death but once.",
        "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him.",
        "He thinks too much. Such men are dangerous.",
        "It’s only hubris if I fail.",
        "You blocks, you stones, you worse than senseless things!",
        "When that the poor have cried, Caesar hath wept: Ambition should be made of sterner stuff.",
        "Danger knows full well that Caesar is more dangerous than he. We are two lions littered in one day, and I the elder and more terrible.",
        "I could be well moved, if I were as you; If I could pray to move, prayers would move me; But I am constant as the northern star, Of whose true-fix'd and resting quality There is no fellow in the firmament.",
        "If you have tears, prepare to shed them now.",
        "Thrice hath Calpurnia in her sleep cried out, 'Help, ho! They murder Caesar!' Who's within?",
        "The evil that men do lives after them; The good is oft interred with their bones.",
        "But I am as constant as the northern star, Of whose true-fix'd and resting quality There is no fellow in the firmament.",
        "I am not gamesome: I do lack some part Of that quick spirit that is in Antony. Let me not hinder, Cassius, your desires; I'll leave you.",
        "He doth bestride the narrow world Like a Colossus, and we petty men Walk under his huge legs and peep about To find ourselves dishonorable graves.",
        "The ides of March are come. Soothsayer: Ay, Caesar; but not gone.",
        "It is not the well-fed long-haired man I fear, but the pale and the hungry-looking.",
        "You too, my child?",
        "Caesar's wife must be above suspicion.",
        "I am a man more sinned against than sinning.",
        "No one is so brave that he is not disturbed by something unexpected.",
        "Men in general are quick to believe that which they wish to be true.",
        "The die is cast.",
        "It is better to suffer once than to be in continual apprehension.",
        "If you must break the law, do it to seize power: in all other cases observe it.",
        "Experience is the teacher of all things.",
        "Men willingly believe what they wish.",
        "It is better to create than to learn! Creating is the essence of life.",
        "I love the name of honor more than I fear death.",
        "It is easier to find men who will volunteer to die, than to find those who are willing to endure pain with patience.",
        "The difference between a republic and an empire is the loyalty of one's army.",
        "I came, I saw, I conquered.",
        "In war, events of importance are the result of trivial causes.",
        "Cowards die many times before their actual deaths.",
        "As a rule, what is out of sight disturbs men's minds more seriously than what they see.",
        "In the end, it is impossible not to become what others believe you are.",
        "It is not these well-fed long-haired men that I fear, but the pale and the hungry-looking."
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerText = quotes[randomIndex];
});
