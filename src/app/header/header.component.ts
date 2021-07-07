import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.services';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  private userSub : Subscription;
  isAuthenticated: boolean = false;
  constructor(private dataStorge:DataStorageService,private authService:AuthService){}

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  ngOnInit(){
    console.log("sdsdfsdf")
    this.userSub =this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onSaveData(){
    this.dataStorge.storeRecipes();
  }

  onGetData(){
    this.dataStorge.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.logOut();
  }
}
