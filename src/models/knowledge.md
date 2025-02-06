# Models

## Standards
- Follow ERD exactly
- Use TypeScript interfaces
- Mark undecided data types as `any`
- Use UUID for IDs (via uuid package)
- Use ISO8601 strings for dates
- Mark optional fields with ?
- Include relationship fields as optional arrays/objects
- Use discriminated unions with `locationType` field for Location hierarchy

## Relationships
- Store IDs instead of embedding full objects
- For polymorphic fields (e.g. Location), store id and type discriminator
- Many-to-many: store ID arrays on both sides (e.g. User-Calendar)
- One-to-many: parent holds childIds array (e.g. Campus-Building-Floor hierarchy)
- One-to-one: each side has other's ID (or just one side if ownership is clear)
- All Location-related entities have locationId FK
- Let application layer handle object resolution
- Avoid circular dependencies by keeping models flat

## NoSQL Design

### Nesting Rules
- Nest child documents when:
  - Always accessed together
  - Rarely updated independently  
  - Size is bounded
  - Not shared across parents

- Keep as separate documents when:
  - Frequently updated independently
  - Shared across multiple parents
  - Size could grow large
  - Many-to-many relationships

### Specific Recommendations
- Building -> Floor -> Room: Nest floors and rooms in building
  - Usually accessed together when viewing building
  - Updates are infrequent
  - Size is bounded
  - Strong parent-child relationship

- User -> Calendar -> Event: Keep separate
  - Events updated frequently
  - Events shared across calendars
  - Many-to-many relationships
  - Size grows over time

- Location hierarchy: Keep separate with type discriminator
  - Complex polymorphic relationships
  - Referenced by multiple entities
  - Needed for flexible querying
  - Used independently in routing

- POIs: Keep separate from locations
  - Frequently updated (descriptions, ratings)
  - Need independent querying
  - May be referenced by multiple entities

### Implementation Notes
- Use discriminator fields for polymorphic types
- Store IDs instead of embedding for many-to-many
- Consider denormalization for frequent reads
- Index heavily accessed fields

## Authentication
- Use JWT for auth tokens
- Tokens expire in 24h
- Use secure verification with jsonwebtoken package
