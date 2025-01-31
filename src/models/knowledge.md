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
- Use UUID for IDs

## ViewModels
- Extend BaseViewModel
- Handle loading and error states
- Contain business logic
- Use repositories for data access

## Repositories
- Implement BaseRepository interface
- Handle API errors consistently
- Include domain-specific methods
- Placeholder implementations until backend is ready

## Best Practices
- Don't make assumptions about undecided data types
- Keep ViewModels focused on single responsibility
- Handle errors consistently
- Use TypeScript for type safety
- Use established libraries for cryptographic operations (uuid, crypto, etc.) instead of custom implementations
- Combine multiple imports from the same module into a single import statement
- Mark class members as readonly when they're not reassigned
- Keep type aliases that add semantic value, even if they alias primitive types
- Avoid redundant React imports when using TypeScript with React 17+
- Use consistent import style: group imports by source, one line per import statement
- ViewModels can compose other ViewModels (e.g. MapViewModel using RouteViewModel)
- Complex state should use interfaces (e.g. MapState, RouteState)
- Indoor/outdoor navigation should be handled by separate ViewModels but coordinated by MapViewModel
- Use mode flags (e.g. isIndoorMode) to determine active navigation context
=======
- Combine multiple imports from the same module into a single import statement
- Mark class members as readonly when they're not reassigned
- Keep type aliases that add semantic value, even if they alias primitive types
- Avoid redundant React imports when using TypeScript with React 17+
- Use consistent import style: group imports by source, one line per import statement
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

## UI Standards
- Use GlueStack UI components exclusively
- No inline styles allowed
- No custom CSS classes - use GlueStack's built-in props
- Use GlueStack's theme tokens for consistency
- Keep custom components to absolute minimum
- Extend GlueStack components when needed

## GlueStack Component Usage
- Box: For layout containers
- Center: For centering content
- VStack/HStack: For flex layouts
- Text: For all text content with size prop
- Fab: For floating action buttons
- Overlay: For modal/loading overlays
- Use theme tokens ($) for spacing, colors, and typography

## GlueStack Component Usage
- Box: For layout containers
- Center: For centering content
- VStack/HStack: For flex layouts
- Text: For all text content with size prop
- Fab: For floating action buttons
- Overlay: For modal/loading overlays
- Use theme tokens ($) for spacing, colors, and typography
