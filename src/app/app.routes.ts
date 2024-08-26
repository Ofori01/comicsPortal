import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AppComponent,
        children: [
            {
                path: '',
                pathMatch:'full',
                loadChildren: ()=> import('./pages/home/home.module').then((m)=>m.HomeModule)
            }
        ]
    }
];
