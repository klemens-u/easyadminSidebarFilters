# Symfony Easyadmin Sidebar Filters (No Modal)
Symfony Easyadmin: Temporary solution for permanent filters in a sidebar (no modal)

Notes: 
- This is just a hacky prototype in user space
- Tested with Easyadmin 3

Unfortunately, Easyadmin currently supports filters only within a popup (modal). This approach is not particularly user-friendly and can be quite inefficient for daily interaction with the UI.

I believe that a similar solution could be integrated into Easyadmin itself with relative ease, possibly through a straightforward configuration option in the DashboardController.

If you're interested in exploring this idea further, please consider opening an issue.


### Easyadmin Permanent Filters in Sidebar

![](/easyadmin-sidebar-filters.png)

Here is a somewhat hacky way to add permanent filters to a sidebar:

Create `templates/bundles/EasyAdminBundle/crud/index.html.twig`.
This files allows to override the default EasyAdmin index template.
Here we add the markup for the sidebar and the "Apply" button.

Next we add js code to our custom easyadmin JS file `public/js/easyadmin/sidebar-filters.js`.
Overview:
- Load the filters form's modal content via ajax into the new sidebar
- After loading uncollapse all filter fields and auto-check the selection checkboxes
- Allow to submit with [Enter] key
- Finally, we have to simulate some of the original code when pressing the "Apply" button for correct submission (Remove unused fields)

Finally include the js in your DashboardController:

``` php
<?php
// src/Controller/Admin/DashboardController.php

    ...

    public function configureAssets(): Assets
    {
        $assets = parent::configureAssets();
        $assets->addJsFile('js/easyadmin/sidebar-filters.js');

        return $assets;
    }
```

