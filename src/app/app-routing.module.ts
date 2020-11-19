import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BurnComponent } from './burn/burn.component';
import { RebaseComponent } from './rebase/rebase.component';
import { ForestListComponent } from './forest-list/forest-list.component';
import { ForestComponent } from './forest/forest.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'forests',
    component: ForestListComponent,
    pathMatch: 'full'
  },
  {
    path: 'forests/:id',
    component: ForestComponent
  },
  {
    path: 'burn',
    component: BurnComponent
  },
  {
    path: 'rebase',
    component: RebaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
