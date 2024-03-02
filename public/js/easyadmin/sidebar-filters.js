document.addEventListener("DOMContentLoaded", function(event)
{
    // ### SIDEBAR FILTERS JS

    // #### Load the ajax content of the filters into the sidebar

    // Get the orginal "Filters button"
    const filterButton = document.querySelector('.datagrid-filters .action-filters-button');
    // ...and the ajax url for the filters content from it
    const filterUrl = filterButton.getAttribute('href');
    // This is our added container from overridden index.html.twig
    const sidebarFilter = document.getElementById('sidebar-filters');

    fetch(filterUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text();
        })
        .then(html => {
            // Insert the fetched HTML into the #sidebar-filter element
            sidebarFilter.innerHTML = html;

            // === POST filter form load:

            // TODO: how to access bootstrap here?

            // Uncollapse all filters
            // Find all filter toggles and set them to be expanded
            sidebarFilter.querySelectorAll('.filter-heading a').forEach(function(toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            });

            // Find all filter content divs and show them
            sidebarFilter.querySelectorAll('.filter-content').forEach(function(content) {
                content.classList.remove('collapse'); // Remove the collapse class to show them
                content.style.display = 'block'; // Ensure they are displayed
            });

            // Check filter selected checkbox automatically
            const filterFields = sidebarFilter.querySelectorAll('.filter-field');
            filterFields.forEach(field => {
                // Find all input and textarea elements within the current filter field
                const inputs = field.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    // Add event listeners based on the input type
                    if (input.type === 'radio') {
                        // For radio buttons, listen for the 'change' event
                        input.addEventListener('change', () => {
                            if (input.checked) {
                                // If a radio is selected, check the associated checkbox
                                field.querySelector('.filter-checkbox').checked = true;
                            }
                        });
                    } else {
                        // For text inputs and textareas, listen for 'input' event
                        input.addEventListener('input', () => {
                            // Check the associated checkbox if there's content
                            field.querySelector('.filter-checkbox').checked = input.value.trim() !== '';
                        });
                    }
                });
            });


            // === Submit (apply) with Enter key
            const filtersForm = document.querySelector('#filters');
            const applyButton = document.querySelector('#sidebar-filters-apply');

            filtersForm.querySelectorAll('input, textarea').forEach(function(input) {
                input.addEventListener('keypress', function(event) {
                    // Check if the Enter key was pressed
                    if (event.key === 'Enter' || event.keyCode === 13) {
                        event.preventDefault();
                        applyButton.click();
                    }
                });
            });

            // === End of POST filter form load

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


    // === Imitate original behavior of the "Apply" button
    const filterModal = document.querySelector('#sidebar-filters');

    // Adapted from vendor/easycorp/easyadmin-bundle/assets/js/app.js
    document.querySelector('#sidebar-filters-apply').addEventListener('click', () => {
        filterModal.querySelectorAll('.filter-checkbox:not(:checked)').forEach((notAppliedFilter) => {
            removeFilter(notAppliedFilter.closest('.filter-field'));
        });
        filterModal.querySelector('form').submit();
    });

    // Copied from vendor/easycorp/easyadmin-bundle/assets/js/app.js as we cannot access the original function
    const removeFilter = (filterField) => {
        filterField.closest('form').querySelectorAll(`input[name^="filters[${filterField.dataset.filterProperty}]"]`).forEach((filterFieldInput) => {
            filterFieldInput.remove();
        });

        filterField.remove();
    };

});
