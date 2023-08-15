
function highlightText(text, search) {
    const regex = new RegExp(search, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}


function displayResults(data, search) {
    const resultsContainer = document.getElementById('results');

    if (data.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
        return;
    }

    let output = '<ul>';
    data.forEach(result => {
        const { country_id, probability } = result;
        output += `<li>Nationality: ${highlightText(country_id, search)} | Probability: ${probability.toFixed(2)}</li>`;
    });
    output += '</ul>';
    resultsContainer.innerHTML = output;
}


async function searchNationality() {
    const nameInput = document.getElementById('name');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', async () => {
        const name = nameInput.value.trim();

        if (!name) {
            alert('Please enter a name.');
            return;
        }

        try {
            const response = await fetch(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`);
            const data = await response.json();

            
            const topCountries = data.country.slice(0, 2);
            displayResults(topCountries, name);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}


searchNationality();
