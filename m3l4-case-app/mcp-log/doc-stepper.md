# igniteui-cli / get_doc

Called 2026-11-01T21:20:19.099Z

## Arguments

```json
{
  "framework": "angular",
  "name": "stepper"
}
```

## Result

---
component: IgxStepper, IgxStepperComponent, IgxStepComponent, IgxStepTitleDirective, IgxStepContentDirective, IgxCardComponent, IgxBadgeComponent, IgxInputGroupComponent, IgxInputDirective, IgxLabelDirective, IgxSelectComponent, IgxSelectItemComponent, IgxCheckboxComponent, IgxRadioGroupDirective, IgxRadioComponent, IgxButtonDirective
toc_name: Stepper
keywords: stepper, wizard, workflow, navigation, validation, linear, orientation, keyboard navigation, forms
summary: Learn to build multi-step workflows with the Stepper, including step states, validation, orientation, navigation, animations, and styling. Examples show template-driven and reactive forms, customization, and theming.
---

# Angular Stepper Component Overview

The Ignite UI for Angular Stepper visualizes a process as successive steps in a horizontal or vertical layout. It supports wizard-like workflows with validation, customizable styling, and keyboard navigation.

## Angular Stepper Example

This example shows a five-step credit card application. The shipping step is enabled only when the user selects a different mailing address.

```typescript
import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { IgxStepComponent, IgxStepContentDirective, IgxStepTitleDirective, IgxStepperComponent } from 'igniteui-angular/stepper';

@Component({
    selector: 'app-stepper-overview-sample',
    templateUrl: './stepper-overview-sample.component.html',
    imports: [IgxStepperComponent, IgxStepComponent, IgxStepTitleDirective, IgxStepContentDirective, FormsModule]
})
export class StepperOverviewSampleComponent {
    private cdr = inject(ChangeDetectorRef);

    @ViewChild('stepper', { static: true })
    public stepper: IgxStepperComponent;

    public cards: any[] = [
        { img: 'assets/images/stepper/card-gold.png', price: 400, offer: 'STATEMENT CREDIT OFFER', type: 'Business Customized Advanced', description: 'Cash Mastercard' },
        // ...
    ];
    public states: string[] = ['Alabama', 'Arizona', 'California', 'Colorado', 'Florida', /* ... */];

    public selectedCard: any;
    public businessInformation: any = { name: '', physicalAddress: '', city: '', state: '', zip: null, taxIdNumber: null, differentAddress: false, nonUSBusinessActivity: null };
    public personalInformation: any = { firstName: '', lastName: '', jobTitle: '', phoneNumber: '', email: '', authorization: false, agreementAccepted: false };
    public shippingDetails: any = { firstName: '', lastName: '', mailingAddress: '', city: '', state: '', zip: null };

    public selectCard(card: any): void {
        this.selectedCard = card;
        this.cdr.detectChanges();
        this.stepper.next();
    }

    public resetStepper(form1: NgForm, form2: NgForm, form3: NgForm): void {
        this.stepper.reset();
        this.selectedCard = null;
        form1.reset();
        this.businessInformation.differentAddress = false;
        form2.reset();
        this.personalInformation.authorization = false;
        this.personalInformation.agreementAccepted = false;
        form3.reset();
    }

    public handleKeyDown(evt: KeyboardEvent, card: any): void {
        if (evt.key.toLowerCase() === ' ' || evt.key.toLowerCase() === 'spacebar' || evt.key.toLowerCase() === 'space') {
            this.selectCard(card);
        }
    }
}
```

```html
<igx-stepper #stepper [linear]="true">
  <igx-step #step1 [isValid]="!!selectedCard" [completed]="!!selectedCard">
    <span igxStepTitle>Card Type</span>
    <div igxStepContent [tabIndex]="-1">
      <div class="card-wrapper">
        @for (card of cards; track card) {
          <igx-card (click)="selectCard(card)"
            [ngClass]="{'selected-card': selectedCard === card}" [tabIndex]="0"
            (keydown)="handleKeyDown($event, card)" elevated>
            @if (selectedCard === card) {
              <igx-badge value="Your current choice"></igx-badge>
            }
            <igx-card-media><img src="{{card.img}}" alt=""></igx-card-media>
            <igx-card-content>
              <span class="card-currency">{{card.price}}</span>
              <span class="card-title">{{card.offer}}</span>
              <p>{{card.type}}</p>
              <p>{{card.description}}</p>
            </igx-card-content>
          </igx-card>
        }
      </div>
    </div>
  </igx-step>

  <igx-step #step2 [isValid]="businessInformationForm.form.valid" [completed]="businessInformationForm.form.valid">
    <span igxStepTitle>Business information</span>
    <div igxStepContent [tabIndex]="-1">
      <form #businessInformationForm="ngForm">
        <igx-input-group type="box">
          <input igxInput name="name" id="name" type="text" [(ngModel)]="businessInformation.name" required />
          <label igxLabel for="name">Legal Business Name</label>
        </igx-input-group>
        <igx-checkbox name="differentAddress" [(ngModel)]="businessInformation.differentAddress">
          The mailing address is different than the business physical address
        </igx-checkbox>
      </form>
      <!-- ... additional business fields and steps -->
    </div>
  </igx-step>
  <!-- ... additional steps -->
</igx-stepper>
```

```scss
@use '../../../../variables' as *;

$sample-gap: 20px;
.sample-step-actions,
.card-wrapper,
.sample-row,
.flex-form,
.form-row,
.success-message,
.success-text {
	display: flex;
}

.selected-card {
	border: 2px solid color($default-palette, 'primary', 400);
	position: relative;
	overflow: initial;
}

.sample-required {
	color: color($default-palette, 'error');
	margin-left: rem(2px);
}

/* ... additional sample styles */
```

The reactive-forms version uses `FormGroup` and `FormControl` in place of `ngModel`.

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IgxStepComponent, IgxStepContentDirective, IgxStepTitleDirective, IgxStepperComponent } from 'igniteui-angular/stepper';

export interface BusinessInformation {
    name: FormControl<string | null>,
    physicalAddress: FormControl<string | null>,
    city: FormControl<string | null>,
    state: FormControl<string[] | null>,
    zip: FormControl<number | null>,
    taxIdNumber: FormControl<number | null>,
    differentAddress: FormControl<boolean | null>,
    nonUSBusinessActivity: FormControl<boolean | null>
}

@Component({
    selector: 'app-stepper-sample-reactive-forms',
    templateUrl: './stepper-sample-reactive-forms.component.html',
    imports: [IgxStepperComponent, IgxStepComponent, IgxStepTitleDirective, IgxStepContentDirective]
})
export class StepperSampleReactiveFormsComponent {
    @ViewChild('stepper', { static: true })
    public stepper: IgxStepperComponent;

    public states: string[] = ['Alabama', 'Arizona', 'California', 'Colorado', 'Florida', /* ... */];
    public selectedCard: any;
    public businessInformation: FormGroup<BusinessInformation>;

    constructor() {
        this.businessInformation = new FormGroup<BusinessInformation>({
            name: new FormControl('', Validators.required),
            physicalAddress: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl(this.states, Validators.required),
            zip: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{5}")]),
            taxIdNumber: new FormControl(null, [Validators.required,Validators.pattern("[9]{1}[0-9]{8}")]),
            differentAddress: new FormControl(false, Validators.required),
            nonUSBusinessActivity: new FormControl(null, Validators.required)
        })
    };
}
```

```html
<igx-stepper #stepper [linear]="true">
  <igx-step #step1 [isValid]="!!selectedCard" [completed]="!!selectedCard">
    <span igxStepTitle>Card Type</span>
    <div igxStepContent [tabIndex]="-1">
      <!-- ... card selection -->
    </div>
  </igx-step>
  <igx-step #step2 [isValid]="businessInformation.valid" [completed]="businessInformation.valid">
    <span igxStepTitle>Business information</span>
    <div igxStepContent [tabIndex]="-1">
      <form [formGroup]="businessInformation">
        <igx-input-group type="box">
          <input igxInput name="name" id="name" type="text" formControlName="name" required/>
          <label igxLabel for="name">Legal Business Name</label>
        </igx-input-group>
        <igx-checkbox name="differentAddress" formControlName="differentAddress">
          The mailing address is different than the business physical address
        </igx-checkbox>
      </form>
      <!-- ... additional fields and steps -->
    </div>
  </igx-step>
  <!-- ... additional steps -->
</igx-stepper>
```

```scss
@use '../../../../variables' as *;

$sample-gap: 20px;
.sample-step-actions,
.card-wrapper,
.sample-row,
.flex-form,
.form-row,
.success-message,
.success-text {
	display: flex;
}

/* ... additional sample styles */
```

## Getting Started with Ignite UI for Angular Stepper

Install Ignite UI for Angular in an existing application:

```cmd
ng add igniteui-angular
```

For a complete introduction, read the [_getting started_](/general/getting-started) topic.

Import `IgxStepperModule` in **app.module.ts**:

```typescript
// app.module.ts
...
import { IgxStepperModule } from 'igniteui-angular/stepper';
// import { IgxStepperModule } from '@infragistics/igniteui-angular'; for licensed package

@NgModule({
    ...
    imports: [..., IgxStepperModule],
    ...
})
export class AppModule {}
```

As of `16.0.0`, you can instead import `IgxStepperComponent` as a standalone dependency or use [`IGX_STEPPER_DIRECTIVES`](https://github.com/IgniteUI/igniteui-angular/blob/master/projects/igniteui-angular/stepper/src/stepper/public_api.ts) to import the component and supporting directives.

```typescript
// home.component.ts
import { FormsModule } from '@angular/forms';
import { IGX_STEPPER_DIRECTIVES } from 'igniteui-angular/stepper';
// import { IGX_STEPPER_DIRECTIVES } from '@infragistics/igniteui-angular'; for licensed package

@Component({
    selector: 'app-home',
    template: `<igx-stepper>
        <igx-step><p igxStepTitle>Step 1</p></igx-step>
        <igx-step><p igxStepTitle>Step 2</p></igx-step>
    </igx-stepper>`,
    styleUrls: ['home.component.scss'],
    standalone: true,
    imports: [IGX_STEPPER_DIRECTIVES, FormsModule]
    /* or imports: [IgxStepperComponent, FormsModule] */
})
export class HomeComponent {
    public task: Task;
}
```

## Using the Angular Stepper

[`IgxStep`](mcp:get_api_reference?platform=angular&component=IgxStep) represents each step in the [`IgxStepper`](mcp:get_api_reference?platform=angular&component=IgxStepper). Steps expose [`isValid`](mcp:get_api_reference?platform=angular&component=IgxStep&member=isValid), [`active`](mcp:get_api_reference?platform=angular&component=IgxStep&member=active), [`optional`](mcp:get_api_reference?platform=angular&component=IgxStep&member=optional), [`disabled`](mcp:get_api_reference?platform=angular&component=IgxStep&member=disabled), and [`completed`](mcp:get_api_reference?platform=angular&component=IgxStep&member=completed) properties.

### Declaring a Stepper

Declare steps by iterating over data or defining them statically:

```html
<igx-stepper>
    <igx-step *ngFor="let step of stepsData" [disabled]=”step.disabled”>
        <igx-icon igxStepIndicator>{{step.indicator}}</igx-icon>
        <p igxStepTitle>{{step.title}}</p>
    </igx-step>
</igx-stepper>
```

**Note:** This component uses Material Icons. Add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` to `index.html`.

```html
<igx-stepper>
    <igx-step><p igxStepTitle>Step 1</p></igx-step>
    <igx-step><p igxStepTitle>Step 2</p></igx-step>
</igx-stepper>
```

Configure each step's indicator, title, subtitle, and content with `igxStepIndicator`, `igxStepTitle`, `igxStepSubtitle`, and `igxStepContent`:

```html
<igx-stepper>
    <igx-step>
       <igx-icon igxStepIndicator>home</igx-icon>
       <p igxStepTitle>Home</p>
       <p igxStepSubtitle>Home Sub Title</p>
       <div igxStepContent>...</div>
    </igx-step>
</igx-stepper>
```

### Changing the Stepper Orientation

Set [`orientation`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=orientation) to `Horizontal` (default) or `Vertical`. For horizontal orientation, [`contentTop`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=contentTop) controls whether step content appears above the headers.

Set the orientation to `vertical` to use a vertical layout:

```html
<igx-stepper [orientation]="'vertical'">
 <igx-step>…</igx-step>
 <igx-step>…</igx-step>
</igx-stepper>
```

This example changes orientation and title position at runtime.

```typescript
import { Component } from '@angular/core';
import { IButtonGroupEventArgs, IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxStepComponent, IgxStepContentDirective, IgxStepTitleDirective, IgxStepperComponent, IgxStepperOrientation, IgxStepperTitlePosition } from 'igniteui-angular/stepper';

@Component({
    selector: 'app-stepper-label-position-and-orientation-sample',
    templateUrl: './stepper-label-position-and-orientation-sample.component.html',
    imports: [IgxButtonGroupComponent, IgxStepperComponent, IgxStepComponent, IgxStepTitleDirective, IgxStepContentDirective]
})
export class StepperLabelPositionAndOrientationSampleComponent {
    public orientation: IgxStepperOrientation = 'horizontal';
    public titlePosition: IgxStepperTitlePosition = 'bottom';
    public stepperOrientations: any[] = [
        { label: 'Horizontal', orientation: 'horizontal', selected: this.orientation === 'horizontal', togglable: true },
        { label: 'Vertical', orientation: 'vertical', selected: this.orientation === 'vertical', togglable: true }
    ];
    public stepperTitlePositions: any[] = [
        { label: 'Bottom', titlePosition: 'bottom', selected: this.titlePosition === 'bottom', togglable: true },
        // ...
    ];

    public toggleOrientation(event: IButtonGroupEventArgs): void {
        this.orientation = this.stepperOrientations[event.index].orientation;
    }

    public toggleTitlePosition(event: IButtonGroupEventArgs): void {
        this.titlePosition = this.stepperTitlePositions[event.index].titlePosition;
    }
}
```

```html
<div class="sample-split">
    <igx-buttongroup [values]="stepperTitlePositions" (selected)="toggleTitlePosition($event)"></igx-buttongroup>
    <igx-buttongroup [values]="stepperOrientations" (selected)="toggleOrientation($event)"></igx-buttongroup>
</div>
<igx-stepper #stepper [titlePosition]="titlePosition" [orientation]="orientation">
    <igx-step>
        <span igxStepTitle>Order</span>
        <div igxStepContent><button igxButton="contained" (click)="stepper.next()">NEXT</button></div>
    </igx-step>
    <!-- ... additional steps -->
</igx-stepper>
```

```scss
$sample-gap: 20px;

:host {
	display: block;
	padding: $sample-gap;
}

.sample-split,
.sample-step-actions {
	display: flex;
	gap: $sample-gap;
}
```

<hr/>

### Step States

[`IgxStepper`](mcp:get_api_reference?platform=angular&component=IgxStepper) supports four step states:

- [`active`](mcp:get_api_reference?platform=angular&component=IgxStep&member=active) identifies the displayed step. By default, the first non-disabled step is active.
- [`disabled`](mcp:get_api_reference?platform=angular&component=IgxStep&member=disabled) controls whether a step is interactable; it defaults to `false`.
- [`optional`](mcp:get_api_reference?platform=angular&component=IgxStep&member=optional) defaults to `false`. Optional steps do not need to be valid to proceed in linear mode.
- [`completed`](mcp:get_api_reference?platform=angular&component=IgxStep&member=completed) defaults to `false`; setting it changes the step header and progress-line styles.

The two-way bindable [`isValid`](mcp:get_api_reference?platform=angular&component=IgxStep&member=isValid) property sets validation logic for each step and determines whether users can proceed in linear mode. It defaults to `true`.

### Linear Stepper

The [`linear`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=linear) property controls step flow and defaults to `false`, allowing selection of any non-disabled step. When `true`, each current non-optional step must be valid before the user can proceed.

**Note:** Optional step validity is not considered when moving forward.

```typescript
import { Component } from '@angular/core';
import { IButtonGroupEventArgs, IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxStepActiveIndicatorDirective, IgxStepComponent, IgxStepContentDirective, IgxStepSubtitleDirective, IgxStepTitleDirective, IgxStepperComponent } from 'igniteui-angular/stepper';

@Component({
    selector: 'app-stepper-linear-sample',
    templateUrl: './stepper-linear-sample.component.html',
    imports: [IgxButtonGroupComponent, IgxStepperComponent, IgxStepActiveIndicatorDirective, IgxStepComponent, IgxStepTitleDirective, IgxStepContentDirective, IgxStepSubtitleDirective]
})
export class StepperLinearSampleComponent {
    public linear = false;
    public user: any = { fullName: '', email: '', city: '', street: '', city2: '', street2: '', payment: '' };
    public paymentTypes: string[] = ['PayPal (n@mail.com; 18/02/2021)', /* ... */];
    public modes: any[] = [
        { label: 'Linear', linear: true, selected: this.linear === true, togglable: true },
        { label: 'Non Linear', linear: false, selected: this.linear === false, togglable: true }
    ];

    public toggleModes(event: IButtonGroupEventArgs): void {
        this.linear = this.modes[event.index].linear;
    }
}
```

```html
<div class="sample-split">
  <igx-buttongroup [values]="modes" (selected)="toggleModes($event)"></igx-buttongroup>
</div>
<igx-stepper #stepper [linear]="linear">
  <ng-template igxStepActiveIndicator><igx-icon>edit</igx-icon></ng-template>
  <igx-step #step1 [isValid]="form1.form.valid">
    <span igxStepTitle>Personal Info</span>
    <div igxStepContent>
      <form #form1="ngForm">
        <igx-input-group>
          <input igxInput name="fullName" type="text" [(ngModel)]="user.fullName" required />
          <label igxLabel for="fullName" id="fullName">Full Name</label>
        </igx-input-group>
      </form>
      <button igxButton="contained" (click)="stepper.next()" [disabled]="!form1.form.valid && stepper.linear">NEXT</button>
    </div>
  </igx-step>
  <igx-step #step3 [optional]="true">
    <span igxStepTitle>Billing address</span>
    <span igxStepSubtitle>(optional)</span>
    <!-- ... step content -->
  </igx-step>
  <!-- ... additional steps -->
</igx-stepper>
```

```scss
$sample-gap: 20px;

:host {
	display: block;
	padding: $sample-gap;
}

.sample-split,
.sample-step-actions {
	display: flex;
	gap: $sample-gap;
}

form {
	margin-bottom: $sample-gap;
}
```

<hr/>

### Step Interactions

[`IgxStepper`](mcp:get_api_reference?platform=angular&component=IgxStepper) provides these interaction methods:

- [`navigateTo`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=navigateTo) activates a step by index.
- [`next`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=next) activates the next non-disabled step.
- [`prev`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=prev) activates the previous non-disabled step.
- [`reset`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=reset) resets the stepper.

**Note:** The reset method does not clear step content; clear it manually.

### Customizing the Steps

The [`stepType`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=stepType) property accepts `Full` (default), `Indicator`, or `Title`.

**Full** renders indicators and titles when titles or subtitles are defined. Set [`titlePosition`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=titlePosition) to `end`, `start`, `bottom`, or `top`. Its default is `bottom` for horizontal and `end` for vertical orientation.

**Note:** `titlePosition` applies only when `stepType` is `full`.

**Indicator** displays only indicators, which are always **24 pixels** in size. We recommend [IgxIconComponent](/icon) or [IgxAvatarComponent](layouts/avatar.md).

**Title** displays titles and any defined subtitles. The title container can be re-templated without size restrictions.

This sample switches between step types:

```typescript
import { Component } from '@angular/core';
import { IButtonGroupEventArgs, IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxStepComponent, IgxStepTitleDirective, IgxStepType, IgxStepperComponent } from 'igniteui-angular/stepper';

@Component({
    selector: 'app-stepper-steptypes-sample',
    templateUrl: './stepper-steptypes-sample.component.html',
    imports: [IgxButtonGroupComponent, IgxStepperComponent, IgxStepComponent, IgxStepTitleDirective]
})
export class StepperStepTypesSampleComponent {
    public stepType: IgxStepType = 'full';
    public stepTypes: any[] = [
        { label: 'Indicator', stepType: 'indicator', selected: this.stepType === 'indicator', togglable: true },
        // ...
    ];

    public toggleStepType(event: IButtonGroupEventArgs): void {
        this.stepType = this.stepTypes[event.index].stepType;
    }
}
```

```html
<div class="sample-split">
    <igx-buttongroup [values]="stepTypes" (selected)="toggleStepType($event)"></igx-buttongroup>
</div>
<igx-stepper #stepper [stepType]="stepType">
    <igx-step><span igxStepTitle>Pricing Plan</span></igx-step>
    <!-- ... additional steps -->
</igx-stepper>
```

```scss
$sample-gap: 20px;

:host {
    display: block;
    padding: $sample-gap;
}
```

<hr/>

You can customize indicators for active, invalid, and completed steps with `igxStepActiveIndicator`, `igxStepInvalidIndicator`, and `igxStepCompletedIndicator`:

```html
<igx-stepper>
    <ng-template igxStepActiveIndicator><igx-icon>edit</igx-icon></ng-template>
    <ng-template igxStepInvalidIndicator><igx-icon>error</igx-icon></ng-template>
    <ng-template igxStepCompletedIndicator><igx-icon>check</igx-icon></ng-template>
    ...
</igx-stepper>
```

**Note:** These templates apply to all steps with the relevant state.

### Angular Stepper Animations

Horizontal steppers use `slide` by default and also support `fade`, configured with [`horizontalAnimationType`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=horizontalAnimationType). Vertical steppers use `grow` by default and also support `fade`, configured with [`verticalAnimationType`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=verticalAnimationType). Set either animation type to `none` to disable animations.

[`animationDuration`](mcp:get_api_reference?platform=angular&component=IgxStepper&member=animationDuration) sets transition duration for both orientations.

## Keyboard Navigation

Keyboard navigation is enabled by default and follows [W3 accessibility standards](https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-manual.html#accessibilityfeatures).

- <kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>: move focus to the next/previous tabbable element.
- <kbd>Arrow Down</kbd> / <kbd>Arrow Up</kbd>: move to the next/previous step header in vertical orientation.
- <kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd>: move to the previous/next step header in either orientation.
- <kbd>Home</kbd> / <kbd>End</kbd>: move to the first/last enabled step.
- <kbd>Enter / Space</kbd>: activate the focused step.

**Note:** Pressing <kbd>Tab</kbd> on a step header moves focus to the content container. Set `[tabIndex]="-1"` on the container to skip it.

The Stepper Component is also available in the low-code, [drag and drop App Builder™](https://www.infragistics.com/products/appbuilder).

## Angular Stepper Styling

### Stepper Theme Property Map

Changing a primary property updates its dependent properties:

| Primary Property | Dependent Property | Description |
| --- | --- | --- |
| **$step-background** | $step-hover-background, $step-focus-background, $indicator-background, $title-color, $subtitle-color, $current-step-background, $invalid-step-background, $complete-step-background, $disabled-indicator-background, $disabled-title-color, $disabled-subtitle-color, $step-separator-color | Step header, indicator, text, states, and separator colors |
| **$indicator-background** | $indicator-outline, $indicator-color | Indicator outline and text |
| **$current-step-background** | $current-step-hover-background, $current-step-focus-background, $current-indicator-background, $current-title-color, $current-subtitle-color | Current step colors |
| **$invalid-indicator-background** | $invalid-indicator-outline, $invalid-indicator-color, $invalid-title-color, $invalid-subtitle-color, $invalid-title-hover-color, $invalid-subtitle-hover-color, $invalid-title-focus-color, $invalid-subtitle-focus-color | Invalid step colors |
| **$complete-step-background** | $complete-step-hover-background, $complete-step-focus-background, $complete-indicator-background, $complete-indicator-color, $complete-title-color, $complete-subtitle-color, $complete-title-hover-color, $complete-subtitle-hover-color, $complete-title-focus-color, $complete-subtitle-focus-color | Completed step colors |

Use [Ignite UI for Angular Theming](/themes) to customize the stepper. Import the theming functions:

```scss
@use "igniteui-angular/theming" as *;

// IMPORTANT: Prior to Ignite UI for Angular version 13 use:
// @import '~igniteui-angular/lib/core/styles/themes/index';
```

Create a theme with `stepper-theme` and include it:

```scss
$stepper-theme: stepper-theme(
  $step-background: #351e65,
  $current-indicator-background: #f6cd28,
  $border-radius-step-header: 16px,
  $border-radius-indicator: 10px 4px 10px 4px,
);
```

```scss
:host {
    @include tokens($custom-stepper-theme);
}
```

### Demo

This demo customizes step indicators and marks steps complete as the user advances.

```typescript
import { Component, ViewChild } from '@angular/core';
import { IStepChangingEventArgs, IgxStepActiveIndicatorDirective, IgxStepCompletedIndicatorDirective, IgxStepComponent, IgxStepContentDirective, IgxStepSubtitleDirective, IgxStepTitleDirective, IgxStepperComponent } from 'igniteui-angular/stepper';

@Component({
    selector: 'app-stepper-styling-sample',
    templateUrl: './stepper-styling-sample.component.html',
    imports: [IgxStepperComponent, IgxStepActiveIndicatorDirective, IgxStepCompletedIndicatorDirective, IgxStepComponent, IgxStepTitleDirective, IgxStepSubtitleDirective, IgxStepContentDirective]
})
export class StepperStylingSampleComponent {
    @ViewChild('stepper', { read: IgxStepperComponent })
    public stepper: IgxStepperComponent;

    public activeStepChanging(evt: IStepChangingEventArgs): void {
        this.stepper.steps.forEach(step => {
            if (step.index >= evt.oldIndex && step.index < evt.newIndex) {
                step.completed = true;
            }
        });
    }

    public reset(): void {
        this.stepper.steps.forEach(step => step.completed = false);
        this.stepper.reset();
    }
}
```

```html
<igx-stepper #stepper (activeStepChanging)="activeStepChanging($event)">
    <ng-template igxStepActiveIndicator><igx-icon>edit</igx-icon></ng-template>
    <ng-template igxStepCompletedIndicator><igx-icon>check</igx-icon></ng-template>
    <igx-step>
        <span igxStepTitle>Order</span>
        <span igxStepSubtitle>required</span>
        <div igxStepContent><button igxButton="contained" (click)="stepper.next()">NEXT</button></div>
    </igx-step>
    <!-- ... additional steps -->
</igx-stepper>
```

```scss
@use "layout.scss";
@use "igniteui-angular/theming" as *;

$stepper-theme: stepper-theme(
  $step-background: #351e65,
  $current-indicator-background: #f6cd28,
  $border-radius-step-header: 16px,
  $border-radius-indicator: 10px 4px 10px 4px,
);

:host {
  @include tokens($stepper-theme);
}
```

### Styling with Tailwind

Set up [Tailwind](/themes/misc/tailwind-classes), import the utility file, and apply `light-*` or `dark-*` classes. Append `stepper` to the theme prefix, for example `light-stepper`.

```scss
@import "tailwindcss";
...
@use 'igniteui-theming/tailwind/utilities/material.css';
```

Override generated CSS variables with arbitrary properties:

```html
<igx-stepper
  class="!light-stepper ![--step-background:#7B9E89] ![--border-radius-step-header:6px]">
  ...
</igx-stepper>
```

**Note:** The exclamation mark (`!`) makes the utility class important so it takes precedence over the component theme.

This example applies the Tailwind theme utilities to the same stepper interaction pattern:

```typescript
import { Component, ViewChild } from '@angular/core';
import { IStepChangingEventArgs, IgxStepActiveIndicatorDirective, IgxStepCompletedIndicatorDirective, IgxStepComponent, IgxStepContentDirective, IgxStepSubtitleDirective, IgxStepTitleDirective, IgxStepperComponent } from 'igniteui-angular/stepper';

@Component({
    selector: 'app-stepper-tailwind-styling-sample',
    templateUrl: './stepper-tailwind-styling-sample.component.html',
    imports: [IgxStepperComponent, IgxStepActiveIndicatorDirective, IgxStepCompletedIndicatorDirective, IgxStepComponent, IgxStepTitleDirective, IgxStepSubtitleDirective, IgxStepContentDirective]
})
export class StepperTailwindStylingSampleComponent {
    @ViewChild('stepper', { read: IgxStepperComponent })
    public stepper: IgxStepperComponent;

    public activeStepChanging(evt: IStepChangingEventArgs): void {
        this.stepper.steps.forEach(step => {
            if (step.index >= evt.oldIndex && step.index < evt.newIndex) {
                step.completed = true;
            }
        });
    }

    public reset(): void {
        this.stepper.steps.forEach(step => step.completed = false);
        this.stepper.reset();
    }
}
```

```html
<igx-stepper class="!light-stepper ![--step-background:#7B9E89] ![--border-radius-step-header:6px]" #stepper (activeStepChanging)="activeStepChanging($event)">
    <ng-template igxStepActiveIndicator><igx-icon>edit</igx-icon></ng-template>
    <ng-template igxStepCompletedIndicator><igx-icon>check</igx-icon></ng-template>
    <igx-step>
        <span igxStepTitle>Order</span>
        <span igxStepSubtitle>required</span>
        <div igxStepContent><button igxButton="contained" (click)="stepper.next()">NEXT</button></div>
    </igx-step>
    <!-- ... additional steps -->
</igx-stepper>
```

```scss
@use "layout.scss";
```

<hr/>

## API Reference

- [`IgxStepper`](mcp:get_api_reference?platform=angular&component=IgxStepper)
- [`IgxStep`](mcp:get_api_reference?platform=angular&component=IgxStep)

## Additional Resources

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)
