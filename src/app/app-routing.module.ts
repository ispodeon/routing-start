import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

// RouterModule.forRoot(appRoutes)
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [ // use children property for nested routes
      { path: ':id/:name', component: UserComponent }
    ] },
    { 
      path: 'servers', 
      // canActivate:[AuthGuard],  // canActivate allows or prevents from redirecting to this route based on the authorization you provide
      canActivateChild:[AuthGuard],
      component: ServersComponent, 
      children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/:edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] } // candeactivate prevents or allows you to leave the current route
    ] },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' } // redirects to another path // '**' - the wild card route/ catch all 
                                                                          // this must be placed as last route
    
];

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [RouterModule]
})
export class AppRoutingModule {

    
}