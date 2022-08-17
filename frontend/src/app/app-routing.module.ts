import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogEntryComponent } from './components/blog-entry/create-blog-entry/create-blog-entry.component';
import { ViewBlogEntryComponent } from './components/blog-entry/view-blog-entry/view-blog-entry.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserProfileComponent } from './components/user/update-user-profile/update-user-profile.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UsersComponent } from './components/user/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: ':id',
        component: UserProfileComponent
      }
    ]
  },
  {
    path: 'update-profile',
    component: UpdateUserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog-entries/:id',
    component: ViewBlogEntryComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create-blog-entry',
    component: CreateBlogEntryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
