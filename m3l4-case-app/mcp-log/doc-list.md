# igniteui-cli / get_doc

Called 2026-11-01T21:27:15.464Z

## Arguments

```json
{
  "framework": "angular",
  "name": "list"
}
```

## Result

---
component: IgxListComponent, IgxListItemComponent, IgxEmptyListTemplateDirective, IgxDataLoadingTemplateDirective, IgxAvatarComponent, IgxIconComponent, IgxButtonGroupComponent, IgxInputGroupComponent, IgxInputDirective, IgxPrefixDirective, IgxSuffixDirective, IgxFilterOptions, IgxFilterPipe, IgxRippleDirective, IgxListThumbnailDirective, IgxListLineTitleDirective, IgxListLineSubTitleDirective, IgxListActionDirective, IgxListItemLeftPanningTemplateDirective, IgxListItemRightPanningTemplateDirective, IgxToastComponent, IgxSliderComponent, IgxIconButtonDirective
toc_name: List View
keywords: list, list-view, items, filtering, search, selection, panning, avatar, chat, theming
summary: Learn to build templated lists with headers, empty and loading states, filtering, selection, and item panning. The guide also covers chat layouts and styling with themes or Tailwind utilities.
---

# Angular List View Component Overview

The Ignite UI for Angular List displays rows of templatable items and supports headers, search, filtering, panning, empty and loading states, and virtualization for large lists with [`IgxForOf`](/for-of).

## Angular List Example

This contacts example uses avatars, icons, filtering, and a size chooser. The [`IgxList`](mcp:get_api_reference?platform=angular&component=IgxListComponent) component supports fully templatable list items.

```typescript
import { Component, HostBinding, OnInit } from '@angular/core';
import { IgxFilterOptions, IgxFilterPipe, IgxRippleDirective } from 'igniteui-angular/directives';
import { IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxInputDirective, IgxInputGroupComponent, IgxPrefixDirective, IgxSuffixDirective } from 'igniteui-angular/input-group';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxListActionDirective, IgxListComponent, IgxListItemComponent, IgxListLineSubTitleDirective, IgxListLineTitleDirective, IgxListThumbnailDirective } from 'igniteui-angular/list';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact-list2',
    styleUrls: ['./list-sample-4.component.scss'],
    templateUrl: './list-sample-4.component.html',
    imports: [IgxButtonGroupComponent, IgxInputGroupComponent, IgxPrefixDirective, IgxIconComponent, FormsModule, IgxInputDirective, IgxSuffixDirective, IgxListComponent, IgxListItemComponent, IgxRippleDirective, IgxAvatarComponent, IgxListThumbnailDirective, IgxListLineTitleDirective, IgxListLineSubTitleDirective, IgxListActionDirective, IgxFilterPipe]
})
export class ListSample4Component implements OnInit {
    public searchContact: string;

    public contacts = [
        {
            isFavorite: false,
            name: 'Terrance Orta',
            phone: '770-504-2217',
            photo: 'assets/images/men/27.jpg'
        }
        // ...
    ];

    public size = 'large';
    public sizes;

    public ngOnInit() {
        this.sizes = [
            { label: 'large', selected: this.size === 'large', togglable: true },
            { label: 'medium', selected: this.size === 'medium', togglable: true },
            { label: 'small', selected: this.size === 'small', togglable: true }
        ];
    }

    @HostBinding('style.--ig-size')
    protected get sizeStyle() {
        return `var(--ig-size-${this.size})`;
    }

    public selectSize(event) {
        this.size = this.sizes[event.index].label;
    }

    public toggleFavorite(contact: any, event: Event) {
        event.stopPropagation();
        contact.isFavorite = !contact.isFavorite;
    }

    get filterContacts() {
        const fo = new IgxFilterOptions();
        fo.key = 'name';
        fo.inputValue = this.searchContact;
        return fo;
    }

    public mousedown(event: Event) {
        event.stopPropagation();
    }
}
```

```html
<div class="density-chooser">
  <igx-buttongroup [values]="sizes" (selected)="selectSize($event)"></igx-buttongroup>
</div>
<igx-input-group type="search" class="search">
  <igx-prefix><igx-icon>search</igx-icon></igx-prefix>
  <input #search igxInput placeholder="Search Contacts" [(ngModel)]="searchContact">
  @if (search.value.length > 0) {
    <igx-suffix (click)="searchContact = null"><igx-icon>clear</igx-icon></igx-suffix>
  }
</igx-input-group>
<div class="list-sample">
  <igx-list>
    <igx-list-item [isHeader]="true">Contacts</igx-list-item>
    @for (contact of contacts | igxFilter: filterContacts; track contact) {
      <igx-list-item igxRipple igxRippleTarget=".igx-list__item-content">
        <igx-avatar igxListThumbnail [src]="contact.photo" shape="circle"></igx-avatar>
        <span igxListLineTitle>{{ contact.name }}</span>
        <span igxListLineSubTitle>{{ contact.phone }}</span>
        <igx-icon igxListAction [style.color]="contact.isFavorite ? 'orange' : 'lightgray'" igxRipple="pink"
          [igxRippleCentered]="true" (click)="toggleFavorite(contact, $event)"
          (mousedown)="mousedown($event)">star</igx-icon>
      </igx-list-item>
    }
  </igx-list>
</div>
```

```scss
:host {
    display: block;
    padding: 16px;
}

.list-sample {
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}

.density-chooser {
    margin-bottom: 16px;
}

igx-icon {
  cursor: pointer;
  position: relative;
}

.search {
    margin-bottom: 16px;
}
```

## Getting Started with Ignite UI for Angular List

Install Ignite UI for Angular in an existing application:

```cmd
ng add igniteui-angular
```

For an introduction, see [getting started](/general/getting-started). Import `IgxListModule` in the application module:

```typescript
import { IgxListModule } from 'igniteui-angular/list';
// import { IgxListModule } from '@infragistics/igniteui-angular'; for licensed package

@NgModule({
    ...
    imports: [..., IgxListModule],
    ...
})
export class AppModule {}
```

As of `16.0.0`, you can import `IgxListComponent` as a standalone dependency, or use `IGX_LIST_DIRECTIVES` to import its supporting components and directives.

```typescript
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
// import { IGX_LIST_DIRECTIVES } from '@infragistics/igniteui-angular'; for licensed package

@Component({
    selector: 'app-home',
    template: `
    <igx-list>
        <igx-list-item isHeader="true">Header</igx-list-item>
        <igx-list-item>Item 1</igx-list-item>
        <igx-list-item>Item 2</igx-list-item>
        <!-- ... -->
    </igx-list>
    `,
    styleUrls: ['home.component.scss'],
    standalone: true,
    imports: [IGX_LIST_DIRECTIVES]
    /* or imports: [IgxListComponent, IgxListItemComponent] */
})
export class HomeComponent {}
```

## Using the Angular List

Use `IgxEmptyListTemplateDirective` to replace the default empty-list template:

```html
<igx-list>
    <ng-template igxEmptyList>
        <div class="empty">No contacts! :(</div>
    </ng-template>
</igx-list>
```

```scss
.empty {
    color: rgba(0, 153, 255, 1);
    font-size: 25px;
    font-weight: 600;
    text-shadow: 2px 1px 2px rgba(150, 150, 150, 1);
}
```

Set [`isLoading`](mcp:get_api_reference?platform=angular&component=IgxListComponent&member=isLoading) to `true` while data loads, or supply a custom loading template with [`IgxDataLoadingTemplateDirective`](mcp:get_api_reference?platform=angular&component=IgxDataLoadingTemplateDirective).

```typescript
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { IgxDataLoadingTemplateDirective, IgxEmptyListTemplateDirective, IgxListComponent, IgxListItemComponent } from 'igniteui-angular/list';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';

@Component({
    selector: 'app-list-sample-6',
    styleUrls: ['./list-sample-6.component.scss'],
    templateUrl: './list-sample-6.component.html',
    imports: [IgxListComponent, IgxListItemComponent, IgxRippleDirective, IgxEmptyListTemplateDirective, IgxButtonDirective, IgxDataLoadingTemplateDirective]
})
export class ListSample6Component {
    private cdr = inject(ChangeDetectorRef);

    @ViewChild('fruitList', { static: true })
    public fruitList: IgxListComponent;

    public fruitsData: string[] = [];

    public loadFruits() {
        this.fruitList.isLoading = true;
        setTimeout(() => {
            const availableFruits: string[] = ['banana', 'orange', 'apple', 'strawberry', 'pear'];
            availableFruits.forEach((fruit) => { this.fruitsData.push(fruit); });
            this.fruitList.isLoading = false;
            this.cdr.markForCheck();
        }, 1000);
    }
}
```

```html
<igx-list #fruitList>
  @for (fruit of fruitsData; track fruit) {
    <igx-list-item igxRipple igxRippleTarget=".igx-list__item-content">{{ fruit }}</igx-list-item>
  }
  <ng-template igxEmptyList>
    <div class="center"><button type="button" igxButton="contained" (click)="loadFruits()">Load data</button></div>
  </ng-template>
  <ng-template igxDataLoading>
    <div class="center"><span>Patience, we are currently loading your data...</span></div>
  </ng-template>
</igx-list>
```

```scss
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 24px;
    height: 100%;
}
```

### Add List Items

Create a basic list with a header and items:

```html
<igx-list>
    <igx-list-item isHeader="true">Header</igx-list-item>
    <igx-list-item>Item 1</igx-list-item>
    <igx-list-item>Item 2</igx-list-item>
    <!-- ... -->
</igx-list>
```

Use `igxListLineTitle` and `igxListLineSubTitle` for consistent item title and subtitle styling.

```typescript
import { Component } from '@angular/core';
import { IgxListComponent, IgxListItemComponent, IgxListLineSubTitleDirective, IgxListLineTitleDirective } from 'igniteui-angular/list';

@Component({
    selector: 'app-contact-list',
    styleUrls: ['./list-sample-3.component.scss'],
    templateUrl: './list-sample-3.component.html',
    imports: [IgxListComponent, IgxListItemComponent, IgxListLineTitleDirective, IgxListLineSubTitleDirective]
})
export class ListSample3Component {
  public contacts = [
    { name: 'Terrance Orta', phone: '770-504-2217' }
    // ...
  ];
}
```

```html
<igx-list>
  <igx-list-item [isHeader]="true">Contacts</igx-list-item>
  @for (contact of contacts; track contact) {
    <igx-list-item>
      <span igxListLineTitle>{{ contact.name }}</span>
      <span igxListLineSubTitle>{{contact.phone}}</span>
    </igx-list-item>
  }
</igx-list>
```

### Adding Avatar and Icons

Combine list directives with [IgxAvatar](layouts/avatar.md) and [IgxIcon](/icon) to add contact photos and actions.

```typescript
import { IgxListModule } from 'igniteui-angular/list';
import { IgxAvatarModule } from 'igniteui-angular/avatar';
import { IgxIconModule } from 'igniteui-angular/icon';

@NgModule({
    ...
    imports: [..., IgxListModule, IgxAvatarModule, IgxIconModule],
})
export class AppModule {}
```

```typescript
public contacts = [{
    name: 'Terrance Orta',
    phone: '770-504-2217',
    photo: 'https://randomuser.me/api/portraits/men/27.jpg',
    isFavorite: false
}];
// ...
```

```html
<igx-list>
  <igx-list-item isHeader="true">Contacts</igx-list-item>
  <igx-list-item #item *ngFor="let contact of contacts;">
      <igx-avatar igxListThumbnail [src]="contact.photo" shape="circle"></igx-avatar>
      <h4 igxListLineTitle>{{ contact.name }}</h4>
      <p igxListLineSubTitle class="phone">{{ contact.phone }}</p>
      <span igxListLine>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, laborum.</span>
      <igx-icon igxListAction [color]="contact.isFavorite ? 'orange' : 'lightgray'" (click)="toggleFavorite(item)">star</igx-icon>
  </igx-list-item>
</igx-list>
```

**Note:** This component uses Material Icons. Add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` to `index.html`.

- `igxListThumbnail` positions media at the beginning of an item.
- `igxListAction` positions an action or metadata at the end of an item.
- `igxListLine` positions text between the thumbnail and action.

Toggle the contact's `isFavorite` value when the icon is clicked:

```typescript
toggleFavorite(item: IgxListItem) {
    const contact = this.contacts[item.index - 1];
    contact.isFavorite = !contact.isFavorite;
}
```

Use `--ig-size` and `IgxButtonGroup` to let users change list density:

```typescript
import { IgxButtonGroupModule } from 'igniteui-angular/button-group';

@NgModule({
    imports: [..., IgxButtonGroupModule]
})
```

```html
<igx-buttongroup [values]="sizes" (selected)="selectSize($event)"></igx-buttongroup>
...
<igx-list>
    ...
</igx-list>
```

```typescript
public size = 'large';
public sizes;

public ngOnInit() {
    this.sizes = [
        { label: 'large', selected: this.size === 'large', togglable: true },
        { label: 'medium', selected: this.size === 'medium', togglable: true },
        { label: 'small', selected: this.size === 'small', togglable: true }
    ];
}

public selectSize(event: any) {
    this.size = this.sizes[event.index].label;
}

@HostBinding('style.--ig-size')
protected get sizeStyle() {
    return `var(--ig-size-${this.size})`;
}
```

### List Items Panning

List item panning can trigger actions such as dialing or deleting. To enable it:

- Set [`allowLeftPanning`](mcp:get_api_reference?platform=angular&component=IgxListComponent&member=allowLeftPanning) and/or [`allowRightPanning`](mcp:get_api_reference?platform=angular&component=IgxListComponent&member=allowRightPanning).
- Define templates for panning directions.
- Handle the panning events.

**Note:** Removing an item is an application task. `IgxList` cannot remove items from the data source because it has no reference to that source.

```html
<igx-list [allowLeftPanning]="true" [allowRightPanning]="true"
  (leftPan)="leftPanPerformed($event)" (rightPan)="rightPanPerformed($event)">
  <ng-template igxListItemLeftPanning>
    <div class="listItemLeftPanningStyle"><igx-icon [color]="white">delete</igx-icon>Delete</div>
  </ng-template>
  <ng-template igxListItemRightPanning>
    <div class="listItemRightPanningStyle"><igx-icon [color]="white">call</igx-icon>Dial</div>
  </ng-template>
  <igx-list-item isHeader="true">Contacts</igx-list-item>
  <igx-list-item #item *ngFor="let contact of contacts">
    <igx-avatar igxListThumbnail [src]="contact.photo" shape="circle"></igx-avatar>
    <h4 igxListLineTitle>{{ contact.name }}</h4>
    <p igxListLineSubTitle class="phone">{{ contact.phone }}</p>
    <igx-icon igxListAction [color]="contact.isFavorite ? 'orange' : 'lightgray'" (click)="toggleFavorite(item)">star</igx-icon>
  </igx-list-item>
</igx-list>
<igx-toast #toast></igx-toast>
```

```css
igx-icon {
    cursor: pointer;
    user-select: none;
}

.listItemLeftPanningStyle {
    display: flex;
    flex-direction: row-reverse;
    background-color:orange;
    color: white;
    width: 100%;
    padding-right: 10px;
    align-items: center;
}

.listItemRightPanningStyle {
    display: flex;
    flex-direction: row;
    background-color:limegreen;
    color: white;
    width: 100%;
    padding-left: 10px;
    align-items: center;
}
```

```typescript
@ViewChild('toast')
public toast: IgxToastComponent;

public rightPanPerformed(args) {
  args.keepItem = true;
  this.toast.message = 'Dialing ' + this.contacts[args.item.index - 1].name;
  this.toast.open();
}

public leftPanPerformed(args) {
  args.keepItem = false;
  setTimeout((idx = args.item.index - 1) => {
    this.toast.message = 'Contact ' + this.contacts[idx].name + ' removed.';
    this.toast.open();
    this.contacts.splice(idx, 1);
  }, 500);
}
```

Panning events are emitted after the threshold is reached. [`panEndTriggeringThreshold`](mcp:get_api_reference?platform=angular&component=IgxListComponent&member=panEndTriggeringThreshold) defaults to `0.5` (50% of an item's width) and can be changed.

```typescript
import { IgxListComponent } from 'igniteui-angular/list';
import { IgxToastComponent } from 'igniteui-angular/toast';

export class ListSample7Component {
    @ViewChild('toast', { static: true })
    public toast: IgxToastComponent;

    @ViewChild('mainIgxList', { static: true })
    public list: IgxListComponent;

    public contacts;
    private dataSource = [{
        isFavorite: false,
        name: 'Terrance Orta',
        phone: '770-504-2217',
        photo: 'assets/images/men/27.jpg'
    }]; // ...

    public rightPanPerformed(args) {
        args.keepItem = true;
        this.toast.open('Dialing ' + this.contacts[args.item.index - 1].name);
    }

    public leftPanPerformed(args) {
        args.keepItem = false;
        setTimeout((idx = args.item.index - 1) => {
            this.toast.open('Contact ' + this.contacts[idx].name + ' removed.');
            this.contacts.splice(idx, 1);
        }, 500);
    }

    public get panThreshold() {
        const result = this.list.panEndTriggeringThreshold;
        return Math.round(result * 100) + '%';
    }
}
```

```html
<div style="width:300px; margin-bottom:20px">
  <igx-slider id="slider" [minValue]="0.1" [maxValue]="0.9" [step]="0.1" [continuous]="true"
  [(ngModel)]="mainIgxList.panEndTriggeringThreshold"></igx-slider>
  <label>Threshold: {{panThreshold}}</label>
</div>
<igx-list [allowLeftPanning]="true" [allowRightPanning]="true" #mainIgxList
  (leftPan)="leftPanPerformed($event)" (rightPan)="rightPanPerformed($event)">
  <ng-template igxListItemLeftPanning><div class="listItemLeftPanningStyle"><igx-icon>delete</igx-icon>Delete</div></ng-template>
  <ng-template igxListItemRightPanning><div class="listItemRightPanningStyle"><igx-icon>call</igx-icon>Dial</div></ng-template>
  <igx-list-item [isHeader]="true">Contacts</igx-list-item>
  @for (contact of contacts; track contact) {
    <igx-list-item #item>
      <igx-avatar igxListThumbnail [src]="contact.photo" shape="circle"></igx-avatar>
      <span igxListLineTitle>{{ contact.name }}</span>
      <span igxListLineSubTitle>{{ contact.phone }}</span>
    </igx-list-item>
  }
</igx-list>
<igx-toast #toast></igx-toast>
```

```scss
.listItemLeftPanningStyle {
    display: flex;
    flex-direction: row-reverse;
    background-color:orange;
    color: white;
    width: 100%;
    padding-right: 10px;
    align-items: center;
}

.listItemRightPanningStyle {
    display: flex;
    flex-direction: row;
    background-color:limegreen;
    color: white;
    width: 100%;
    padding-left: 10px;
    align-items: center;
}
```

## Angular filter list

Bind a search input to `searchContact`, then use `IgxFilterOptions` and the `igxFilter` pipe to filter contacts by name.

```html
<igx-input-group type="search" class="search">
    <igx-prefix><igx-icon>search</igx-icon></igx-prefix>
    <input #search igxInput placeholder="Search Contacts" [(ngModel)]="searchContact"/>
    <igx-suffix *ngIf="search.value.length > 0" (click)="searchContact = null">
        <igx-icon>clear</igx-icon>
    </igx-suffix>
</igx-input-group>
```

Import `IgxFilterModule` and `IgxInputGroupModule`, and provide filtering options with a getter:

```typescript
import { IgxFilterOptions } from 'igniteui-angular/directives';

export class ContactListComponent {
    public searchContact: string;

    get filterContacts(): IgxFilterOptions {
        const fo = new IgxFilterOptions();
        fo.key = 'name';
        fo.inputValue = this.searchContact;
        return fo;
    }
}
```

Apply the pipe to the items:

```html
<igx-list-item *ngFor="let contact of contacts | igxFilter: filterContacts; let i = index">
    ...
</igx-list-item>
```

## List Item Selection

The `selected` property tracks an item's selection state and defaults to `false`. Bind it to a property and toggle it on click:

```typescript
public contacts = [
    {
        isFavorite: false,
        name: 'Terrance Orta',
        phone: '770-504-2217',
        photo: 'assets/images/men/27.jpg',
        selected: false
    }
    // ...
];
```

```html
<igx-list>
  <igx-list-item [isHeader]="true">Contacts</igx-list-item>
  @for (contact of contacts | igxFilter: filterContacts; track contact) {
    <igx-list-item [selected]="contact.selected" (click)="contact.selected = !contact.selected">
      <igx-avatar igxListThumbnail [src]="contact.photo" shape="circle"></igx-avatar>
      <span igxListLineTitle>{{ contact.name }}</span>
      <span igxListLineSubTitle>{{ contact.phone }}</span>
      <igx-icon igxListAction [style.color]="contact.isFavorite ? 'orange' : 'lightgray'" igxRipple="pink"
        [igxRippleCentered]="true" (click)="toggleFavorite(contact, $event)"
        (mousedown)="mousedown($event)">star</igx-icon>
    </igx-list-item>
  }
</igx-list>
```

Selected-item CSS variables include `--item-background-selected`, `--item-text-color-selected`, `--item-title-color-selected`, `--item-action-color-selected`, `--item-subtitle-color-selected`, and `--item-thumbnail-color-selected`.

```scss
igx-list-item {
  --item-background-selected: var(--ig-secondary-500);
  --item-title-color-selected: var(--ig-secondary-500-contrast);
  --item-subtitle-color-selected: var(--ig-info-100);
}
```

The list theming function also exposes parameters for selected-state styling; see `list-theme`.

## Chat Component

This example builds a chat interface using `IgxList`, message templates, and an input field.

```typescript
import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { ContactsService } from './services/contacts.service';
import { IMessage, MessagesService } from './services/messages.service';
import { IgxListComponent } from 'igniteui-angular/list';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-list-chat-sample',
    styleUrls: ['./list-chat-sample.component.scss'],
    templateUrl: './list-chat-sample.component.html'
})
export class ListChatSampleComponent implements AfterViewInit {
    messagesService = inject(MessagesService);
    contactsService = inject(ContactsService);

    @ViewChild('form', { static: true })
    public form: ElementRef;

    @ViewChild('myMessage', { static: true })
    public myMessageTemplate: TemplateRef<any>;

    @ViewChild('othersMessage', { static: true })
    public othersMessageTemplate: TemplateRef<any>;

    public message: string;
    private myId = 4;

    public getMessageTemplate(message: IMessage): TemplateRef<any> {
        if (message.authorId === this.myId) {
            return this.myMessageTemplate;
        }
        return this.othersMessageTemplate;
    }

    public isFirstMessage(messageIndex: number): boolean {
        if (messageIndex === 0) {
            return true;
        }
        const messages = this.messagesService.getMessages();
        if (messageIndex >= messages.length) {
            return false;
        }
        const currentMessage = messages[messageIndex];
        const previousMessage = messages[messageIndex - 1];
        return currentMessage.authorId !== previousMessage.authorId;
    }

    public onMessageKeypress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    public onSendButtonClick() {
        this.sendMessage();
    }

    private sendMessage() {
        this.addMessage(this.message);
        this.message = null;
    }

    private addMessage(message: string) {
        if (message) {
            const messageInstance: IMessage = {
                authorId: this.myId,
                message,
                timestamp: new Date(Date.now())
            };
            this.messagesService.addMessage(messageInstance);
        }
    }

    public ngAfterViewInit() {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        const form = this.form.nativeElement;
        form.scrollTop = form.scrollHeight;
    }
}
```

```html
<form #form class="sample-form">
  <igx-list #list>
    <ng-template #othersMessage let-message="message" let-contact="contact" let-messageIndex="index">
      @if (isFirstMessage(messageIndex)) {
        <igx-list-item class="contact">
          <igx-avatar [src]="contact.photo" shape="circle"></igx-avatar>
          <header class="message__info">
            <h6>{{ contact.name }}</h6>
            <span>{{ message.timestamp | date: "shortTime" }}</span>
          </header>
        </igx-list-item>
      }
      <igx-list-item>
        <div [ngClass]="{ message: true, 'other-message': true, 'other-message--first': isFirstMessage(messageIndex) }">
          <span>{{ message.message }}</span>
        </div>
      </igx-list-item>
    </ng-template>
    <ng-template #myMessage let-message="message" let-messageIndex="index">
      <!-- ... own-message template -->
      <igx-list-item><div class="message own-message"><span>{{ message.message }}</span></div></igx-list-item>
    </ng-template>
    @for (message of messagesService.getMessages(); track message; let i = $index) {
      <ng-container *ngTemplateOutlet="getMessageTemplate(message); context: {
        message: message, contact: contactsService.getContact(message.authorId), index: i
      }"></ng-container>
    }
  </igx-list>
  <div class="overflow-anchor"></div>
  <div class="massage-field">
    <igx-input-group type="box">
      <input igxInput name="newMessage" placeholder="Send message" autocomplete="off"
        [(ngModel)]="message" (keypress)="onMessageKeypress($event)" />
      <button igxSuffix igxIconButton="flat" (click)="onSendButtonClick()">
        <igx-icon name="send" family="material"></igx-icon>
      </button>
    </igx-input-group>
  </div>
</form>
```

```scss
@use "igniteui-angular/theming" as *;

igx-list {
    --ig-spacing-block-small: 0;
    --ig-spacing-block-medium: 0;
    --ig-spacing-block-large: 0;
    --item-background: transparent;
    --border-color: transparent;
    gap: rem(4px);
}

.sample-form {
    overflow-y: scroll;
    overflow-x: auto;
    max-width: rem(400px);
    height: rem(580px);
    background: color(null, surface, 500);
}

.message {
    @include type-style("body-2");
    display: flex;
    align-items: center;
    min-height: rem(32px);
    border-radius: rem(4px);
    padding-inline: rem(16px);
}

.own-message {
    margin-inline-start: auto;
    background-color: color(null, gray, 200);
}

.other-message {
    background-color: color(null, primary, 800);
}
```

## Styling

### List Theme Property Map

Changing a primary property automatically updates related properties. Actual results may vary by theme variant.

| Primary Property | Dependent Property | Description |
| --- | --- | --- |
| **$background** | $header-background | The list header background color. |
|  | $item-background | The list item background color. |
| **$header-background** | $header-text-color | The list header text color. |
| **$item-background** | $background | The list background color. |
|  | $header-background | The list header background color. |
|  | $item-background-hover | The list item hover background color. |
|  | $item-text-color | The list item text color. |
|  | $item-title-color | The list item title color. |
|  | $item-action-color | The list item action color. |
|  | $item-thumbnail-color | The list item thumbnail color. |
|  | $item-subtitle-color | The list item subtitle color. |
|  | $border-color | The list border color. (Fluent/Bootstrap only) |
| **$item-background-hover** | $item-background-active | The active list item background color. |
|  | $item-text-color-hover | The list item hover text color. |
|  | $item-title-color-hover | The list item hover title color. |
|  | $item-action-color-hover | The list item hover action color. |
|  | $item-thumbnail-color-hover | The list item hover thumbnail color. |
|  | $item-subtitle-color-hover | The list item hover subtitle color. |
| **$item-background-active** | $item-background-selected | The selected list item background color. |
|  | $item-text-color-active | The active list item text color. |
|  | $item-title-color-active | The active list item title color. |
|  | $item-action-color-active | The active list item action color. |
|  | $item-thumbnail-color-active | The active list item thumbnail color. |
|  | $item-subtitle-color-active | The active list item subtitle color. |
| **$item-background-selected** | $item-text-color-selected | The selected list item text color. |
|  | $item-title-color-selected | The selected list item title color. |
|  | $item-action-color-selected | The selected list item action color. |
|  | $item-thumbnail-color-selected | The selected list item thumbnail color. |
|  | $item-subtitle-color-selected | The selected list item subtitle color. |

Import the theming index, then extend `list-theme`. The `$background` parameter automatically calculates state colors and contrasting foregrounds; these can also be set manually.

```scss
@use "igniteui-angular/theming" as *;

// IMPORTANT: Prior to Ignite UI for Angular version 13 use:
// @import '~igniteui-angular/lib/core/styles/themes/index';

$my-list-theme: list-theme(
  $background: #57a5cd
);
```

Include the theme:

```scss
:host {
  @include tokens($my-list-theme);
}
```

For all parameters, see `list-theme` and `IgxListComponent Styles`.

### Styling with Tailwind

Set up [Tailwind](/themes/misc/tailwind-classes) and import the utilities. The utility file provides `light` and `dark` variants; use the component name after the prefix, such as `light-list` or `dark-list`.

```scss
@import "tailwindcss";
...
@use 'igniteui-theming/tailwind/utilities/material.css';
```

Override generated variables with arbitrary properties:

```html
<igx-list class="!light-list ![--background:#81B698] ![--item-background:#A3C7B2]">
    ...
</igx-list>
```

**Note:** The exclamation mark (`!`) makes the utility class take precedence over the component's default theme.

```html
<div class="list-sample">
  <igx-list class="!light-list ![--background:#81B698] ![--item-background:#A3C7B2]" #mainIgxList>
    <igx-list-item [isHeader]="true">Contacts</igx-list-item>
    @for (contact of contacts; track contact) {
      <igx-list-item #item>
        <igx-avatar igxListThumbnail [src]="contact.photo" shape="circle"></igx-avatar>
        <span igxListLineTitle>{{ contact.name }}</span>
        <span igxListLineSubTitle>{{ contact.phone }}</span>
        <igx-icon igxListAction [style.color]="contact.isFavorite ? 'orange' : 'lightgray'" igxRipple="white"
          [igxRippleCentered]="true" (click)="toggleFavorite(contact, $event)"
          (mousedown)="mousedown($event)">star</igx-icon>
      </igx-list-item>
    }
  </igx-list>
</div>
```

```scss
@use "layout.scss";
```

## API References

The list supports templated items, filtering, and additional components such as avatars and icons.

- [`IgxList`](mcp:get_api_reference?platform=angular&component=IgxListComponent)
- `IgxListComponent Styles`
- [`IgxListItem`](mcp:get_api_reference?platform=angular&component=IgxListItemComponent)

Additional Angular components:

- [`IgxAvatar`](mcp:get_api_reference?platform=angular&component=IgxAvatarComponent)
- `IgxAvatarComponent Styles`
- [`IgxIcon`](mcp:get_api_reference?platform=angular&component=IgxIconComponent)
- `IgxIconComponent Styles`

## Theming Dependencies

- `IgxRipple Theme`
- `IgxAvatar Theme`

## Additional Resources

Our community is active and always welcoming to new ideas.

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)
