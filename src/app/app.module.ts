import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FancyButtonComponent } from './components/fancy-button/fancy-button.component';
import { FormsModule } from '@angular/forms';
import { AddTaskButton } from './components/add-task-button/add-task-button.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { DoneIndicatorComponent } from './components/done-indicator/done-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoItemComponent,
    MainContentComponent,
    FancyButtonComponent,
    AddTaskButton,
    AddTaskDialogComponent,
    DoneIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
