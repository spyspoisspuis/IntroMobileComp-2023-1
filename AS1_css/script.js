document.addEventListener('DOMContentLoaded', function () {
    const londonLink = document.querySelector('#london-link');
    const parisLink = document.querySelector('#paris-link');
    const tokyoLink = document.querySelector('#tokyo-link');
    const articleTitle = document.querySelector('article h1');
    const articleContent = document.querySelector('article p');

    // Event listeners for the links
    londonLink.addEventListener('click', function (event) {
        event.preventDefault();
        updateArticleContent('London ลอนดอน', 'London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants. Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.');
    });

    parisLink.addEventListener('click', function (event) {
        event.preventDefault();
        updateArticleContent('Paris ปารีส', 'Paris is the capital city of France. It is known for its art, culture, and history. The city is famous for iconic landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.');
    });

    tokyoLink.addEventListener('click', function (event) {
        event.preventDefault();
        updateArticleContent('Tokyo โตเกียว', 'Tokyo is the capital city of Japan. It is a bustling metropolis known for its modern technology, vibrant neighborhoods, and cultural attractions. The city offers a mix of traditional Japanese culture and contemporary urban life.');
    });

    function updateArticleContent(title, content) {
        articleTitle.textContent = title;
        articleContent.textContent = content;
    }
});
