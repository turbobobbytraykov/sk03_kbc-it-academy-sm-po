# igniteui-cli / get_doc

Called 2026-11-01T22:40:30.489Z

## Arguments

```json
{
  "framework": "angular",
  "name": "input-group"
}
```

## Result

---
component: IgxInputGroupComponent, IgxInputDirective, IgxLabelDirective, IgxPrefixDirective, IgxSuffixDirective, IgxHintDirective, IgxIconComponent, IgxDatePickerComponent, IgxPickerToggleComponent, IgxButtonDirective, IgxRippleDirective
toc_name: Input Group
keywords: input-group, forms, validation, labels, prefixes, suffixes, hints, typed forms, reactive forms, theming
summary: Learn how to compose input groups with labels, prefixes, suffixes, and hints, and how to style them. Examples cover template-driven and reactive forms, validation, and theming.
---

# Angular Input Group Component Overview

The `IgxInputGroupComponent` enhances inputs, selects, and textareas with content such as text, icons, buttons, validation, floating labels, and hints.

## Angular Input Group Example

```typescript
import { Component } from '@angular/core';
import { BaseInputGroupSampleComponent } from '../base-input.component';
import { FormsModule } from '@angular/forms';
import { IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective } from 'igniteui-angular/input-group';

@Component({
    selector: 'app-input-group-sample-1',
    styleUrls: ['./input-group-sample-1.component.scss'],
    templateUrl: './input-group-sample-1.component.html',
    imports: [FormsModule, IgxInputGroupComponent, IgxInputDirective, IgxLabelDirective]
})
export class InputGroupSample1Component extends BaseInputGroupSampleComponent { }
```

```html
<article class="sample-column">
    <form>
        <igx-input-group>
            <input igxInput name="fullName" type="text" />
            <label igxLabel for="fullName">Full Name</label>
        </igx-input-group>
    </form>
</article>
```

```scss
.sample-column {
    max-width: 550px;
}
```

<hr/>

## Getting Started with Ignite UI for Angular Input Group

Install Ignite UI for Angular in an existing application:

```cmd
ng add igniteui-angular
```

See the [_getting started_](/general/getting-started) topic for an introduction. Import `IgxInputGroupModule` and `FormsModule` for template-driven forms:

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';
import { IgxInputGroupModule } from 'igniteui-angular/input-group';
// import { IgxInputGroupModule } from '@infragistics/igniteui-angular'; for licensed package

@NgModule({
    ...
    imports: [..., IgxInputGroupModule, FormsModule],
    ...
})
export class AppModule {}
```

Alternatively, since `16.0.0`, import the standalone component or use `IGX_INPUT_GROUP_DIRECTIVES` for the component and supporting directives:

```typescript
import { FormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';

@Component({
    selector: 'app-home',
    template: `
    <igx-input-group>
        <igx-prefix>+359</igx-prefix>
        <label igxLabel for="phone">Phone</label>
        <input igxInput [(ngModel)]="value" name="phone" type="tel" maxlength="9" />
        <igx-icon igxSuffix>phone</igx-icon>
    </igx-input-group>
    `,
    styleUrls: ['home.component.scss'],
    standalone: true,
    imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxIconComponent, FormsModule]
})
export class HomeComponent {
    public value = '123456789';
}
```

**Note:** This component uses Material Icons. Add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` to `index.html`.

Wrap `igxInput`, `igxLabel`, `igx-prefix`, `igx-suffix`, and `igx-hint` in an `<igx-input-group>` container.

## Using the Angular Input Group

### Label & Input

See the [`igxLabel`](mcp:get_api_reference?platform=angular&component=IgxLabelDirective) and [`igxInput`](mcp:get_api_reference?platform=angular&component=IgxInputDirective) documentation for validation, data binding, and API details: [Label & Input](/label-input).

### Prefix & Suffix

`igx-prefix`/`igxPrefix` and `igx-suffix`/`igxSuffix` can contain or attach to HTML elements, text, icons, or other components.

```html
<igx-input-group>
    <igx-prefix>+359</igx-prefix>
    <label igxLabel for="phone">Phone</label>
    <input igxInput name="phone" type="tel" maxlength="9" />
    <igx-icon igxSuffix>phone</igx-icon>
</igx-input-group>
```

```typescript
import { Component } from '@angular/core';
import { BaseInputGroupSampleComponent } from '../base-input.component';
import { FormsModule } from '@angular/forms';
import { IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxPrefixDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';

@Component({
    selector: 'app-input-group-sample-3',
    styleUrls: ['./input-group-sample-3.component.scss'],
    templateUrl: './input-group-sample-3.component.html',
    imports: [FormsModule, IgxInputGroupComponent, IgxPrefixDirective, IgxLabelDirective, IgxInputDirective, IgxIconComponent, IgxSuffixDirective]
})
export class InputGroupSample3Component extends BaseInputGroupSampleComponent { }
```

```html
<article class="sample-column">
    <form>
        <igx-input-group>
            <igx-prefix>+359</igx-prefix>
            <label igxLabel for="phone">Phone</label>
            <input igxInput name="phone" type="tel" />
            <igx-icon igxSuffix>phone</igx-icon>
        </igx-input-group>
    </form>
</article>
```

```scss
.sample-column {
    max-width: 550px;
}
```

<hr/>

### Hints

The [`igx-hint`](mcp:get_api_reference?platform=angular&component=IgxHintDirective) directive displays helper text below the input. Its [`position`](mcp:get_api_reference?platform=angular&component=IgxHintDirective&member=position) property controls whether it appears at the beginning or end.

```html
<igx-input-group>
    <igx-prefix>+359</igx-prefix>
    <label igxLabel for="phone">Phone</label>
    <input igxInput name="phone" type="tel" />
    <igx-suffix><igx-icon>phone</igx-icon></igx-suffix>
    <igx-hint position="start">Ex.: +359 888 123 456</igx-hint>
</igx-input-group>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { BaseInputGroupSampleComponent } from '../base-input.component';
import { FormsModule } from '@angular/forms';
import { IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxPrefixDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';

@Component({
    selector: 'app-input-group-sample-4',
    styleUrls: ['./input-group-sample-4.component.scss'],
    templateUrl: './input-group-sample-4.component.html',
    imports: [FormsModule, IgxInputGroupComponent, IgxPrefixDirective, IgxLabelDirective, IgxInputDirective, IgxSuffixDirective, IgxIconComponent, IgxHintDirective]
})
export class InputGroupSample4Component extends BaseInputGroupSampleComponent { }
```

```html
<article class="sample-column">
    <form>
        <igx-input-group>
            <igx-prefix>+359</igx-prefix>
            <label igxLabel for="phone">Phone</label>
            <input type="tel" igxInput name="phone" />
            <igx-suffix><igx-icon>phone</igx-icon></igx-suffix>
            <igx-hint position="start">Ex.: +359 888 123 456</igx-hint>
        </igx-input-group>
    </form>
</article>
```

```scss
.sample-column {
    max-width: 550px;
}
```

<hr/>

### Input Types & Input Group Type Token

Set the input group style with its [`type`](mcp:get_api_reference?platform=angular&component=IgxInputGroupComponent&member=type) property. Supported types are `line` (default), `border`, `box`, and `search`. The `line`, `border`, and `box` types are specific to Material Design themes and have no effect with other themes.

```html
<igx-input-group type="border"></igx-input-group>
```

Use the [`IgxIGX_INPUT_GROUP_TYPE`](mcp:get_api_reference?platform=angular&component=IGX_INPUT_GROUP_TYPE) injection token to set a default type application-wide:

```typescript
providers: [{provide: IGX_INPUT_GROUP_TYPE, useValue: 'box' }]
```

**Note:** The [`type`](mcp:get_api_reference?platform=angular&component=IgxInputGroupComponent&member=type) property takes precedence over [`IgxIGX_INPUT_GROUP_TYPE`](mcp:get_api_reference?platform=angular&component=IGX_INPUT_GROUP_TYPE). A global token also affects Ignite UI form controls that use input groups internally or allow custom templates.

Input groups also style `type="file"` inputs and support all input group types and themes:

```html
<igx-input-group>
    <input igxInput type="file" multiple />
</igx-input-group>
```

```typescript
import { Component } from '@angular/core';
import { BaseInputGroupSampleComponent } from '../base-input.component';
import { IGX_INPUT_GROUP_TYPE, IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxPrefixDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-group-sample-5',
    styleUrls: ['./input-group-sample-5.component.scss'],
    templateUrl: './input-group-sample-5.component.html',
    providers: [{ provide: IGX_INPUT_GROUP_TYPE, useValue: 'box' }],
    imports: [FormsModule, IgxInputGroupComponent, IgxInputDirective, IgxLabelDirective, IgxSuffixDirective, IgxIconComponent, IgxHintDirective, IgxPrefixDirective]
})
export class InputGroupSample5Component extends BaseInputGroupSampleComponent { }
```

```html
<article>
  <form>
    <h6>Line Type</h6>
    <igx-input-group type="line">
      <input igxInput name="fullName1" type="text" />
      <label igxLabel for="fullName1">Full Name</label>
      <igx-suffix><igx-icon>person</igx-icon></igx-suffix>
    </igx-input-group>
    <h6>Box Type</h6>
    <igx-input-group type="box">
      <input igxInput name="fullName2" type="text" />
      <label igxLabel for="fullName2">Full Name</label>
      <igx-suffix><igx-icon>person</igx-icon></igx-suffix>
    </igx-input-group>
    <!-- ... border, file, search, and token examples -->
  </form>
</article>
```

```scss
article {
    padding: 16px;
    height: 100%;
    overflow: auto;
}

h6 {
    font-weight: 400;
    margin: 24px 0 8px;
    font-size: 1.1rem;
}
```

### Input Group Theme

Supported themes are `material`, `fluent`, `bootstrap`, and `indigo-design`. The [`theme`](mcp:get_api_reference?platform=angular&component=IgxInputGroupComponent&member=theme) is inferred from the stylesheet during initialization. Set the `theme` input explicitly to support runtime theme switching.

```html
<igx-input-group theme="fluent">...</igx-input-group>
```

### Typed Forms

Input groups work with strictly typed reactive forms, which are the default in Angular 14. See [Angular typed forms](https://angular.io/guide/typed-forms).

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective } from 'igniteui-angular/input-group';

export interface registrationFormGroup {
  fName: FormControl<string>;
  lName: FormControl<string>;
  email: FormControl<string>;
  number?: FormControl<number|null>;
  company?: FormControl<string|null>;
  birthDate?: FormControl<string|null>;
  password: FormControl<string>;
}

@Component({
    selector: 'app-typed-form',
    templateUrl: './typed-form.component.html',
    styleUrls: ['./typed-form.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, IgxInputGroupComponent, IgxLabelDirective, IgxInputDirective]
})
export class TypedFormComponent {
    registerForm = new FormGroup<registrationFormGroup>({
        fName: new FormControl<string>('', { nonNullable: true }),
        lName: new FormControl<string>('', { nonNullable: true }),
        email: new FormControl<string>('', { nonNullable: true}),
        number: new FormControl<number>(null, { nonNullable: false}),
        company: new FormControl<string>('', { nonNullable: false}),
        birthDate: new FormControl<string>('', { nonNullable: false}),
        password: new FormControl<string>('', { nonNullable: false})
    });
}
```

```html
<article class="sample-column">
    <form [formGroup]="registerForm">
        <h4>Registration Form</h4>
        <div class="container">
            <igx-input-group>
                <label igxLabel for="fName">First Name</label>
                <input igxInput name="fName" type="text" formControlName="fName" required />
            </igx-input-group>
            <!-- ... additional fields, date picker, and submit button -->
        </div>
    </form>
</article>
```

```scss
.container > * {
    margin-top: 32px;
}
```

## Validation

These examples show validation with [template-driven](https://angular.io/guide/forms) and [reactive forms](https://angular.io/guide/reactive-forms).

### Template-Driven Forms

Add validation attributes such as `required`, `minlength`, and `email` to input elements:

```html
<form>
    <igx-input-group>
        <label igxLabel for="username">Username</label>
        <input igxInput name="username" type="text" required />
    </igx-input-group>
    <!-- ... other validated fields -->
    <button igxButton="contained" igxRipple type="submit">Submit</button>
</form>
```

The `required` attribute adds an asterisk to the label. Use [`igx-hint`](mcp:get_api_reference?platform=angular&component=IgxHintDirective) to communicate additional requirements. Export `ngModel` to inspect a control's state:

```html
<form #login="ngForm">
    ...
    <igx-input-group>
        <label igxLabel for="email">Email</label>
        <input igxInput name="email" type="email" [(ngModel)]="user.email" #email="ngModel" required email />
        <igx-hint *ngIf="email.errors?.email">Please enter a valid email</igx-hint>
    </igx-input-group>
    <!-- ... password field -->
</form>
```

You can also export `ngForm` and disable submission while the form is invalid:

```html
<form #registrationForm="ngForm">
    <igx-input-group>
        <label igxLabel for="email">Email</label>
        <input igxInput name="email" type="email" [(ngModel)]="user.email" #email="ngModel" required email />
        <igx-hint *ngIf="email.errors?.email">Please enter a valid email</igx-hint>
    </igx-input-group>
    ...
    <button igxButton="contained" igxRipple type="submit" [disabled]="!registrationForm.valid">Submit</button>
</form>
```

This example combines hints, form-state checking, and password visibility toggling with [`igx-icon`](mcp:get_api_reference?platform=angular&component=IgxIconComponent) and [`igx-suffix`](#prefix--suffix).

```typescript
import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';

interface User {
    username: string;
    email: string;
    password: string;
}

@Component({
    selector: 'app-template-driven-form-validation',
    templateUrl: './template-driven-form-validation.component.html',
    styleUrls: ['./template-driven-form-validation.component.scss'],
    imports: [FormsModule, IgxInputGroupComponent, IgxLabelDirective, IgxInputDirective, IgxHintDirective, IgxIconComponent, IgxSuffixDirective, IgxButtonDirective, IgxRippleDirective]
})
export class TemplateDrivenFormValidationComponent {
    @ViewChild(NgForm, { static: true })
    public registrationForm: NgForm;

    public showPassword: boolean = false;
    public user: User = { username: '', email: '', password: '' };

    public get togglePasswordVisibility() {
        return this.showPassword ? 'visibility_off' : 'visibility';
    }

    public onSubmit() {
        console.log(this.user);
        this.registrationForm.reset();
    }
}
```

```html
<article>
  <form #registrationForm="ngForm" (ngSubmit)="onSubmit()">
    <h4>Registration Form</h4>
    <div class="container">
      <igx-input-group>
        <label igxLabel for="username">Username</label>
        <input igxInput name="username" type="text" [(ngModel)]="user.username" required />
      </igx-input-group>
      <igx-input-group>
        <label igxLabel for="email">Email</label>
        <input igxInput name="email" type="email" [(ngModel)]="user.email" #email="ngModel" required email />
        @if (email.errors?.email) {
          <igx-hint>Please enter a valid email</igx-hint>
        }
      </igx-input-group>
      <!-- ... password field with hint and visibility toggle -->
      <button igxButton="contained" igxRipple type="submit" [disabled]="!registrationForm.valid">Submit</button>
    </div>
  </form>
</article>
```

```scss
.container > * {
    margin-top: 32px;
}

form {
    padding: 24px;
    margin-bottom: 48px;
}
```

### Reactive Forms

Add validator functions to the form control model, then associate the controls with template elements:

```ts
public registrationForm: FormGroup<User>;

constructor(fb: FormBuilder) {
    this.registrationForm = fb.group({
        username: ['', { nonNullable: true, validators: [Validators.required] }],
        email: ['', { nonNullable: true, validators: [Validators.required, Validators.email] }],
        password: ['', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }]
    });
}
```

```html
<form [formGroup]="registrationForm">
    <igx-input-group>
        <label igxLabel for="username">Username</label>
        <input igxInput name="username" type="text" formControlName="username" />
    </igx-input-group>
    <!-- ... email and password fields -->
    <button igxButton="contained" igxRipple type="submit">Submit</button>
</form>
```

Use [`igx-hint`](mcp:get_api_reference?platform=angular&component=IgxHintDirective) to show validation messages. Access controls with `get` and check the form state to disable submission:

```ts
public get email() {
    return this.registrationForm.get('email');
}

public get password() {
    return this.registrationForm.get('password');
}
```

```html
<form [formGroup]="registrationForm">
    ...
    <igx-input-group>
        <label igxLabel for="email">Email</label>
        <input igxInput name="email" type="email" formControlName="email" />
        <igx-hint *ngIf="email.errors?.email">Please enter a valid email</igx-hint>
    </igx-input-group>
    <!-- ... password field and hint -->
    <button igxButton="contained" igxRipple type="submit" [disabled]="!registrationForm.valid">Submit</button>
</form>
```

The complete pattern includes reactive validation and password visibility toggling with [`igx-icon`](mcp:get_api_reference?platform=angular&component=IgxIconComponent) and [`igx-suffix`](#prefix--suffix).

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';

interface User {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'app-reactive-form-validation',
    templateUrl: './reactive-form-validation.component.html',
    styleUrls: ['./reactive-form-validation.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, IgxInputGroupComponent, IgxLabelDirective, IgxInputDirective, IgxHintDirective, IgxIconComponent, IgxSuffixDirective, IgxButtonDirective, IgxRippleDirective]
})
export class ReactiveFormValidationComponent {
    public registrationForm: FormGroup<User>;
    public showPassword: boolean = false;

    constructor() {
        const fb = inject(FormBuilder);
        this.registrationForm = fb.group({
            username: ['', { nonNullable: true, validators: [Validators.required] }],
            email: ['', { nonNullable: true, validators: [Validators.required, Validators.email] }],
            password: ['', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }]
        });
    }

    public get email() {
        return this.registrationForm.get('email');
    }

    public get password() {
        return this.registrationForm.get('password');
    }

    public get togglePasswordVisibility() {
        return this.showPassword ? 'visibility_off' : 'visibility';
    }

    public onSubmit() {
        console.log(this.registrationForm.value);
        this.registrationForm.reset();
    }
}
```

```html
<article>
  <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
    <h4>Registration Form</h4>
    <div class="container">
      <igx-input-group>
        <label igxLabel for="username">Username</label>
        <input igxInput name="username" type="text" formControlName="username" />
      </igx-input-group>
      <igx-input-group>
        <label igxLabel for="email">Email</label>
        <input igxInput name="email" type="email" formControlName="email" />
        @if (email.errors?.email) {
          <igx-hint>Please enter a valid email</igx-hint>
        }
      </igx-input-group>
      <!-- ... password field with hint and visibility toggle -->
      <button igxButton="contained" igxRipple type="submit" [disabled]="!registrationForm.valid">Submit</button>
    </div>
  </form>
</article>
```

```scss
form {
    padding: 24px;
    margin-bottom: 48px;
}
```

### Custom Validators

Custom validators can return errors for use in specific validation messages. This reactive validator checks whether an email contains a predefined value and identifies where it occurs:

```ts
public registrationForm: FormGroup<User>;

constructor(fb: FormBuilder) {
    this.registrationForm = fb.group({
        email: ['', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.email,
                this.emailValidator('infragistics')
            ]
        }],
        ...
    });
}

private emailValidator(val: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.toLowerCase();
        const localPartRegex = new RegExp(`(?<=(${val})).*[@]`);
        const domainRegex = new RegExp(`(?<=[@])(?=.*(${val}))`);
        const returnObj: ValidatorErrors = {};

        if (value && localPartRegex.test(value)) {
            returnObj.localPart = true;
        }
        if (value && domainRegex.test(value)) {
            returnObj.domain = true;
        }

        return returnObj;
    }
}
```

### Cross-Field Validation

When validation depends on multiple controls, validate at their common ancestor (`FormGroup`). The validator can set errors on the group and on child controls with `setErrors`; calling `setValue` reruns validation when clearing those errors.

This example checks that the password does not contain the email and that the repeat password matches:

```ts
private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email = control.get('email');
        const password = control.get('password');
        const repeatPassword = control.get('repeatPassword');
        const returnObj: ValidatorErrors = {};

        if (email.value
            && password.value
            && password.value.toLowerCase().includes(email.value)) {
            password.setErrors({ ...password.errors, containsEmail: true });
            returnObj.containsEmail = true;
        }

        if (password
            && repeatPassword
            && password.value !== repeatPassword.value) {
            repeatPassword.setErrors({ ...repeatPassword.errors, mismatch: true });
            returnObj.mismatch = true;
        }

        if (!returnObj.containsEmail && password.errors?.containsEmail) {
            password.setValue(password.value);
        }

        if (!returnObj.mismatch && repeatPassword.errors?.mismatch) {
            repeatPassword.setValue(repeatPassword.value);
        }

        return returnObj;
    }
}
```

Pass the validator in the `FormGroup` options:

```ts
public registrationForm: FormGroup<User>;

constructor(fb: FormBuilder) {
    this.registrationForm = fb.group({
        email: ['', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.email,
                this.emailValidator('infragistics')
            ]
        }],
        ...
    },
    {
        validators: [this.passwordValidator()]
    });
}
```

The full sample combines built-in validators with the custom email and cross-field validators above.

```typescript
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';

interface User {
    email: FormControl<string>;
    password: FormControl<string>;
    repeatPassword: FormControl<string>;
}

interface ValidatorErrors {
    localPart?: boolean;
    domain?: boolean;
    containsEmail?: boolean;
    mismatch?: boolean;
}

@Component({
    selector: 'app-reactive-form-custom-validation',
    templateUrl: './reactive-form-custom-validation.component.html',
    styleUrls: ['./reactive-form-custom-validation.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, IgxInputGroupComponent, IgxLabelDirective, IgxInputDirective, IgxHintDirective, IgxIconComponent, IgxSuffixDirective, IgxButtonDirective, IgxRippleDirective]
})
export class ReactiveFormCustomValidationComponent {
    private pattern = `^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@?#+$"'%^&:;*\\-_=.,<>])[A-Za-z\\d~!@?#+$"'%^&:;*\\-_=.,<>]+$`;
    public registrationForm: FormGroup<User>;
    public showPassword: boolean = false;
    public showRepeat: boolean = false;

    constructor() {
        const fb = inject(FormBuilder);
        this.registrationForm = fb.group({
            email: ['', { nonNullable: true, validators: [Validators.required, Validators.email, this.emailValidator('infragistics')] }],
            password: ['', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.pattern(this.pattern)] }],
            repeatPassword: ['', { nonNullable: true, validators: [Validators.required] }]
        }, { validators: [this.passwordValidator()] });
    }

    public get email() { return this.registrationForm.get('email'); }
    public get password() { return this.registrationForm.get('password'); }
    public get repeatPassword() { return this.registrationForm.get('repeatPassword'); }

    public get togglePasswordVisibility() {
        return this.showPassword ? 'visibility_off' : 'visibility';
    }

    public get toggleRepeatVisibility() {
        return this.showRepeat ? 'visibility_off' : 'visibility';
    }

    public onSubmit() {
        console.log(this.registrationForm.value);
        this.registrationForm.reset();
    }

    private emailValidator(val: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value?.toLowerCase();
            const localPartRegex = new RegExp(`(?<=(${val})).*[@]`);
            const domainRegex = new RegExp(`(?<=[@])(?=.*(${val}))`);
            const returnObj: ValidatorErrors = {};
            if (value && localPartRegex.test(value)) { returnObj.localPart = true; }
            if (value && domainRegex.test(value)) { returnObj.domain = true; }
            return returnObj;
        }
    }

    private passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const email = control.get('email');
            const password = control.get('password');
            const repeatPassword = control.get('repeatPassword');
            const returnObj: ValidatorErrors = {};

            if (email.value && password.value && password.value.toLowerCase().includes(email.value)) {
                password.setErrors({ ...password.errors, containsEmail: true });
                returnObj.containsEmail = true;
            }
            if (password && repeatPassword && password.value !== repeatPassword.value) {
                repeatPassword.setErrors({ ...repeatPassword.errors, mismatch: true });
                returnObj.mismatch = true;
            }
            if (!returnObj.containsEmail && password.errors?.containsEmail) {
                password.setValue(password.value);
            }
            if (!returnObj.mismatch && repeatPassword.errors?.mismatch) {
                repeatPassword.setValue(repeatPassword.value);
            }
            return returnObj;
        }
    }
}
```

```html
<article>
  <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
    <igx-input-group>
      <label igxLabel for="email">Email</label>
      <input igxInput name="email" type="email" formControlName="email" />
      @if (email.errors?.email) { <igx-hint>Please enter a valid email address</igx-hint> }
      @if (!email.errors?.email && email.errors?.localPart) { <igx-hint>This email address is not allowed</igx-hint> }
      @if (!email.errors?.email && email.errors?.domain) { <igx-hint>This domain is not allowed</igx-hint> }
    </igx-input-group>
    <igx-input-group>
      <label igxLabel for="password">Password</label>
      <input igxInput name="password" [type]="showPassword ? 'text' : 'password'" formControlName="password" />
      @if (password.errors?.containsEmail) { <igx-hint>Should not contain the email address</igx-hint> }
      @if (password.errors?.minlength) { <igx-hint>Should be at least 8 characters</igx-hint> }
      @if (password.errors?.pattern) { <igx-hint>Should contain a digit and a special character</igx-hint> }
      @if (password.value) {
        <igx-icon igxSuffix (click)="showPassword = !showPassword">{{ togglePasswordVisibility }}</igx-icon>
      }
    </igx-input-group>
    <!-- ... repeat password field and matching hint -->
    <button igxButton="contained" igxRipple type="submit" [disabled]="!registrationForm.valid">Submit</button>
  </form>
</article>
```

```scss
form {
    padding: 24px;
    margin-bottom: 48px;
}

form > * {
    margin-top: 32px;
}
```

## Styling

### Input Group Theme Property Map

Changing a primary property updates its dependent properties. The following summarizes the primary properties by theme:

| Theme | Primary properties |
| --- | --- |
| Material | `$box-background`, `$idle-bottom-line-color`, `$border-color`, `$input-prefix-background`, `$input-suffix-background`, `$search-background` |
| Fluent | `$border-color`, `$input-prefix-background`, `$input-suffix-background`, `$search-background` |
| Bootstrap | `$border-color`, `$input-prefix-background`, `$input-suffix-background`, `$search-background` |
| Indigo | `$idle-bottom-line-color`, `$border-color`, `$input-prefix-background`, `$input-suffix-background`, `$search-background` |

Dependent properties cover input backgrounds, text and placeholder colors, prefix and suffix states, borders, and search states.

Include the theming index file:

```scss
@use "igniteui-angular/theming" as *;

// IMPORTANT: Prior to Ignite UI for Angular version 13 use:
// @import '~igniteui-angular/lib/core/styles/themes/index';
```

Extend `input-group-theme` to override selected parameters while retaining the base theme's state styles:

```scss
$custom-input-group: input-group-theme(
    $box-background: #57a5cd,
    $border-color: #57a5cd,
);
```

```scss
:host {
  @include tokens($custom-input-group);
}
```

This sample uses CSS variables to create an input group resembling the [`Carbon`](https://carbondesignsystem.com/components/text-input/usage/#live-demo) design system:

```typescript
import { Component } from '@angular/core';
import { IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective } from 'igniteui-angular/input-group';

@Component({
    selector: 'app-input-group-style',
    templateUrl: 'input-group-styling.component.html',
    styleUrls: ['input-group-styling.component.scss'],
    imports: [IgxInputGroupComponent, IgxLabelDirective, IgxInputDirective, IgxHintDirective]
})
export class InputGroupStyleComponent { }
```

```html
<article class="sample-column">
    <igx-input-group>
        <label igxLabel for="textField">Label text</label>
        <input placeholder="Placeholder text" type="text" igxInput name="textField" />
        <igx-hint position="start">Helper text</igx-hint>
    </igx-input-group>
</article>
```

```scss
@use "igniteui-angular/theming" as *;

:host {
    display: grid;
    max-width: rem(300px);
    margin-top: rem(24px);

    ::ng-deep {
        $custom-input-group: input-group-theme(
            $schema: $light-indigo-schema,
            $size: rem(40px),
        );

        @include typography(
            $font-family: '"IBM Plex Sans", sans-serif',
            $type-scale: $indigo-type-scale
        );

        @include theme(
            $palette: $light-indigo-palette,
            $schema: $light-indigo-schema
        );

        .igx-input-group {
            @include tokens($custom-input-group);
            --ig-caption-font-weight: 400;
            --ig-subtitle-1-font-weight: 400;
            &__bundle-main {
                background: var(--box-background-hover);
            }
        }
    }
}
```

**Note:** The sample uses the [Indigo Light](/themes/sass/schemas#predefined-schemas) schema.

**Note:** Scope theme variables to the specific input group type when mixing `box`, `border`, `line`, or `search` groups. For example, use `.igx-input-group--box` or `.igx-input-group--search` to avoid style conflicts; a dark `$box-background` applied globally may make border or line borders invisible.

<hr/>

### Styling with Tailwind

Set up [Tailwind](/themes/misc/tailwind-classes), then import the utilities for the desired theme. The utility file includes `light` and `dark` variants; use classes such as `light-input-group` and `dark-input-group`. Override generated CSS variables with arbitrary properties:

```scss
@import "tailwindcss";
...
@use 'igniteui-theming/tailwind/utilities/material.css';
```

```html
<article class="sample-column">
    <igx-input-group class="!light-input-group ![--box-background:#A3C7B2] ![--focused-secondary-color:#3A5444]" type="box">
        <igx-prefix>+359</igx-prefix>
        <label igxLabel for="phone">Phone</label>
        <input type="tel" igxInput name="phone" />
        <igx-suffix><igx-icon>phone</igx-icon></igx-suffix>
        <igx-hint position="start">Ex.: +359 888 123 456</igx-hint>
    </igx-input-group>
    <!-- ... border and search variants -->
</article>
```

**Note:** The exclamation mark (`!`) makes the utility class take precedence over component theme styles.

```typescript
import { Component } from '@angular/core';
import { IgxHintDirective, IgxInputDirective, IgxInputGroupComponent, IgxLabelDirective, IgxPrefixDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';

@Component({
    selector: 'app-input-group-tailwind-style',
    templateUrl: 'input-group-tailwind-styling.component.html',
    styleUrls: ['input-group-tailwind-styling.component.scss'],
    imports: [IgxInputGroupComponent, IgxPrefixDirective, IgxLabelDirective, IgxInputDirective, IgxSuffixDirective, IgxIconComponent, IgxHintDirective]
})
export class InputGroupTailwindStyleComponent { }
```

```html
<article class="sample-column">
    <igx-input-group class="!light-input-group ![--box-background:#A3C7B2] ![--focused-secondary-color:#3A5444]" type="box">
        <igx-prefix>+359</igx-prefix>
        <label igxLabel for="phone">Phone</label>
        <input type="tel" igxInput name="phone" />
        <igx-suffix><igx-icon>phone</igx-icon></igx-suffix>
        <igx-hint position="start">Ex.: +359 888 123 456</igx-hint>
    </igx-input-group>
    <!-- ... border and search variants -->
</article>
```

```scss
@use "layout.scss";

.sample-column {
    gap: 1rem;
}
```

## API References
<hr/>
- [`IgxInputDirective`](mcp:get_api_reference?platform=angular&component=IgxInputDirective)
- [`IgxHintDirective`](mcp:get_api_reference?platform=angular&component=IgxHintDirective)
- IgxInputGroup Types
- [`IgxInputGroup`](mcp:get_api_reference?platform=angular&component=IgxInputGroupComponent)
- `IgxInputGroupComponent Styles`

## Theming Dependencies

- `IgxButton Theme`
- `IgxIcon Theme`

## Additional Resources

<hr/>

Related topics:

- [Label & Input](/label-input)
- [Reactive Forms Integration](/angular-reactive-form-validation)

Our community is active and always welcoming to new ideas.

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)
