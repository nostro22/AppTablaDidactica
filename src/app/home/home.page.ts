import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Capacitor, Plugin } from '@capacitor/core';
import { PathLike } from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  providers: [ScreenOrientation]
})
export class HomePage {
  user?: any;
  nombre?: string = "";
  seleccion?: any;
  idioma?: any;
  isCategoria=1;
  iconoSelecionadoPath = "../../assets/iconos/spain.svg";
  iconoSelecionadoPathCategoria ="../../assets/iconos/iconoAnimales.svg";


  colores = [
    { id: '1', label: 'Color 1', foto: '../../assets/colors/blue.png', nombreAudio: 'blue.ogg' },
    { id: '2', label: 'green', foto: '../../assets/colors/green.png', nombreAudio: 'green.ogg' },
    { id: '3', label: 'Color 3', foto: '../../assets/colors/orange.png', nombreAudio: 'orange.ogg' },
    { id: '4', label: 'Color 4', foto: '../../assets/colors/pink.png', nombreAudio: 'pink.ogg' },
    { id: '5', label: 'Color 5', foto: '../../assets/colors/red.png', nombreAudio: 'red.ogg' },
    { id: '6', label: 'Color 6', foto: '../../assets/colors/yellow.png', nombreAudio: 'yellow.ogg' }];
  animales = [
    { id: '1', label: 'bear 1', foto: '../../assets/animales/bear.png', nombreAudio: 'bear.ogg' },
    { id: '3', label: 'bunny 3', foto: '../../assets/animales/bunny.png', nombreAudio: 'bunny.ogg' },
    { id: '4', label: 'elephant 4', foto: '../../assets/animales/elephant.png', nombreAudio: 'elephant.ogg' },
    { id: '5', label: 'fox 5', foto: '../../assets/animales/fox.png', nombreAudio: 'fox.ogg' },
    { id: '2', label: 'lion 2', foto: '../../assets/animales/lion.png', nombreAudio: 'lion.ogg' },
    { id: '6', label: 'piggy 6', foto: '../../assets/animales/piggy.png', nombreAudio: 'piggy.ogg' }];
  numeros = [
    { id: '1', label: 'Cuenta 1', foto: '../../assets/numeros/1.png', nombreAudio: '1.ogg' },
    { id: '2', label: 'Cuenta 2', foto: '../../assets/numeros/2.png', nombreAudio: '2.ogg' },
    { id: '3', label: 'Cuenta 3', foto: '../../assets/numeros/3.png', nombreAudio: '3.ogg' },
    { id: '4', label: 'Cuenta 4', foto: '../../assets/numeros/4.png', nombreAudio: '4.ogg' },
    { id: '5', label: 'Cuenta 5', foto: '../../assets/numeros/5.png', nombreAudio: '5.ogg' },
    { id: '6', label: 'Cuenta 6', foto: '../../assets/numeros/6.png', nombreAudio: '6.ogg' }];


  isPortrait?: boolean;

  constructor(private aut: FirebaseService, private router: Router) {

  }

  toMyLog(){
    this.aut.showLoading("").then(()=>
    this.aut.logout());
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = firebase.auth().currentUser;
    });
    window.screen.orientation.unlock();
    this.idioma = "spanish";
    this.seleccion = this.animales;
    this.isPortrait = this.isInPortrait();
    screen.orientation.onchange = () => {
      console.log(screen.orientation.type);
      this.isInPortrait();
    };
  }

  isInPortrait() {
    return this.isPortrait = screen.orientation.type.includes("portrait");
  }

  getEmailPrefix(email: string): string {
    const parts = email.split("@");
    return parts[0];
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/log']);
    });
  }



  playAudio(nombreAudio: string) {
    let carpetaRuta = "";
    let carpetaIdioma = "";
    if (this.seleccion == this.animales) {
      carpetaRuta = "animales/";
    }
    else if (this.seleccion == this.numeros) {
      carpetaRuta = "numeros/";
    }
    else {
      carpetaRuta = "colors/";
    }
    if (this.idioma == "spanish") {
      carpetaIdioma = "spanish/";
    }
    else if (this.idioma == "ingles") {
      carpetaIdioma = "ingles/";
    }
    else {
      carpetaIdioma = "portugues/";
    }
    const audioFile = '../../assets/' + carpetaRuta + carpetaIdioma + nombreAudio;
    
    
      const audio = new Audio(audioFile);
      audio.play();
  }


  cambiar(idioma: string) {
    if (idioma == "spanish") {
      this.iconoSelecionadoPath = '../../assets/iconos/spain.svg';
      this.idioma = "spanish";
    }
    else if (idioma == "ingles") {
      this.iconoSelecionadoPath = '../../assets/iconos/usa.svg';
      this.idioma = "ingles";
    }
    else {
      this.iconoSelecionadoPath = '../../assets/iconos/portugal.svg';
      this.idioma = "portugues";
    }
  }
  cambiarCategoria(categoria: string) {
    if (categoria == "animales") {
      this.iconoSelecionadoPathCategoria = "../../assets/iconos/iconoAnimales.svg";
      this.seleccion = this.animales;
      this.isCategoria=1;
    }
    else if (categoria == "numeros") {
      this.iconoSelecionadoPathCategoria = "../../assets/iconos/iconoNumeros.svg";
      this.seleccion = this.numeros;
      this.isCategoria=2;
    }
    else {
      this.iconoSelecionadoPathCategoria = "../../assets/iconos/iconoColores.svg";
      this.seleccion = this.colores;
      this.isCategoria=3;
    }
  }



  

}




