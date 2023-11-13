# Easy-POS

    This project is intented for learning react-native and other relatead stack.

# Build Status

    On-Going

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
│   │   │   ├───*sub screens modules
│   │   │   ├───index.jsx
│   ├───routes
│   │   ├───index.jsx
│   │   ├───routes.jsx
│   ├───screens
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
    ***Note:** Use ScreensComponents from **src/screens/*** in each _layout.jsx .*

- /app/*modules
    Uses Stack Navigation otherwise (drawer)
    ***Note:** Use ScreensComponents from **src/screens/*** in each _layout.jsx .*

- /app/(drawer)/(*drawer route)
    Completely unrelated to modules, you can set drawer routes in *src/routes/routes.jsx*.
    *Use **_layout.jsx** to define your Drawer.Screen
    ***Note:** Use ScreensComponents from **src/screens/*** in each _layout.jsx .*

- /app/(drawer)/(*drawer route)/*drawer sub routes
    It is important to consider adding *_layout.js* for drawer to ignore subroutes, Since the structure is planning to use Stack Navigation for the rest of the app, otherwise drawer for main navigation.
    ***Note:** Use ScreensComponents from **src/screens/*** in each _layout.jsx .*

- /assets
    Static assets

- /src
    Should avoid composing components in and utils/helpers in ***/app\*** unless necessary. Everything should be inside the ***/app/\***

- /src/components
    Modular components.

- /src/components/*modules
    ***/ui/\*** - 1st layer components inside for module-specific, import in *index.jsx* if ***Note:** folder name should be the same with intended main screen for module. e.g: scr/components/module-name/ModuleName.jsx .*

- /src/routes
    Define your routes drawer and stack routes

- /src/screens
    ***Screens should only be used in _layouts.jsx***

- /src/themes
    Styling

- /src/ui
    Non modular components

- /src/ui/core
    *Should avoid using directly outside src/ui components*

- /src/ui/*shared components
    Second layer shareable components.
    ***Note:** For components that has sub components on it's own, has it's own folder and non-shareable components.*

:sweat_smile: To be continue.. :sweat_smile:
