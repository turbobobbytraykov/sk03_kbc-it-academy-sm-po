# igniteui-cli / get_api_reference

Called 2026-11-01T21:22:48.341Z

## Arguments

```json
{
  "platform": "angular",
  "component": "IgxStepperComponent",
  "section": "all"
}
```

## Result

### [IgxStepperComponent](https://www.infragistics.com/api/angular/igniteui-angular/22.0.0/classes/IgxStepperComponent)
Stepper provides a wizard-like workflow by dividing content into logical steps.

- **constructor**(): IgxStepperComponent
- **activeStepChanged**: `EventEmitter<IStepChangedEventArgs>` — Emitted when the active step is changed.
- **activeStepChanging**: `EventEmitter<IStepChangingEventArgs>` — Emitted when the stepper's active step is changing.

<igx-stepper (activeStepChanging)="handleActiveStepChanging($event)">
</igx-stepper>


public handleActiveStepChanging(event: IStepChangingEventArgs) {
 if (event.newIndex < event.oldIndex) {
     event.cancel = true;
 }
}
- **contentTop**: `boolean` — Get/Set whether the content is displayed above the steps.
- **stepType**: `IgxStepType` — Get/Set the type of the steps.

this.stepper.stepType = IgxStepType.Indicator;
- **titlePosition**: `IgxStepperTitlePosition` — Get/Set the position of the steps title.
- **animationDuration**: `number` — Get/Set the animation duration.
<igx-stepper [animationDuration]="500">
<igx-stepper>
- **horizontalAnimationType**: `HorizontalAnimationType` — Get/Set the animation type of the stepper when the orientation direction is horizontal.
- **linear**: `boolean` — Get/Set whether the stepper is linear.
- **orientation**: `IgxStepperOrientation` — Get/Set the stepper orientation.

this.stepper.orientation = IgxStepperOrientation.Vertical;
- **steps**: `IgxStepComponent[]` — Get all steps.

const steps: IgxStepComponent[] = this.stepper.steps;
- **verticalAnimationType**: `VerticalAnimationType` — Get/Set the animation type of the stepper when the orientation direction is vertical.
- **navigateTo**(index: number): void — Activates the step at a given index.

this.stepper.navigateTo(1);
- **next**(): void — Activates the next enabled step.

this.stepper.next();
- **prev**(): void — Activates the previous enabled step.

this.stepper.prev();
- **reset**(): void — Resets the stepper to its initial state i.e. activates the first step.


