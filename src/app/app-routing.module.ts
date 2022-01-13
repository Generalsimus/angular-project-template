import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersListViewComponent } from './pages/users-list-view/users-list-view.component';

const routes: Routes = [
  {
    path: "",
    component: UsersListViewComponent,
    pathMatch: "full"
  }, {
    path: "users",
    component: UsersListViewComponent
  }, {
    path: "users/:userId",
    component: UserProfileComponent,
    pathMatch: "full"
  },
  {
    path: "users/:userId/:posts",
    component: UserProfileComponent,
    pathMatch: "full"
  }
];

// { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
