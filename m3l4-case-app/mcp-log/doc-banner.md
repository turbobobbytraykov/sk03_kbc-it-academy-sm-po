# igniteui-cli / get_doc

Called 2026-11-01T21:20:18.969Z

## Arguments

```json
{
  "framework": "angular",
  "name": "banner"
}
```

## Result

---
component: IgxBannerComponent, IgxNavbarComponent, IgxIconComponent, IgxCardComponent, IgxBannerActionsDirective, IgxButtonDirective, IgxRippleDirective, IgxToastComponent
toc_name: Banner
keywords: banner, notification, message, actions, icon, animation, events, theming
summary: Learn to display and customize banners with messages, icons, custom actions, animations, and event handling. Includes an advanced network-status example and theming guidance.
---

# Angular Banner Component Overview

The Banner displays a prominent message that is less transient than a snackbar and less obtrusive than a dialog. It can include custom actions and an icon.

## Angular Banner Example

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxBannerComponent } from 'igniteui-angular/banner';
import { IgxNavbarComponent } from 'igniteui-angular/navbar';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxCardComponent } from 'igniteui-angular/card';

@Component({
    selector: 'app-banner-sample-1',
    styleUrls: ['../banner-samples.scss'],
    templateUrl: 'banner-sample-1.component.html',
    imports: [IgxNavbarComponent, IgxIconComponent, IgxBannerComponent, IgxCardComponent]
})
export class BannerSample1Component implements OnInit {
    @ViewChild(IgxBannerComponent, { static: true }) public banner: IgxBannerComponent;
    public contentWidth = '384px';
    public imageUrls = ['assets/images/card/media/the_red_ice_forest.jpg',
        // ...
    ];
    public ngOnInit() {
        this.banner.open();
    }
}
```

```html
<div class="gallery__wrapper">
    <div class="gallery__content">
        <igx-navbar title="Gallery">
            <igx-icon (click)="connectionBanner.open()">refresh</igx-icon>
        </igx-navbar>
        <igx-banner class="offline-banner" #connectionBanner>
            You are currently offline.
        </igx-banner>
        <igx-card class="gallery__item" elevated>
            <div>
                <img [src]="imageUrls[0]">
            </div>
        </igx-card>
        <!-- ... additional card -->
    </div>
</div>
```

<hr/>

## Getting Started with Ignite UI for Angular Banner

Install Ignite UI for Angular in an existing application:

```cmd
ng add igniteui-angular
```

See the [_getting started_](./general/getting-started.md) topic for an introduction.

Import `IgxBannerModule` in **app.module.ts**:

```typescript
// app.module.ts
...
import { IgxBannerModule } from 'igniteui-angular/banner';
// import { IgxBannerModule } from '@infragistics/igniteui-angular'; for licensed package

@NgModule({
    ...
    imports: [..., IgxBannerModule],
    ...
})
export class AppModule {}
```

Alternatively, since `16.0.0`, import `IgxBannerComponent` as a standalone dependency or use `IGX_BANNER_DIRECTIVES` to import the component and its supporting components and directives.

```typescript
// home.component.ts
...
import { IGX_BANNER_DIRECTIVES } from 'igniteui-angular/banner';
// import { IGX_BANNER_DIRECTIVES } from '@infragistics/igniteui-angular'; for licensed package

@Component({
    selector: 'app-home',
    template: `
    <igx-banner>
        You are currently offline.
    </igx-banner>
    `,
    styleUrls: ['home.component.scss'],
    standalone: true,
    imports: [IGX_BANNER_DIRECTIVES]
    /* or imports: [IgxBannerComponent] */
})
export class HomeComponent {}
```

**Note:** This component uses Material Icons. Add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` to `index.html`.

## Using the Angular Banner Component

### Show Banner

Call [`open()`](mcp:get_api_reference?platform=angular&component=IgxBannerComponent&member=open), for example in response to a button click. The banner appears where it was inserted in the template and moves other content. The default `Dismiss` button closes it.

```html
{/*banner.component.html*/}
<igx-icon (click)="connectionBanner.open()">refresh</igx-icon>
...
<igx-banner #connectionBanner>
    You are currently offline.
</igx-banner>
```

## Examples

[`IgxBanner`](mcp:get_api_reference?platform=angular&component=IgxBannerComponent) supports templated content while following Material Design banner guidelines.

### Changing the banner message

Change the content passed to the `igx-banner` tag:

```html
{/*banner.component.html*/}
<igx-banner #connectionBanner>
    You have lost connection to the internet. This app is offline.
</igx-banner>
```

### Adding an icon

Insert an [`igx-icon`](./icon.md) directly into the banner to position it before the message.

**Note:** If several `igx-icon` elements are direct descendants, the banner positions all of them at the beginning. It is strongly advised to pass only one directly to the banner. To use an icon within the message, wrap it in a `span`.

```html
{/*banner.component.html*/}
<igx-banner #connectionBanner>
    <igx-icon>signal_wifi_off</igx-icon>
    You have lost connection to the internet. This app is offline.
</igx-banner>
```

```html
{/*banner.component.html*/}
<igx-banner #connectionBanner>
    You have lost connection to the internet. This app is offline.
    <span>
        <igx-icon>signal_wifi_off</igx-icon>
    </span>
</igx-banner>
```

### Changing the banner button

[`IgxBannerActionsDirective`](mcp:get_api_reference?platform=angular&component=IgxBannerActionsDirective) lets you replace the default `Dismiss` button and add custom actions.

```html
{/*banner.component.html*/}
<igx-banner #connectionBanner>
    <igx-icon>signal_wifi_off</igx-icon>
    You have lost connection to the internet. This app is offline.
    <igx-banner-actions>
        <button igxButton igxRipple (click)="connectionBanner.toggle()">Toggle Banner</button>
    </igx-banner-actions>
</igx-banner>
```

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxBannerActionsDirective, IgxBannerComponent } from 'igniteui-angular/banner';
import { IgxNavbarComponent } from 'igniteui-angular/navbar';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';
import { IgxCardComponent } from 'igniteui-angular/card';

@Component({
    selector: 'app-banner-sample-2',
    styleUrls: ['../banner-samples.scss'],
    templateUrl: 'banner-sample-2.component.html',
    imports: [IgxNavbarComponent, IgxIconComponent, IgxBannerComponent, IgxBannerActionsDirective, IgxButtonDirective, IgxRippleDirective, IgxCardComponent]
})
export class BannerSample2Component implements OnInit {
    @ViewChild(IgxBannerComponent, { static: true }) public banner: IgxBannerComponent;
    public contentWidth = '384px';
    public imageUrls = ['assets/images/card/media/the_red_ice_forest.jpg',
        // ...
    ];

    public ngOnInit() {
        this.banner.open();
    }
}
```

```html
<div class="gallery__wrapper">
    <div class="gallery__content">
        <igx-navbar title="Gallery">
            <igx-icon (click)="connectionBanner.open()">refresh</igx-icon>
        </igx-navbar>
        <igx-banner class="offline-banner" #connectionBanner>
            <igx-icon>signal_wifi_off</igx-icon>
            You have lost connection to the internet. This app is offline.
            <igx-banner-actions>
                <button igxButton igxRipple (click)="connectionBanner.toggle()">Toggle Banner</button>
            </igx-banner-actions>
        </igx-banner>
        <igx-card class="gallery__item" elevated>
            <div>
                <img [src]="imageUrls[0]">
            </div>
        </igx-card>
        <!-- ... additional card -->
    </div>
</div>
```

### Applying custom animations

Use [`animationSettings`](mcp:get_api_reference?platform=angular&component=IgxBannerComponent&member=animationSettings) to specify custom opening and closing animations. The defaults are `growVerIn` and `growVerOut`; the example uses `slideInLeft` and `slideOutRight`.

```html
{/*banner.component.html*/}
<igx-banner #connectionBanner [animationSettings]="animationSettings">
    ...
</igx-banner>
```

```typescript
// banner.component.ts
import { IgxBannerComponent } from 'igniteui-angular/banner';
import { slideInLeft, slideOutRight } from 'igniteui-angular/animations'
// import { IgxBannerComponent, slideInLeft, slideOutRight } from '@infragistics/igniteui-angular'; for licensed package
...
export class MyBannerComponent {
    ...
    public animationSettings = {
        openAnimation: slideInLeft,
        closeAnimation: slideOutRight
    }
    ...
}
```

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxBannerActionsDirective, IgxBannerComponent } from 'igniteui-angular/banner';
import { IgxNavbarComponent } from 'igniteui-angular/navbar';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';
import { IgxCardComponent } from 'igniteui-angular/card';
import { slideInLeft, slideOutRight } from 'igniteui-angular/animations';

@Component({
    selector: 'app-banner-sample-3',
    styleUrls: ['../banner-samples.scss'],
    templateUrl: 'banner-sample-3.component.html',
    imports: [IgxNavbarComponent, IgxIconComponent, IgxBannerComponent, IgxBannerActionsDirective, IgxButtonDirective, IgxRippleDirective, IgxCardComponent]
})
export class BannerSample3Component implements OnInit {
    @ViewChild(IgxBannerComponent, { static: true }) public banner: IgxBannerComponent;
    public contentWidth = '384px';
    public imageUrls = ['assets/images/card/media/the_red_ice_forest.jpg',
        // ...
    ];
    public animationSettings = {
        closeAnimation: slideOutRight,
        openAnimation: slideInLeft
    };

    public ngOnInit() {
        this.banner.open();
    }
}
```

```html
<div class="gallery__wrapper">
    <div class="gallery__content">
        <igx-navbar title="Gallery">
            <igx-icon (click)="connectionBanner.open()">refresh</igx-icon>
        </igx-navbar>
        <igx-banner class="offline-banner" #connectionBanner [animationSettings]="animationSettings">
            <igx-icon>signal_wifi_off</igx-icon>
            You have lost connection to the internet. This app is offline.
            <igx-banner-actions>
                <button igxButton igxRipple (click)="connectionBanner.close()">Close</button>
            </igx-banner-actions>
        </igx-banner>
        <igx-card class="gallery__item" elevated>
            <div>
                <img [src]="imageUrls[0]">
            </div>
        </igx-card>
        <!-- ... additional card -->
    </div>
</div>
```

### Binding to events

The banner emits `opening` and `opened` when shown, and `closing` and `closed` when closed. The `opening` and `closing` events are cancelable through `ICancelEventArgs`; setting `cancel` to `true` prevents the corresponding action from completing. For example, canceling `opening` prevents `open()` from showing the banner.

```html
{/*banner.component.html*/}
<igx-banner #connectionBanner (opening)="handleOpen($event)">
    ...
</igx-banner>
```

```typescript
// banner.component.ts
...
export class MyBannerComponent {
    ...
    public handleOpen(event) {
        event.cancel = true;
    }
}
```

**Note:** With this handler, the opening event is always canceled, so the banner never opens.

## Advanced Example

This example provides actions to dismiss the notification or turn on the connection:

```html
{/*banner.component.html*/}
<igx-banner class="offline-banner" #connectionBanner [animationSettings]="animationSettings">
    <igx-icon>signal_wifi_off</igx-icon>
        You have lost connection to the internet. This app is offline.
    <igx-banner-actions>
        <button igxButton igxRipple (click)="connectionBanner.close()">Continue Offline</button>
        <button igxButton igxRipple (click)="wifiState = true">Turn On Wifi</button>
    </igx-banner-actions>
</igx-banner>
```

**Note:** Material Design recommends no more than two buttons per banner. `IgxBannerComponent` does not enforce this limit, but using up to two actions is strongly recommended.

The `Continue Offline` action calls `close()`. The `Turn On Wifi` action updates `wifiState`; an `onNetworkStateChange` Observable then calls `refreshBanner()`, which toggles the banner. The navbar icon also reflects the connection state.

```html
{/*banner.component.html*/}
<igx-navbar title="Gallery">
    <igx-icon (click)="wifiState = !wifiState">
        {{ wifiState ? 'signal_wifi_4_bar' : 'signal_wifi_off' }}
    </igx-icon>
</igx-navbar>
```

The [`IgxToast`](mcp:get_api_reference?platform=angular&component=IgxToastComponent) displays the WiFi state:

```typescript
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IgxBannerActionsDirective, IgxBannerComponent } from 'igniteui-angular/banner';
import { IgxToastComponent } from 'igniteui-angular/toast';
import { VerticalAlignment } from 'igniteui-angular/core';
import { IgxNavbarComponent } from 'igniteui-angular/navbar';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';
import { IgxCardComponent } from 'igniteui-angular/card';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-banner-advanced-sample',
    styleUrls: ['../banner-samples.scss'],
    templateUrl: 'banner-advanced-sample.component.html',
    imports: [IgxNavbarComponent, IgxIconComponent, IgxBannerComponent, IgxBannerActionsDirective, IgxButtonDirective, IgxRippleDirective, IgxCardComponent, IgxToastComponent]
})
export class BannerAdvancedSampleComponent implements OnInit, OnDestroy {
    @ViewChild(IgxBannerComponent, { static: true }) public banner: IgxBannerComponent;
    @ViewChild(IgxToastComponent, { static: true }) public eventToast: IgxToastComponent;
    public contentWidth = '384px';
    public imageUrls = ['assets/images/card/media/the_red_ice_forest.jpg',
        // ...
    ];
    public onNetworkStateChange = new Subject<void>();

    private _wifiState = false;
    public get wifiState(): boolean {
        return this._wifiState;
    }
    public set wifiState(v: boolean) {
        this._wifiState = v;
        this.onNetworkStateChange.next();
    }

    public showToast() {
        this.eventToast.close();
        this.eventToast.positionSettings.verticalDirection = VerticalAlignment.Middle;
        this.eventToast.open(`Wifi is now ${this.wifiState ? 'on' : 'off'}`);
    }

    public ngOnInit() {
        this.banner.open();
        this.onNetworkStateChange.subscribe(() => this.refreshBanner());
    }

    public ngOnDestroy(): void {
        this.onNetworkStateChange.complete();
    }

    public refreshBanner() {
        if (!this.wifiState) {
            this.banner.open();
        } else {
            if (!this.banner.collapsed) {
                this.banner.close();
            }
        }
        this.showToast();
    }
}
```

```html
<div class="gallery__wrapper">
    <div class="gallery__content">
        <igx-navbar title="Gallery">
            <igx-icon (click)="wifiState = !wifiState">{{ wifiState ? 'signal_wifi_4_bar' : 'signal_wifi_off' }}</igx-icon>
        </igx-navbar>
        <igx-banner class="offline-banner" #connectionBanner>
            <igx-icon>signal_wifi_off</igx-icon>
            You have lost connection to the internet. This app is offline.
            <igx-banner-actions>
                <button igxButton igxRipple (click)="connectionBanner.close()">Continue Offline</button>
                <button igxButton igxRipple (click)="wifiState = true">Turn On Wifi</button>
            </igx-banner-actions>
        </igx-banner>
        <igx-card class="gallery__item" elevated>
            <div>
                <img [src]="imageUrls[0]">
            </div>
        </igx-card>
        <!-- ... additional card -->
        <igx-toast #eventToast></igx-toast>
    </div>
</div>
```

## Styling

Import the theming index to use theme-engine functions:

```scss
@use "igniteui-angular/theming" as *;

// IMPORTANT: Prior to Ignite UI for Angular version 13 use:
// @import '~igniteui-angular/lib/core/styles/themes/index';
```

Create a theme extending `banner-theme`. Based on `$banner-background`, `$banner-message-color` and `$banner-illustration-color` are automatically set to provide contrast.

```scss
$custom-banner-theme: banner-theme(
  $banner-background: #011627,
);
```

**Note:** Use the `palette` and `color` functions instead of hardcoded colors for greater flexibility. See [`Palettes`](./themes/sass/palettes.md).

Apply the custom theme:

```scss
:host {
    @include tokens($custom-banner-theme);
}
```

```typescript
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IgxBannerActionsDirective, IgxBannerComponent } from 'igniteui-angular/banner';
import { IgxToastComponent } from 'igniteui-angular/toast';
import { VerticalAlignment } from 'igniteui-angular/core';
import { IgxNavbarComponent } from 'igniteui-angular/navbar';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';
import { IgxCardComponent } from 'igniteui-angular/card';
import { slideInLeft, slideOutRight } from 'igniteui-angular/animations';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-banner-styling',
    styleUrls: ['banner-styling.component.scss', '../banner-samples.scss'],
    templateUrl: 'banner-styling.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [IgxNavbarComponent, IgxIconComponent, IgxBannerComponent, IgxBannerActionsDirective, IgxButtonDirective, IgxRippleDirective, IgxCardComponent, IgxToastComponent]
})
export class BannerStylingComponent implements OnInit, OnDestroy {
    @ViewChild(IgxBannerComponent, { static: true }) public banner: IgxBannerComponent;
    @ViewChild(IgxToastComponent, { static: true }) public eventToast: IgxToastComponent;
    public contentWidth = '384px';
    public imageUrls = ['assets/images/card/media/the_red_ice_forest.jpg',
        // ...
    ];
    public animationSettings = {
        closeAnimation: slideOutRight,
        openAnimation: slideInLeft
    };
    public onNetworkStateChange = new Subject<void>();
    private _wifiState = false;

    public get wifiState(): boolean {
        return this._wifiState;
    }
    public set wifiState(v: boolean) {
        this._wifiState = v;
        this.onNetworkStateChange.next();
    }

    public showToast() {
        this.eventToast.close();
        this.eventToast.positionSettings.verticalDirection = VerticalAlignment.Middle;
        this.eventToast.open(`Wifi is now ${this.wifiState ? 'on' : 'off'}`);
    }

    public ngOnInit() {
        this.banner.open();
        this.onNetworkStateChange.subscribe(() => this.refreshBanner());
    }

    public ngOnDestroy(): void {
        this.onNetworkStateChange.complete();
    }

    public refreshBanner() {
        if (!this.wifiState) {
            this.banner.open();
        } else {
            this.banner.close();
        }
        this.showToast();
    }
}
```

```html
<div class="gallery__wrapper">
    <div class="gallery__content">
        <igx-navbar title="Gallery">
            <igx-icon (click)="wifiState = !wifiState">{{ wifiState ? 'signal_wifi_4_bar' : 'signal_wifi_off'}}
            </igx-icon>
        </igx-navbar>
        <igx-banner class="offline-banner" #connectionBanner [animationSettings]="animationSettings">
            <igx-icon>signal_wifi_off</igx-icon>
            You have lost connection to the internet. This app is offline.
            <igx-banner-actions>
                <button igxButton igxRipple (click)="connectionBanner.close()">Continue Offline</button>
                <button igxButton igxRipple (click)="wifiState = true">Turn On Wifi</button>
            </igx-banner-actions>
        </igx-banner>
        <igx-card class="gallery__item" elevated>
            <div>
                <img [src]="imageUrls[0]">
            </div>
        </igx-card>
        <!-- ... additional card -->
        <igx-toast #eventToast></igx-toast>
    </div>
</div>
```

```scss
@use "igniteui-angular/theming" as *;

$custom-banner-theme: banner-theme(
  $banner-background: #011627,
);

igx-banner {
    @include tokens($custom-banner-theme);
}
```

<hr/>

## API Reference

<hr/>

- [`IgxBanner`](mcp:get_api_reference?platform=angular&component=IgxBannerComponent)
- [`IgxBannerActionsDirective`](mcp:get_api_reference?platform=angular&component=IgxBannerActionsDirective)
- `IgxBannerComponent Styles`

Additional components and directives with relative APIs used:

- [`IgxCard`](mcp:get_api_reference?platform=angular&component=IgxCardComponent)
- [`IgxIcon`](mcp:get_api_reference?platform=angular&component=IgxIconComponent)
- [`IgxNavbar`](mcp:get_api_reference?platform=angular&component=IgxNavbarComponent)
- [`IgxToast`](mcp:get_api_reference?platform=angular&component=IgxToastComponent)

## Theming Dependencies

- `IgxIcon Theme`
- `IgxButton Theme`
- `IgxRipple Theme`
- `IgxExpansionPanel Theme`

## Additional Resources

Our community is active and always welcoming to new ideas.

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)
