import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from '@angular/router'

const appRoutes: Routes=[
  {path:'',redirectTo:'/receipes',pathMatch:'full'},
  {path:'receipes',loadChildren:'./recipes/recipe.module#RecipesModule'}, // Lazy Loading Module because we use loadchilderen
  {path:'shopping-list',loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'}, // Lazy Loading Module because we use loadchilderen
  {path:'auth',loadChildren:'./auth/auth.module#AuthModule'} // Lazy Loading Module because we use loadchilderen
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})
  ],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
