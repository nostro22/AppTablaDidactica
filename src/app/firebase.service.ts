import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private router:Router,private toastCtrl: ToastController, private loadingCtrl: LoadingController,) {}
  public usuarioAutenticado: any;

  async login(email: string, password: string) {
    try {
      const validado = await firebase.auth().signInWithEmailAndPassword(email,password );
       this.showLoading('Ingresando');

      if (validado) {
        // Validation successful
        this.usuarioAutenticado=firebase.auth().currentUser;
        this.router.navigateByUrl('home', { replaceUrl: true });
      } else {
        // Validation failed
        this.toastNotification('Llene ambos campos correo electrónico y clave');
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          this.toastNotification('El usuario no se encuentra registrado.');
          break;
        case 'auth/wrong-password':
          this.toastNotification('Combinación de clave y correo electrónico errónea.');
          break;
        default:
          this.toastNotification('Ocurrió un error durante el inicio de sesión.');
          break;
      }
    }
  }

  async toastNotification(mensaje: any) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'middle',
      icon: 'alert-outline',
      color: 'danger'
    });
    (await toast).present();
  }
  logout(){
    firebase.auth().signOut().then(()=>{
      this.router.navigateByUrl('log',{replaceUrl:true});
    });
  }
  async getUser(){
   return firebase.auth().currentUser
  }

  async showLoading(mensaje:string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 3000,
      translucent:true,
      cssClass: 'custom-loading',
      showBackdrop: false,
      backdropDismiss:false,
      
      
    });
    loading.present();
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
  }
}
