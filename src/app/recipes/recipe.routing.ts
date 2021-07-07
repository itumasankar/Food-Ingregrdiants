import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth-guard";
import { Routes, RouterModule, ROUTES } from "@angular/router";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { NgModule } from "@angular/core";

const RecipeRouting:Routes=[
  {path:'',component:RecipesComponent,
  canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent
    ,resolve: [RecipeResolverService]},
    {path:':id/edit',component:RecipeEditComponent,
    resolve: [RecipeResolverService]}
  ]}
]

@NgModule({
  imports:[RouterModule.forChild(RecipeRouting)],
  exports:[RouterModule]
})
export class RecipesRoutingModule{

}
