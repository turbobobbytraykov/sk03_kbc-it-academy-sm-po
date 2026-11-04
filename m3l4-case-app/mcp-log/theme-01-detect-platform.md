# igniteui-theming / detect_platform

Called 2026-11-01T21:20:05.436Z

## Arguments

```json
{}
```

## Result

## Platform Detection Result

**Status:** Ambiguous - Multiple platforms detected

The project appears to contain dependencies for multiple Ignite UI platforms. This might be a monorepo or a project transitioning between frameworks.

### Detected Platforms

#### Ignite UI for Angular
- **Confidence:** 100%
- **Signals:** package: igniteui-angular, config: angular.json
- **Theming module:** `igniteui-angular/theming`

#### Ignite UI for Web Components
- **Confidence:** 100%
- **Signals:** package: igniteui-webcomponents
- **Theming module:** `igniteui-theming`

### Action Required

Please specify the platform explicitly when calling theme generation tools:

- Use `platform: 'angular'` for Ignite UI for Angular
- Use `platform: 'webcomponents'` for Ignite UI for Web Components
