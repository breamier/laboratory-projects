fetch('https://api.opendota.com/api/heroStats')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        container.innerHTML = "";    
        data.forEach(hero => {
            const card = `
                <div class="card">
                    <img src="https://cdn.cloudflare.steamstatic.com/${hero.img}" alt="${hero.localized_name}">
                    <h3>${hero.localized_name}</h3>
                    <p>${hero.roles.join(', ')}</p>
                </div>
            `;
            container.innerHTML += card;
            });
        })
    .catch(error => console.error('Error fetching data'));