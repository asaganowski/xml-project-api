import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./xml/xml.routes').then(m => m.XML_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/'
  }
];