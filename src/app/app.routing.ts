import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';
import { EmpOperationComponent } from './emp-operation/emp-operation.component';
import { ShiftOperationComponent } from './shift-operation/shift-operation.component';
import { HomeComponent } from './home/home.component';


export const AppRoutes: Routes = [
    { path: 'shift', component: ShiftScheduleComponent },
    { path: 'empOp', component: EmpOperationComponent },
    { path: 'shiftOp', component: ShiftOperationComponent },
    { path: '', component: HomeComponent }
];
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
