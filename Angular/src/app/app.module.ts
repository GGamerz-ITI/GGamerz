import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { FormMainInfoComponent } from './components/register/form-main-info/form-main-info.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { NotfoundComponent } from './components/errors/notfound/notfound.component';

import { ToastrModule } from 'ngx-toastr';
import { OrdersComponent } from './components/orders/orders.component';
import { MatToolbarModule } from '@angular/material/toolbar';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { WidgetComponent } from './components/dashboard/widget/widget.component';
// import { ChartoneComponent } from './components/dashboard/chartone/chartone.component';
import { TitleComponent } from './components/dashboard/title/title.component';
import { UsersTableComponent } from './components/dashboard/users/users-table/users-table.component';
// import { MatSidenavModule } from '@angular/material/select';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { CreditCardComponent } from './components/payment/credit-card/credit-card.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { DashboardOrdersComponent } from './components/dashboard/dashboard-orders/dashboard-orders.component';
import { AcceptedOrdersComponent } from './components/dashboard/dashboard-orders/accepted-orders/accepted-orders.component';
import { RejectedOrdersComponent } from './components/dashboard/dashboard-orders/rejected-orders/rejected-orders.component';
import { PendingOrdersComponent } from './components/dashboard/dashboard-orders/pending-orders/pending-orders.component';
import { DashboardProductsComponent } from './components/dashboard/dashboard-products/dashboard-products.component';
import { DashboardProductDetailsComponent } from './components/dashboard/dashboard-product-details/dashboard-product-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CreateProductComponent } from './components/dashboard/create-product/create-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameShowComponent } from './components/game-show/game-show.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { GalleryModule } from 'ng-gallery';
import { UserUpdateService } from './services/emitters.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ChartTwoComponent } from './components/dashboard/chart-two/chart-two.component';
import { UpdateProductComponent } from './components/dashboard/update-product/update-product.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserComponent } from './components/user/user.component';
import { FilteredUsersComponent } from './components/filtered-users/filtered-users.component';
import { NewsComponent } from './components/news/news.component';
import { DashboardAnnouncementsComponent } from './components/dashboard/dashboard-announcements/dashboard-announcements.component';
// import { AnnouncementDetailsComponent } from './components/dashboard/announcement-details/announcement-details.component';
import { CreateAnnouncementComponent } from './components/dashboard/create-announcement/create-announcement.component';
import { UpdateAnnouncementComponent } from './components/dashboard/update-announcement/update-announcement.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { ResendVerificationComponent } from './components/resend-verification/resend-verification.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardCouponsComponent } from './components/dashboard/dashboard-coupons/dashboard-coupons.component';
import { CreateCouponComponent } from './components/dashboard/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './components/dashboard/update-coupon/update-coupon.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



@NgModule({
  declarations: [
    DashboardCouponsComponent,
    AppComponent,
    HomeCardsComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    FormMainInfoComponent,
    AllGamesComponent,
    ChartComponent,
    LoginComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    ForbiddenComponent,
    NotfoundComponent,
    OrdersComponent,
    OrderItemComponent,
    CreditCardComponent,

    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    WidgetComponent,
    // ChartoneComponent,
    TitleComponent,
    UsersTableComponent,
    UserNavComponent,
    DashboardHomeComponent,
    PaymentComponent,
    DashboardOrdersComponent,
    AcceptedOrdersComponent,
    RejectedOrdersComponent,
    PendingOrdersComponent,
    DashboardProductsComponent,
    DashboardProductDetailsComponent,
    LoadingComponent,
    CreateProductComponent,
    ProfileComponent,
    GameShowComponent,
    DashboardProductDetailsComponent,

    AboutUsComponent,
    ChartTwoComponent,
    UpdateProductComponent,
    FeedbackComponent,
    UserComponent,
    FilteredUsersComponent,
    NewsComponent,
    DashboardAnnouncementsComponent,
    // AnnouncementDetailsComponent,
    ResendVerificationComponent,
    VerifyEmailComponent,
    DashboardCouponsComponent,
    CreateCouponComponent,
    UpdateCouponComponent,
    CreateAnnouncementComponent,
    UpdateAnnouncementComponent,
    UserReviewsComponent,
    ResetPasswordComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    ColorPickerModule,
    GalleryModule
  ],
  providers: [UserUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class HomeCardsModule { }
