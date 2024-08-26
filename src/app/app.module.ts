import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
