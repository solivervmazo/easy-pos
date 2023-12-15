# Easy-POS

    This project is intented for learning react-native and other relatead stack.

# Build Status

    On-Going

# Tech

    -- Workflow: React-Expo
    -- State management: redux/redux @reduxjs/toolkit
    -- Input validator: yup react-hook-form @hookform/resolvers
    -- Toast: react-native-toast-notifications

# File structure

```
├───app
│   ├───*grouped feature
│   ├───*features
│   │  ├───*feature routes
│   ├───(drawer)
│   │   ├───(*drawer route)
│   │   │   ├───*drawer sub routes
|   |   |   |   ├───_layout.jsx
|   |   |   |   ├───index.jsx
│   │   ├───_layout.jsx
│   ├───_layout.jsx
│   ├───index.jsx
├───assets
│   ├───fonts
│   └───imgs
├───src
│   ├───context-manager
│   ├───enums
│   ├───features
│   │   ├───*feature
│   │   │   ├───constants/
│   │   │   ├───context/
│   │   │   ├───db/
│   │   │   ├───api/
│   │   │   ├───layouts/
│   │   │   ├───modals/
│   │   │   ├───screens/
│   │   │   ├───store/
│   │   │   ├───styles/
│   │   │   ├───ui/
│   │   │   ├───validator/
│   │   │   ├───index.jsx
│   ├───my-app
│   ├───locale
│   ├───routes
│   │   ├───index.jsx
│   │   ├───routes.jsx
│   ├───store
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
    ***Note:*** *Use \*LayoutComponents from **features/\*feature/layouts/** in each _layout.jsx .*

- /app/*features
    Uses Stack Navigation otherwise (drawer)
    ***Note:*** *Use ScreensComponents from **src/features/\*features/** in each _layout.jsx .*

- /app/(drawer)/(*drawer route)
    Completely unrelated to features, you can set drawer routes in *src/routes/routes.jsx*.
    *Use **_layout.jsx** to define your Drawer.Screen*
    ***Note:*** *Use ScreensComponents from **src/screens/** in each _layout.jsx .*

- /app/(drawer)/(*drawer route)/*drawer sub routes
    It is important to consider adding *_layout.js* for drawer to ignore subroutes, Since the structure is planning to use Stack Navigation for the rest of the app, otherwise drawer for main navigation.
    ***Note:*** *Use ScreensComponents from **src/screens/** in each _layout.jsx .*

- /assets
    Static assets

- /src
    main soruce folder

- /src/my-app/
    Worked like feature excepts that most of its component is shared across the features
    ***/factory/*** - components factory, components that is repetitive accross the features like Forms, Modals, etc
    
- /src/features
    Grouped features/sub features

- /src/features/*feature
    ***/constants/*** - constants
    ***/context*** - uses context-manager and middlewares to get data from either SQLite or Api 
    ***/db/*** - Sql queries and functions
    ***/api/*** - Api 
    ***/layouts/\*.jsx*** - To be strictly used in _layout.jsx, use direct import when used
    ***/modals/*** - Screen components that serves as modals  
    ***/screens/\*.jsx*** - Use direct import when used
    ***/store/*** - Redux state management
    ***/styles/*** - Common styles inside the grouped feature  
    ***/ui/\*.jsx*** *- 1st layer components inside for feature-specific. non shareable*
    ***/shared/\*.jsx*** *- 2nd layer components inside for feature-specific, import in index.jsx*

- /src/routes
    Define your routes drawer and stack routes

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
