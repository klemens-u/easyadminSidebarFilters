# easyadminSidebarFilters
Symfony Easyadmin: Temporary solution for permanent filters in a sidebar (no modal)

Notes: 
- This is just a hacky prototype in userspace
- Tested with Easyadmin 3

Sadly Easyadmin only supports filters in a popup (modal).
This is not very user-friendly and pretty inefficient if you work with the UI on a daily basis.

I think a similar solution could be implemented realtivly easily in Easyadmin itself.
Probably with a simple config option in DashBoardController.

Please leave an issue if you're interested in taking this further.


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

