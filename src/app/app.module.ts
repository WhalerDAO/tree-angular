import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BurnComponent } from './burn/burn.component';
import { RebaseComponent } from './rebase/rebase.component';
import { HeaderComponent } from './header/header.component';
import { ForestListComponent } from './forest-list/forest-list.component';
import { ForestComponent } from './forest/forest.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BurnComponent,
    RebaseComponent,
    HeaderComponent,
    ForestListComponent,
    ForestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
