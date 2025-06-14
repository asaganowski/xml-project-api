
import { Routes } from '@angular/router';
import { XmlListComponent } from './components/xml-list/xml-list.component';

export const XML_ROUTES: Routes = [
  {
    path: '',
    component: XmlListComponent,
    children: [
      // {
      //   path: 'start-view',
      //   component: StartViewComponent,
      // },
      // {
      //   path: 'user-profile',
      //   loadChildren: () =>
      //     import('../user-profile/user-profile.routes').then(
      //       (m) => m.USER_PROFILE
      //     ),
      // },
      {
        path: '',
        redirectTo: 'start-view',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
