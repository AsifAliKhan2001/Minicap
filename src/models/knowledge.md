# MVVM Architecture

## UI Framework
- Using GlueStack UI for components
- Components follow GlueStack UI's style system
- Use GlueStack's built-in theme tokens for consistency
- MapView from react-native-maps doesn't accept NativeBase style props directly

## Package Versions
- expo ~52.0.28
- expo-linking ~7.0.5
- react-native-maps 1.18.0
- @gluestack-ui/themed ^1.1.65

## Models
- Follow ERD exactly
- Use TypeScript interfaces
- Mark undecided data types as `any`
- Use UUID for IDs (via uuid package)
- Use ISO8601 strings for dates
- Mark optional fields with ?
- Include relationship fields as optional arrays/objects

## ViewModels
- Extend BaseViewModel
- Handle loading and error states
- Contain business logic
- Use repositories for data access
- Keep empty implementations until backend is ready

## Repositories
- Implement BaseRepository interface
- Handle API errors consistently
- Include domain-specific methods
- Use placeholder implementations until backend is ready
- Return hardcoded IDs for now (e.g. '1', '2')

## Best Practices
- Don't make assumptions about undecided data types
- Keep ViewModels focused on single responsibility
- Handle errors consistently
- Use TypeScript for type safety
- ViewModels can compose other ViewModels (e.g. MapViewModel using RouteViewModel)
- Complex state should use interfaces (e.g. MapState, RouteState)
- Indoor/outdoor navigation should be handled by separate ViewModels but coordinated by MapViewModel
- Use mode flags (e.g. isIndoorMode) to determine active navigation context

## TODO
- Decide on data types marked with "?" in ERD
- Implement backend API
- Add more specific repository methods as needed
- Add caching strategy if needed

## MVP Approach
- Start with minimal viable features
- CampusMap initially only shows basic map view
- Additional features (POIs, routing, indoor navigation) to be added incrementally
- Initial map centered on Concordia (45.495, -73.578)

## GlueStack UI Migration Notes
- Use GlueStack UI's theme tokens ($) for consistent styling
- Keep React Native's core components (View) for basic layout
- GlueStack components (Box, Text, etc.) for styled elements
- Use SelectTrigger/SelectContent pattern for dropdowns
- ButtonText component required inside Button for text content
