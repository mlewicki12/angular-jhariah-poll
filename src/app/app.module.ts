import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageComponent } from './components/image/image.component';
import { PollComponent } from './components/poll/poll.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firestoreConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
