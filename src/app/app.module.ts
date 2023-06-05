import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import {
  AngularFireFunctionsModule,
  AngularFireFunctions,
} from '@angular/fire/compat/functions';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { GenerateComponent } from './generate/generate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    PhotoEditorComponent,
    GenerateComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
