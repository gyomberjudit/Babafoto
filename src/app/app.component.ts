import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { get, getDatabase, set, ref, update, child, push, list, query } from '@angular/fire/database';
import { Observable } from 'rxjs';

interface Gyerek {
  neve:string, kora:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fotozas';

  gyerekek:Gyerek[] = [{neve:"", kora:""}];
  rejt:boolean = true;
  mutat:boolean = false;
  nagykep:string = "";
  index:number = 0;
  nev:string;
  email:string;
  tel:string;
  csomag:string;
  text:string;

  kepek:string[] = ["../assets/images/baba1.jfif", "../assets/images/baba25.jpg",  "../assets/images/baba3.jpg", 
                    "../assets/images/baba26.jpg", "../assets/images/baba27.jpg", "../assets/images/baba28.jpg", 
                    "../assets/images/baba7.jpg", "../assets/images/baba8.jpg", "../assets/images/baba29.jpg",
                    "../assets/images/baba9.png", "../assets/images/baba2.jpeg", "../assets/images/baba36.jpg", 
                    "../assets/images/baba30.jpg", "../assets/images/baba23.jpg", "../assets/images/baba35.jpg", 
                    "../assets/images/baba32.jpg", "../assets/images/baba33.jpg", "../assets/images/baba24.jpg", 
                    "../assets/images/baba34.jpg", "../assets/images/baba17.jpg", "../assets/images/gyermek1.jfif",
                    "../assets/images/gyermek2.jpg", "../assets/images/gyermek3.jpg", "../assets/images/gyermek4.jfif", 
                    "../assets/images/gyermek5.jfif",  "../assets/images/gyermek12.jfif", "../assets/images/gyermek8.jpg", 
                    "../assets/images/gyermek6.jfif", "../assets/images/gyermek10.jfif", "../assets/images/gyermek11.jfif", 
                    "../assets/images/gyermek15.jpg", "../assets/images/kültéri.jpg", "../assets/images/kültéri3.jfif", 
                    "../assets/images/kültéri7.jpg", "../assets/images/kültéri6.jpg", "../assets/images/kültéri4.jfif",
                    "../assets/images/kültéri5.jpg","../assets/images/kültéri9.jpg", "../assets/images/kültéri8.jfif",
                    "../assets/images/családi4.jpg", "../assets/images/családi2.jpg",  "../assets/images/családi1.jpg", 
                    "../assets/images/családi3.jpg", "../assets/images/családi5.jpg", "../assets/images/családi9.jpg", 
                    "../assets/images/családi7.jpg", "../assets/images/családi8.jpg" 
                   ];

  babakepek = this.kepek.filter( x => x.includes('baba') );
  gyermekkepek = this.kepek.filter( x => x.includes('gyermek') );
  kulterikepek = this.kepek.filter( x => x.includes('kültéri') );
  csaladikepek = this.kepek.filter( x => x.includes('családi') );

  erdeklodok: Observable<any>;
  le: number

  constructor(private db: AngularFireDatabase){
    this.erdeklodok = db.object('rekord').valueChanges();
    this.erdeklodok.subscribe(result => {this.le = result.length});
  }

  pluszgyerek(){
    this.gyerekek.push({neve:"", kora:""})
  }

  galeria(i:number){
    this.mutat = !this.mutat;
    this.index = i;
    this.nagykep = this.kepek[i];
  }

  balra(){
     if(this.index > 0) this.index = this.index-1;
     this.nagykep = this.kepek[this.index];
  }

  jobbra(){
     if(this.index < this.kepek.length-1) this.index = this.index+1;
     this.nagykep = this.kepek[this.index];
  }


  kiir(adat:any){
  // console.log(this.le);
  //  console.log(adat);
    let email2 = adat.email.replace('.', '_')
    this.db.object("rekord/"+ this.le).set(adat);
  }

}


