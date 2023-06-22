import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { NotfoundComponent } from './components/errors/notfound/notfound.component';

import { DashboardComponent } from './components/dashboard/dashboard.component'
import { UsersTableComponent } from './components/dashboard/users/users-table/users-table.component';
import { DashboardProductsComponent } from './components/dashboard/dashboard-products/dashboard-products.component';
import { DashboardProductDetailsComponent } from './components/dashboard/dashboard-product-details/dashboard-product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameShowComponent } from './components/game-show/game-show.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { DashboardOrdersComponent } from './components/dashboard/dashboard-orders/dashboard-orders.component';
import { CreateProductComponent } from './components/dashboard/create-product/create-product.component';
import { UpdateProductComponent } from './components/dashboard/update-product/update-product.component';
import { UserComponent } from './components/user/user.component';
import { FilteredUsersComponent } from './components/filtered-users/filtered-users.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardCouponsComponent } from './components/dashboard/dashboard-coupons/dashboard-coupons.component';
import { CreateCouponComponent } from './components/dashboard/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './components/dashboard/update-coupon/update-coupon.component';


const routes: Routes = [

  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'verify', component:VerifyEmailComponent},
  // All users + guests
  {
    path: "",
    canActivate:[UserGuard],
    canActivateChild:[UserGuard],
    children:[
      {path:'', component:HomeComponent},
      {path:'games',component:AllGamesComponent},
      {path:'games/:id',component:GameShowComponent},
      {path:'cart',component:CartComponent},
      {path:'filteruser', component:FilteredUsersComponent},
      {path:'verification/re-send',component:ResendVerificationComponent},

      // Only logged in users
      {
        path: "",
        canActivate:[AuthGuard,UserGuard],
        canActivateChild: [AuthGuard,UserGuard],
        children:[
          {path:'payment',component:PaymentComponent},
          {path:'orders',component:OrdersComponent},
          {path:'profile',component:ProfileComponent},
          {path:'users/:id',component:UserComponent},

        ]
      },
    ]
  },


  // Only Admins Routes
  {
    path:'dashboard',
    canActivate: [AdminGuard],
    canActivateChild:[AdminGuard],
    component:DashboardComponent,
    children: [
      {path:'', component:DashboardHomeComponent},
      {path:'users', component:UsersTableComponent},
      {path:'games',component:DashboardProductsComponent},
      {path:'games/add',component:CreateProductComponent},
      {path:'orders',component:DashboardOrdersComponent},
      {path:'games/:id',component:DashboardProductDetailsComponent},
      {path:'games/update/:id',component:UpdateProductComponent},
      {path:'coupons', component:DashboardCouponsComponent},
      {path:'coupons/add', component:CreateCouponComponent},
      {path:'coupons/update/:id',component:UpdateCouponComponent},
    ]
  },


  // Error routes
  { path: '403', component: ForbiddenComponent },

  // Other PAths
  { path: '**', component: NotfoundComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
