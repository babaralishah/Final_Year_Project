import { ChartsModule } from 'ng2-charts';
import { RestService } from './Services/rest.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { ReportsComponent } from './reports/reports.component';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyBfmUJKcrqkuMbxZ73KMrTAcAggMdLleMg",
  authDomain: "testwhatsapp-pxqrtl.firebaseapp.com",
  databaseURL: "https://testwhatsapp-pxqrtl.firebaseio.com",
  projectId: "testwhatsapp-pxqrtl",
  storageBucket: "testwhatsapp-pxqrtl.appspot.com",
  messagingSenderId: "380337334969",
  appId: "1:380337334969:web:781d7057c53e771b078968",
  measurementId: "G-P6ZKE6C73N"
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    VisualizationComponent,
    ReportsComponent
  ],
  imports: [// 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    NgxCsvParserModule
    // MaterialModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
