import { Router, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DatasetDetailComponent} from './components/user/datasetDetail/dataset-detail.component';
import {DashboardComponent} from './components/user/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';
import {DatasetsComponent} from './components/user/datasets/datasets.component';
import {SettingsComponent} from './components/user/settings/settings.component';
import {RegisterComponent} from './components/admin/register/register.component';

const routes: Routes = [
  // Main page
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // User pages
  // {path: 'register', component: RegisterComponent},
  {path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}
  },
  {path: 'datasets',
    component: DatasetsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}
  },
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.USER,Role.ADMIN]}
  },
  {path: 'settings',
  component: SettingsComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.USER]}
  },
  {path: 'detail', component: DatasetDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}},
  {path: 'detail/:id', component: DatasetDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}},

  // admin panel
  {path: 'user-list',
  component: UserListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },{path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },

  // error pages
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];

export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  };
}

  static getRouts() {
    return routes;
  }
}
