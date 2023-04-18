// Future References
const filterSection = document.getElementById('filter-section');
const filterToggle = document.getElementById('filter-toggle');

// Hides/Shows the filter section
filterToggle.addEventListener('click', function() {
    filterSection.classList.toggle('d-none');

    if (filterSection.classList.contains('d-none')) {
        filterToggle.textContent = 'Filter';
    }
    else {
        filterToggle.textContent = 'Hide Filters';
    }
});

$(document).ready(function() {
    // Hide filters by default
    $('#filter-section').hide();
    
    $('#filter-toggle').click(function() {
        $('#filter-section').toggle();
        
        if ($('#filter-section').is(':visible')) {
            $(this).text('Hide Filters');
        }
        else {
            $(this).text('Filter');
        }
    });
});