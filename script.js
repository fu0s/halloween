// State management for filters
let activeFilters = {
    cities: new Set(),
    venues: new Set(),
    genres: new Set(),
    maxPrice: 50
};

// Initialize filters with unique values from data
function initializeFilters() {
    const venues = [...new Set(parties.map(party => party.venue))].sort();
    const genres = [...new Set(parties.map(party => party.genre))].sort();

    // Initialize venue filters
    const venueList = document.getElementById('venueList');
    venues.forEach(venue => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = venue;
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.venues.add(venue);
            } else {
                activeFilters.venues.delete(venue);
            }
            filterParties();
            updateActiveFilters();
        });
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(venue));
        venueList.appendChild(label);
    });

    // Initialize genre filters
    const genreList = document.getElementById('genreList');
    genres.forEach(genre => {
        const item = document.createElement('div');
        item.className = 'collection-item';
        
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'filled-in';
        
        const span = document.createElement('span');
        span.textContent = genre;
        
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.genres.add(genre);
            } else {
                activeFilters.genres.delete(genre);
            }
            filterParties();
            updateActiveFilters();
        });
        
        label.appendChild(checkbox);
        label.appendChild(span);
        item.appendChild(label);
        genreList.appendChild(item);
    });

    // Initialize city tags
    const cityTags = document.getElementById('cityTags').children;
    Array.from(cityTags).forEach(tag => {
        tag.addEventListener('click', () => {
            const city = tag.dataset.city;
            tag.classList.toggle('active');
            if (tag.classList.contains('active')) {
                activeFilters.cities.add(city);
            } else {
                activeFilters.cities.delete(city);
            }
            filterParties();
            updateActiveFilters();
        });
    });

    // Initialize price slider
    const priceSlider = document.getElementById('priceSlider');
    const priceValue = document.getElementById('priceValue');
    priceSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        priceValue.textContent = `0-${value}€`;
        activeFilters.maxPrice = parseInt(value);
        filterParties();
        updateActiveFilters();
    });

    // Initialize Material components
    initializeMaterialComponents();

    // Initialize clear filters button
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
}

// Initialize Material Design components
function initializeMaterialComponents() {
    // Initialize mobile sidenav
    const mobileMenu = document.querySelector('#mobile-demo');
    M.Sidenav.init(mobileMenu);

    // Initialize filters sidenav for mobile
    const filtersSidenav = document.querySelector('#filtersSidenav');
    M.Sidenav.init(filtersSidenav, {
        edge: 'left',
        draggable: true,
        preventScrolling: true,
        onOpenStart: () => {
            document.body.classList.add('sidenav-open');
        },
        onCloseStart: () => {
            document.body.classList.remove('sidenav-open');
        }
    });

    // Add event listeners for filter toggle buttons
    document.querySelectorAll('.toggle-filters').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const instance = M.Sidenav.getInstance(filtersSidenav);
            instance.isOpen ? instance.close() : instance.open();
        });
    });
}

// Filter parties based on active filters
function filterParties() {
    const filteredParties = parties.filter(party => {
        const matchesCity = activeFilters.cities.size === 0 || activeFilters.cities.has(party.city);
        const matchesVenue = activeFilters.venues.size === 0 || activeFilters.venues.has(party.venue);
        const matchesGenre = activeFilters.genres.size === 0 || activeFilters.genres.has(party.genre);
        const matchesPrice = party.price <= activeFilters.maxPrice;

        return matchesCity && matchesVenue && matchesPrice && matchesGenre;
    });

    displayParties(filteredParties);
}

// Update the active filters display
function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    activeFiltersContainer.innerHTML = '';

    // Add city filters
    activeFilters.cities.forEach(city => {
        addActiveFilterTag(city, () => {
            activeFilters.cities.delete(city);
            document.querySelector(`[data-city="${city}"]`).classList.remove('active');
            filterParties();
            updateActiveFilters();
        });
    });

    // Add venue filters
    activeFilters.venues.forEach(venue => {
        addActiveFilterTag(venue, () => {
            activeFilters.venues.delete(venue);
            document.querySelector(`input[value="${venue}"]`).checked = false;
            filterParties();
            updateActiveFilters();
        });
    });

    // Add genre filters
    activeFilters.genres.forEach(genre => {
        addActiveFilterTag(genre, () => {
            activeFilters.genres.delete(genre);
            document.querySelector(`input[value="${genre}"]`).checked = false;
            filterParties();
            updateActiveFilters();
        });
    });

    // Add price filter if not at maximum
    if (activeFilters.maxPrice < 50) {
        addActiveFilterTag(`Max ${activeFilters.maxPrice}€`, () => {
            activeFilters.maxPrice = 50;
            document.getElementById('priceSlider').value = 50;
            document.getElementById('priceValue').textContent = '0-50€';
            filterParties();
            updateActiveFilters();
        });
    }
}

// Display filtered parties in the list
function displayParties(partiesToShow) {
    const partyList = document.getElementById('partyList');
    partyList.innerHTML = '';

    partiesToShow.forEach(party => {
        const card = document.createElement('div');
        card.className = 'party-card';
        card.innerHTML = `
            <img src="${party.image}" alt="${party.name}" class="party-image">
            <div class="party-info">
                <h2 class="party-name">${party.name}</h2>
                <div class="party-details">
                    <p>🏢 ${party.venue}</p>
                    <p>🌆 ${party.city}</p>
                    <p>🎵 ${party.genre}</p>
                    <p>💰 ${party.price}€</p>
                </div>
                <a href="${party.ticketLink}" class="ticket-button" target="_blank">Buy Tickets</a>
            </div>
        `;
        
        partyList.appendChild(card);
    });
}

// Helper function to add active filter tags
function addActiveFilterTag(text, removeCallback) {
    const activeFiltersContainer = document.getElementById('activeFilters');
    const tag = document.createElement('div');
    tag.className = 'active-filter';
    tag.innerHTML = `
        ${text}
        <button>×</button>
    `;
    tag.querySelector('button').addEventListener('click', removeCallback);
    activeFiltersContainer.appendChild(tag);
}

// Clear all filters
function clearAllFilters() {
    activeFilters.cities.clear();
    activeFilters.venues.clear();
    activeFilters.genres.clear();
    activeFilters.maxPrice = 50;

    // Reset UI elements
    document.querySelectorAll('.city-tag').forEach(tag => tag.classList.remove('active'));
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    const priceSlider = document.getElementById('priceSlider');
    const priceValue = document.getElementById('priceValue');
    priceSlider.value = 50;
    priceValue.textContent = '0-50€';

    filterParties();
    updateActiveFilters();
}

// Initialize the application
function init() {
    initializeFilters();
    filterParties(); // Show all parties initially
    updateActiveFilters(); // Initialize active filters display
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);

// Clear all filters
function clearAllFilters() {
    activeFilters.cities.clear();
    activeFilters.venues.clear();
    activeFilters.genres.clear();
    activeFilters.maxPrice = 50;

    // Reset UI elements
    document.querySelectorAll('.city-tag').forEach(tag => tag.classList.remove('active'));
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('priceSlider').value = 50;
    document.getElementById('priceValue').textContent = '0-50€';

    filterParties();
    updateActiveFilters();
}

// Display filtered parties in the list
function displayParties(partiesToShow) {
    const partyList = document.getElementById('partyList');
    partyList.innerHTML = '';

    partiesToShow.forEach(party => {
        const card = document.createElement('div');
        card.className = 'party-card';
        
        card.className = 'party-card z-depth-1 hoverable';
        card.innerHTML = `
            <img src="${party.image}" alt="${party.name}" class="party-image">
            <div class="party-info">
                <h2 class="party-name">${party.name}</h2>
                <div class="party-details">
                    <p>
                        <i class="material-icons tiny">location_on</i>
                        ${party.venue}
                    </p>
                    <p>
                        <i class="material-icons tiny">business</i>
                        ${party.city}
                    </p>
                    <p>
                        <i class="material-icons tiny">music_note</i>
                        ${party.genre}
                    </p>
                    <p>
                        <i class="material-icons tiny">euro_symbol</i>
                        ${party.price}€
                    </p>
                </div>
                <a href="${party.ticketLink}" class="ticket-button waves-effect waves-light" target="_blank">
                    <i class="material-icons left">confirmation_number</i>
                    Buy Tickets
                </a>
            </div>
        `;
        
        partyList.appendChild(card);
    });
}

// Initialize Material components and event listeners
function initializeMaterialComponents() {
    // Initialize mobile sidenav
    const mobileMenu = document.querySelector('.sidenav');
    M.Sidenav.init(mobileMenu);

    // Initialize filters sidenav for mobile
    const filtersSidenav = document.querySelector('#filtersSidenav');
    M.Sidenav.init(filtersSidenav, {
        edge: 'left',
        draggable: true,
        preventScrolling: true
    });

    // Add event listeners for filter toggle buttons
    document.querySelectorAll('.toggle-filters').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const instance = M.Sidenav.getInstance(filtersSidenav);
            instance.isOpen ? instance.close() : instance.open();
        });
    });
}

// Initialize the application
function init() {
    initializeMaterialComponents();
    initializeFilters();
    filterParties(); // Show all parties initially
    updateActiveFilters(); // Initialize active filters display
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);