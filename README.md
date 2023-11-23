# Easy-POS

    This project is intented for learning react-native and other relatead stack.

# Build Status

    On-Going

# Tech

    React-Expo
    @reduxjs/toolkit


# File structure

```
├───app
│   ├───*modules
│   ├───(drawer)
│   │   ├───(*drawer route)
│   │   │   ├───*drawer sub routes
|   |   |   |   ├───_layout.jsx
|   |   |   |   ├───index.jsx
|   |   |   |   ├───*stack routes
│   │   ├───_layout.jsx
│   ├───_layout.jsx
│   ├───index.jsx
├───assets
│   ├───fonts
│   └───imgs
├───src
│   ├───components
│   │   ├───*modules
│   │   │   ├───ui
│   │   │   ├───shared
│   │   │   ├───index.jsx
│   ├───routes
│   │   ├───index.jsx
│   │   ├───routes.jsx
│   ├───screens  - TBR!!
│   │   ├───index.jsx
│   │   ├───*ScreenComponents
│   ├───themes
│   │   ├───index.jsx
│   │   ├───*app related stylesheet
│   ├───ui
│   │   ├───core
│   │   |   ├───*first layer components
│   │   ├───*shared components
│   │   |   ├───*non shareable sub components
│   │   ├───index.jsx
```

- /app
    App is strictly for ui/ux flow and navigation structure.
    And other preloading ui/ux functions like Splascreens and Fonts
    ***Note:*** *Use ScreensComponents from **src/screens/** in each _layout.jsx .*

- /app/*modules
    Uses Stack Navigation otherwise (drawer)
    ***Note:*** *Use ScreensComponents from **src/components/\*modules/** in each _layout.jsx .*

- /app/(drawer)/(*drawer route)
    Completely unrelated to modules, you can set drawer routes in *src/routes/routes.jsx*.
    *Use **_layout.jsx** to define your Drawer.Screen*
    ***Note:*** *Use ScreensComponents from **src/screens/** in each _layout.jsx .*

- /app/(drawer)/(*drawer route)/*drawer sub routes
    It is important to consider adding *_layout.js* for drawer to ignore subroutes, Since the structure is planning to use Stack Navigation for the rest of the app, otherwise drawer for main navigation.
    ***Note:*** *Use ScreensComponents from **src/screens/** in each _layout.jsx .*

- /assets
    Static assets

- /src
    Should avoid composing components in and utils/helpers in ***/app*** unless necessary. Everything should be inside the ***/app/\***

- /src/components
    Modular components.

- /src/components/*modules
    ***/index.js*** - Use imports for shareable components
    ***/screens/\*.jsx*** - Use direct import when used
    ***/layouts/\*.jsx*** - To be strictly used in _layout.jsx, use direct import when used
    ***/ui/\*.jsx*** *- 1st layer components inside for module-specific. non shareable*
    ***/shared/\*.jsx*** *- 2nd layer components inside for module-specific, import in index.jsx*

- /src/routes
    Define your routes drawer and stack routes

- /src/screens - TBR!!
    ***Screens should only be used in _layouts.jsx***

- /src/themes
    Styling

- /src/ui
    Non modular components

- /src/ui/core
    *Should avoid using directly outside src/ui components* , use 2nd-3rd layer instead. Otherwise explain

- /src/ui/*shared components
    Second layer shareable components.
    ***Note:*** *For components that has sub components on it's own, has it's own folder and non-shareable components.*

:sweat_smile: To be continue.. :sweat_smile:
