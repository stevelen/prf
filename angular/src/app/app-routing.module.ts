import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { ListNewComponent } from './list-new/list-new.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestockComponent } from './restock/restock.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WebshopComponent } from './webshop/webshop.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'webshop', component: WebshopComponent, canActivate: [AuthGuard]},
  {path: 'restock', component: RestockComponent, canActivate: [AuthGuard]},
  {path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard]},
  {path: 'list-new', component: ListNewComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
