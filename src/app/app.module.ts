import { NgModule } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareHolderDetailsComponent } from './share-holder-details/share-holder-details.component';
import { ShowSettlementsAndRequestsComponent } from './show-settlements-and-requests/show-settlements-and-requests.component';
import { ShareValuesComponent } from './share-values/share-values.component';
 
const routes: Routes = [
  {
    path: '',
    component: ShareHolderDetailsComponent
  },
  {
    path: 'settlements-and-requests',
    component: ShowSettlementsAndRequestsComponent
  },
  {
    path: 'share-values',
    component: ShareValuesComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    ShareHolderDetailsComponent,
    ShowSettlementsAndRequestsComponent,
    ShareValuesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    NgxChartsModule, 
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule 
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
