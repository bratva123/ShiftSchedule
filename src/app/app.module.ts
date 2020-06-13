import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpDetailComponent } from './emp-detail/emp-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';
import { EmpOperationComponent } from './emp-operation/emp-operation.component';
import { ShiftOperationComponent } from './shift-operation/shift-operation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpDetailComponent,
    NotFoundComponent,
    ShiftScheduleComponent,
    EmpOperationComponent,
    ShiftOperationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ROUTING,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
