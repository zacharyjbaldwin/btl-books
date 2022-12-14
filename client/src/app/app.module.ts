import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { CreditsModalComponent } from './modals/credits-modal/credits-modal.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookModalComponent } from './modals/add-book-modal/add-book-modal.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { FirstVisitModalComponent } from './modals/first-visit-modal/first-visit-modal.component';
import { BookDetailsModalComponent } from './modals/book-details-modal/book-details-modal.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal/confirm-delete-modal.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { ProfileComponent } from './account/profile/profile.component';
import { OrderHistoryComponent } from './account/order-history/order-history.component';
import { AddressViewComponent } from './account/address-view/address-view.component';
import { LogViewerComponent } from './admin/log-viewer/log-viewer.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { AddAddressModalComponent } from './modals/add-address-modal/add-address-modal.component';
import { EditAccountDetailsModalComponent } from './modals/edit-account-details-modal/edit-account-details-modal.component';
import { AddBookGoogleApiModalComponent } from './modals/add-book-google-api-modal/add-book-google-api-modal.component';
import { OrdersComponent } from './admin/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksCatalogComponent,
    NavbarComponent,
    AdminComponent,
    CreditsModalComponent,
    CartComponent,
    AccountComponent,
    AddBookModalComponent,
    LoginModalComponent,
    FirstVisitModalComponent,
    BookDetailsModalComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    ConfirmDeleteModalComponent,
    ErrorPageComponent,
    UserManagerComponent,
    ProfileComponent,
    OrderHistoryComponent,
    AddressViewComponent,
    OrderViewComponent,
    LogViewerComponent,
    CheckoutComponent,
    OrderCompleteComponent,
    AddAddressModalComponent,
    EditAccountDetailsModalComponent,
    AddBookGoogleApiModalComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    TabsModule.forRoot(),
    HttpClientModule,
    PaginationModule.forRoot(),
    NgxQRCodeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
