# Angular Playwright Demo App - AI Development Guide

This guide provides essential context for AI agents working with this Angular application. 

## Project Overview

- Modern Angular (v20) application using standalone components
- TypeScript-based with strict typing enabled
- Built with Angular CLI
- Uses Angular's default routing and dependency injection

## Key Architecture Patterns

### Component Structure
- Root component (`App`) in `src/app/app.ts` using standalone architecture
- Template-driven development with separate HTML templates (e.g., `app.html`)
- Uses Angular's signals for state management (see `title` signal in `App` class)

### Routing
- Route configuration in `src/app/app.routes.ts`
- Router outlet setup in root component template
- Currently empty routes array - extend here for new routes

### Testing Architecture
- Karma for unit testing (`*.spec.ts` files)
- E2E testing ready but framework not specified
- Test files co-located with components

## Development Workflows

### Local Development
```bash
ng serve        # Start dev server at http://localhost:4200
ng test        # Run unit tests with Karma
ng build       # Build for production
```

### Code Generation
```bash
ng generate component my-component  # Generate new component
ng generate --help                 # See all generation options
```

### Configuration Files
- `angular.json`: Main Angular config (build, serve, test settings)
- `tsconfig.json`: TypeScript compiler options
- `package.json`: Dependencies and scripts
- `.editorconfig`: Editor formatting rules

## Project Conventions

### TypeScript Configuration
- Strict mode enabled
- No implicit returns or overrides
- Experimental decorators enabled
- ES2022 target

### Code Style
- 2 space indentation (enforced by .editorconfig)
- Single quotes for TypeScript (see Prettier config)
- Angular template format for HTML files

### Component Pattern
```typescript
@Component({
  selector: 'app-prefix',
  imports: [/* standalone imports */],
  templateUrl: './name.html',
  styleUrl: './name.css'
})
export class Name {
  // State using signals
  protected readonly state = signal<Type>(initialValue);
}
```

## Common Tasks

1. Adding a new route:
   - Add route config to `src/app/app.routes.ts`
   - Create component in `src/app/features/`
   - Import and add to routes array

2. Creating new features:
   - Generate with CLI: `ng generate`
   - Add to appropriate module/component imports
   - Create corresponding test file
   - Update routing if needed

3. Running tests:
   - Unit tests: `ng test`
   - Coverage report: `ng test --code-coverage`

## Performance Considerations

- Bundle size budgets defined in `angular.json`:
  - Initial bundle: 500kB warning, 1MB error
  - Component styles: 4kB warning, 8kB error
- Source maps enabled in development