import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error:string =null;
  @ViewChild(PlaceholderDirective)alertHost:PlaceholderDirective;
  closeSubscription:Subscription;

  constructor(private authService:AuthService,private router:Router,
    private componentFactoryReslover:ComponentFactoryResolver){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(!form.valid){
      return ;
    }
    console.log(form.value);
    let authObs :Observable<AuthResponseData>;

    if(!this.isLoginMode){
      authObs  = this.authService.signUp(email,password);
    }else{
      authObs  = this.authService.login(email,password);
    }

    authObs.subscribe(response=>{
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/receipes']);
    },errorMessage =>{
      this.error = errorMessage;
      this.showAlert(errorMessage);
      this.isLoading = false;
      console.log(errorMessage);
    });
    form.reset();
  }
  onHandleError(){
    this.error =null;
  }

  showAlert(message:string){
   const alertComponentFactory = this.componentFactoryReslover.resolveComponentFactory(AlertComponent);
   const hostViewContainerRef = this.alertHost.viewContainerRef;
   hostViewContainerRef.clear();

  const componentRef= hostViewContainerRef.createComponent(alertComponentFactory);
  componentRef.instance.message = message;
  this.closeSubscription =componentRef.instance.close.subscribe(()=>{
    this.closeSubscription.unsubscribe();
    hostViewContainerRef.clear();
  })

  }

  ngOnDestroy(): void {
    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
  }
}
