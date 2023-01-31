import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DoneListComponent } from './components/done-list/done-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DoneListComponent,
    HeaderComponent,
    ButtonComponent,
    TodoItemComponent,
  ],
  imports: [BrowserModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
