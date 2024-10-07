const sectionListing = document.querySelector('.section-listing');
const filterBar = document.querySelector('.filter-bar');
const filterGroup = document.querySelector('.filter-bar--group');
let filterSet  = new Set();

// Fetching data from json file
const getListingData = function(url='data.json') {
    return fetch(url)
    .then(response => {
        return response.json();
    })
}


const renderFilter = function(tags) {
    filterGroup.innerHTML = '';

    tags.forEach(tag => {
        const filterTag = `
        <div class="filter-tag">
            <span class="filter-bar--tag">${tag}</span>
            <button class="btn btn--close"></button>
        </div>
        `;
        filterGroup.insertAdjacentHTML('beforeend', filterTag);
        document.querySelectorAll('.btn--close').forEach(btn => {
            btn.addEventListener('click', () => {
                const tagParent = btn.closest('.filter-tag');
                const tag = tagParent.querySelector('.filter-bar--tag');
                
                filterSet.delete(tag.innerHTML);
                filterGroup.removeChild(tagParent);  

                getListingData().then(data => {
                    const arr = Array.from(data)
                    renderListing(arr)
                    // arr.filter(item => item.tagsArr.includes(...filterSet))
                    const filteredArr = arr.filter(item => item.tagsArr.includes(...filterSet));
                    console.log(filterSet)
                    renderListing(filteredArr);
                    if(filterSet.size === 0) {
                        renderListing(arr)
                    }
                })

                if(filterGroup.children.length === 0) {
                    filterBar.style.display = 'none';  
                }
            })
        })
    })
}

function renderListing(data) {
   
    sectionListing.innerHTML = '';
    renderFilter(filterSet); // Render selected tags
    data.forEach(n => {
        const tagLink = [];
        const tags = [n.role].concat(n.level).concat(n.languages).concat(n.tools);
        n.tagsArr = tags;
        for(const tag of tags) {
            tagLink.push(`<button class="tag tag--cyan">${tag}</button>`);
        }

        
        let listing = `
        <div class="listing u-margin-bottom">
            <div class="listing__block">
                <div class="listing__logo-box">
                    <img src="${n.logo}" alt="logo" class="listing__logo">
                </div>
                <div class="listing__text">
                    <div class="listing__header">
                        <span class="listing__company">${n.company}</span>
        `;

        if(n.new) {
            listing += `<span class="listing__tag listing__tag--new">New!</span>`;
        }

        if(n.featured) {
            listing += `<span class="listing__tag listing__tag--featured">Featured</span>`;
        }

        listing += `
                </div>
                <p class="listing__position">${n.position}</p>
                <div class="listing__list">
                    <span class="listing__item">${n.postedAt}</span>
                    <span class="listing__item">${n.level}</span>
                    <span class="listing__item">${n.location}</span>
                </div>
            </div>
        </div>
        `;

        listing += `
            <div class="listing__block listing__block--tags">
                ${tagLink.join('')}
            </div>
        </div>
        `;

        sectionListing.insertAdjacentHTML('beforeend', listing);

        if (n.new) {
            document.querySelectorAll('.listing').forEach(n =>  n.style.borderLeftColor = 'hsl(180, 29%, 50%)');
        }

        // Click link 
        // Click event listener for '.listing__block--tags'
        document.querySelectorAll('.listing__block--tags').forEach(blockTag => {
            blockTag.addEventListener('click', function(e) {
                const tag = e.target.innerHTML;
                
                // Add tag to filterSet
                filterSet.add(tag);
                
                filterBar.style.display = 'flex';
                
                // Filter data based on filterSet
                const filteredData = data.filter(item => {
                    return item.tagsArr.includes(tag);
                });
                
                renderListing(filteredData); // Render filtered data
            });
        });
    });
}



// Get and render the listings
getListingData().then(data => {
    renderListing(data)
    
    // Click event listener for '.filter-bar--clear' to clear filters
    document.querySelector('.filter-bar--clear').addEventListener('click', (e) => {
        e.preventDefault();
        filterSet.clear(); // Clear filterSet
        console.log(filterSet)
        filterBar.style.display = 'none';
        renderListing(data); // Render original data
    });
})

// Create Listing data from data and the element in an array
