// State management for filters
let activeFilters = {
    cities: new Set(),
    venues: new Set(),
    genres: new Set(),
    maxPrice: 50
};

/**
 * Helper function to create a Bootstrap List Group Checkbox item
 * @param {string} type - 'cities', 'venues', or 'genres'
 * @param {string} value - The filter value (e.g., 'Cologne', 'Stahlwerk', 'Techno')
 */
function createFilterItem(type, value) {
    const li = document.createElement('li');
    li.className = 'list-group-item bg-dark text-white border-secondary';

    const input = document.createElement('input');
    input.className = 'form-check-input me-2';
    input.type = 'checkbox';
    input.value = value;
    // Use the value and type to create a unique ID for the label association
    input.id = `${type}-${value.replace(/[^a-zA-Z0-9]/g, '-')}`;

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.setAttribute('for', input.id);
    label.textContent = value;

    input.addEventListener('change', (e) => {
        const checked = e.target.checked;
        const filterSet = activeFilters[type];
        
        // Update state
        if (checked) {
            filterSet.add(value);
        } else {
            filterSet.delete(value);
        }

        // Keep the state of the mirrored checkboxes (desktop/mobile) in sync
        document.querySelectorAll(`input[value="${value}"][type="checkbox"]`).forEach(mirrorInput => {
            if (mirrorInput !== e.target) {
                mirrorInput.checked = checked;
            }
        });

        filterParties();
        updateActiveFilters();
    });

    li.appendChild(input);
    li.appendChild(label);
    return li;
}

/**
 * Function to populate a filter list (used for both desktop and mobile)
 */
function populateFilterList(listElementId, type, values) {
    const listElement = document.getElementById(listElementId);
    if (!listElement) return;
    listElement.innerHTML = ''; 
    values.forEach(value => {
        listElement.appendChild(createFilterItem(type, value));
    });
}

// Initialize filters with unique values from data
function initializeFilters() {
    const cities = [...new Set(parties.map(party => party.city))].sort();
    const venues = [...new Set(parties.map(party => party.venue))].sort();
    const genres = [...new Set(parties.map(party => party.genre))].sort();
    
    // Populate all list sections (desktop and mobile)
    populateFilterList('cityList', 'cities', cities);
    populateFilterList('cityListMobile', 'cities', cities);
    populateFilterList('venueList', 'venues', venues);
    populateFilterList('venueListMobile', 'venues', venues);
    populateFilterList('genreList', 'genres', genres);
    populateFilterList('genreListMobile', 'genres', genres);
    
    // Price Slider logic (linking desktop and mobile sliders)
    const priceSlider = document.getElementById('priceSlider');
    const priceSliderMobile = document.getElementById('priceSliderMobile');
    const priceValue = document.getElementById('priceValue');
    const priceValueMobile = document.getElementById('priceValueMobile');

    // Sync function for both sliders
    function syncPriceSlider(e) {
        const val = parseInt(e.target.value);
        activeFilters.maxPrice = val;
        
        // Update the value display on both
        if(priceValue) priceValue.textContent = `0-${val}€`;
        if(priceValueMobile) priceValueMobile.textContent = `0-${val}€`;
        
        // Sync the slider position on the other element
        if (e.target === priceSlider) {
            if(priceSliderMobile) priceSliderMobile.value = val;
        } else {
            if(priceSlider) priceSlider.value = val;
        }
        
        filterParties();
    }
    
    if (priceSlider) {
        priceSlider.addEventListener('input', syncPriceSlider);
    }
    if (priceSliderMobile) {
        priceSliderMobile.addEventListener('input', syncPriceSlider);
    }
}

// Filter the party data based on active filters
function filterParties() {
    const filteredParties = parties.filter(party => {
        // City filter
        const cityMatch = activeFilters.cities.size === 0 || activeFilters.cities.has(party.city);
        
        // Venue filter
        const venueMatch = activeFilters.venues.size === 0 || activeFilters.venues.has(party.venue);
        
        // Genre filter
        const genreMatch = activeFilters.genres.size === 0 || party.genre.split(', ').some(genre => activeFilters.genres.has(genre.trim()));
        
        // Price filter
        const priceMatch = party.price <= activeFilters.maxPrice;
        
        return cityMatch && venueMatch && genreMatch && priceMatch;
    });

    renderParties(filteredParties);
}

// Function to render the parties as collapsible Bootstrap Cards
function renderParties(filteredParties) {
    const partyList = document.getElementById('partyList');
    partyList.innerHTML = ''; // Clear existing cards

    if (filteredParties.length === 0) {
        partyList.innerHTML = '<div class="col-12"><p class="text-white-50">No parties match your current filters. Try adjusting your selection.</p></div>';
        return;
    }

    filteredParties.forEach(party => {
        const collapseId = `collapse-${party.id}`;

        const cardCol = document.createElement('div');
        // Bootstrap responsive grid classes
        cardCol.className = 'col-12 col-sm-6 col-lg-4'; 

        const card = document.createElement('div');
        // Custom class for styling, h-100 for equal height cards
        card.className = 'card h-100 party-card border-0'; 

        // Card Image
        const image = document.createElement('img');
        image.src = party.image;
        image.className = 'card-img-top party-image';
        image.alt = party.name;
        card.appendChild(image);

        // Card Header (Always visible part with Name and City)
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header p-0';

        // Collapse Button (The clickable part)
        const collapseButton = document.createElement('button');
        collapseButton.className = 'btn text-start w-100 p-3';
        collapseButton.type = 'button';
        collapseButton.setAttribute('data-bs-toggle', 'collapse');
        collapseButton.setAttribute('data-bs-target', `#${collapseId}`); // Target the collapsible body
        collapseButton.setAttribute('aria-expanded', 'false');
        collapseButton.setAttribute('aria-controls', collapseId);
        collapseButton.innerHTML = `
            <h5 class="card-title mb-0">${party.name}</h5>
            <p class="card-subtitle mb-0 text-white-50">${party.city}</p>
        `;

        cardHeader.appendChild(collapseButton);
        card.appendChild(cardHeader);

        // Collapsible Body (Details)
        const collapseDiv = document.createElement('div');
        collapseDiv.id = collapseId;
        collapseDiv.className = 'collapse'; // Start collapsed

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-white';

        cardBody.innerHTML = `
            <hr class="text-white-50">
            <p class="card-text mb-1"><strong>Venue:</strong> ${party.venue}</p>
            <p class="card-text mb-1"><strong>Genre:</strong> ${party.genre}</p>
            <p class="card-text mb-3"><strong>Price:</strong> ${party.price}€</p>
            <a href="${party.ticketLink}" target="_blank" class="btn btn-sm" style="background-color: #ff6b00; color: white;">
                Get Tickets <i class="bi bi-arrow-right-short"></i>
            </a>
        `;
        
        collapseDiv.appendChild(cardBody);
        card.appendChild(collapseDiv);
        
        cardCol.appendChild(card);
        partyList.appendChild(cardCol);
    });
}

// Function to update the display of active filters (Bootstrap Badges)
function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    activeFiltersContainer.innerHTML = ''; 

    const allActiveFilters = [
        ...Array.from(activeFilters.cities),
        ...Array.from(activeFilters.venues),
        ...Array.from(activeFilters.genres)
    ];

    if (activeFilters.maxPrice < 50) {
        allActiveFilters.push(`Max Price: ${activeFilters.maxPrice}€`);
    }

    allActiveFilters.forEach(filterText => {
        const isPriceFilter = filterText.startsWith('Max Price:');
        
        const filterBadge = document.createElement('span');
        // Use custom styling to override default Bootstrap colors for a dark/orange theme
        filterBadge.className = 'badge text-white p-2 d-flex align-items-center gap-1';
        filterBadge.textContent = filterText;
        filterBadge.style.backgroundColor = '#ff6b00'; 
        filterBadge.style.borderRadius = '50px'; // Pill shape

        if (!isPriceFilter) {
            const removeButton = document.createElement('button');
            removeButton.className = 'btn-close btn-close-white ms-1';
            removeButton.type = 'button';
            removeButton.setAttribute('aria-label', 'Remove filter');
            removeButton.addEventListener('click', () => {
                removeFilter(filterText);
            });
            filterBadge.appendChild(removeButton);
        }
        
        activeFiltersContainer.appendChild(filterBadge);
    });
}

// Function to remove a filter and update the UI
function removeFilter(filterText) {
    if (activeFilters.cities.has(filterText)) {
        activeFilters.cities.delete(filterText);
    }
    else if (activeFilters.venues.has(filterText)) {
        activeFilters.venues.delete(filterText);
    }
    else if (activeFilters.genres.has(filterText)) {
        activeFilters.genres.delete(filterText);
    }

    // Uncheck the corresponding checkboxes for both desktop and mobile lists
    document.querySelectorAll(`input[value="${filterText}"]`).forEach(checkbox => {
        checkbox.checked = false;
    });

    filterParties();
    updateActiveFilters();
}

// Initialize the application
function init() {
    // Removed Materialize initialization
    initializeFilters();
    filterParties(); // Show all parties initially
    updateActiveFilters(); // Initialize active filters display
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);