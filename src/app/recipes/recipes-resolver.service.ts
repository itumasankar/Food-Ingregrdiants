import { Recipe } from "./recipe.model";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { RecipeService } from "./recipe.service";

import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.services";

@Injectable({providedIn:'root'})

export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageServices:DataStorageService, private recipeService:RecipeService){}
  resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
   const recipes = this.recipeService.getRecipes();
    if(recipes.length ===0){
      console.log("Db memory");

      return this.dataStorageServices.fetchRecipes();
    }
    else{
      console.log("InLine memory");

      return recipes;
    }
  }

}
