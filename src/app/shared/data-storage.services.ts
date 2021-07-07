import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import {map, tap, take, exhaustMap} from'rxjs/operators'
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn:'root'})

export class DataStorageService{
  constructor(private http:HttpClient,private receipeService:RecipeService,private authService:AuthService){

  }

  storeRecipes(){
    const receipes= this.receipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-11c88.firebaseio.com/receipes.json',receipes).subscribe(receipes=>{
      console.log(receipes);
    })
  }

  fetchRecipes(){

    return  this.http.get<Recipe[]>('https://ng-course-recipe-book-11c88.firebaseio.com/receipes.json').
    pipe(map(receipes=>{
      return receipes.map(receipe =>{
        return {...receipe,
          ingredients:Ingredient.length === 0 ? []: receipe.ingredients}
      })
    }),tap(receipes=>{
      this.receipeService.setRecipes(receipes);
    }));

  //  return this.authService.user.pipe(take(1),exhaustMap(user=>{
  //     return  this.http.get<Recipe[]>('https://ng-course-recipe-book-11c88.firebaseio.com/receipes.json')
  //   }),map(receipes=>{
  //     return receipes.map(receipe =>{
  //       return {...receipe,
  //         ingredients:Ingredient.length === 0 ? []: receipe.ingredients}
  //     })
  //   }),tap(receipes=>{
  //     this.receipeService.setRecipes(receipes);
  //   }));
   }
}
