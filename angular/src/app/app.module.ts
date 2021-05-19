import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { WebshopComponent } from './webshop/webshop.component';
import { RestockComponent } from './restock/restock.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ListNewComponent } from './list-new/list-new.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorComponent,
    LoginComponent,
    WebshopComponent,
    RestockComponent,
    TransactionComponent,
    ListNewComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
