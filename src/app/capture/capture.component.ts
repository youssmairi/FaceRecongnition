import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {VerifyService} from '../verify.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent  {
  
  imageUrl1:string;
  imageUrl2:string;
  personnes : any = [];
  comparisation: any = [];

  @ViewChild("visualization") visualization: ElementRef;
  @ViewChild('img') img: ElementRef;

  private context: CanvasRenderingContext2D;
  private element: HTMLImageElement;

  src: string;
  imgWidth: number;
  imgHeight: number;
  raduis : number ;
  isIdentical;
  personTrue ;
  j;


  constructor(private data :DataService, private dataVerify : VerifyService) {
   //http://cdn01.cdn.justjared.com/wp-content/uploads/2013/12/dicaprio-parispc/leonardo-dicaprio-wolf-of-wall-street-paris-photo-call-06.jpg
    this.src = 'https://www.indiewire.com/wp-content/uploads/2018/07/Screen-Shot-2018-07-18-at-2.49.03-PM.png';
    this.imgWidth = 600;
    this.imgHeight= 400;
    
  }

  ngAfterViewInit() {
    

    this.context = this.visualization.nativeElement.getContext("2d");
    this.element = this.img.nativeElement;
   // this.raduis = this.element.height/this.element.width;
   
   // this.imgHeight = this.raduis * this.imgWidth;
    

    
  }


  afterLoading(){
    
    this.element = this.img.nativeElement;
    
   
    console.log('raduis est'+this.raduis);
    console.log("largeur de l'img :"+this.element.width);
    console.log("hauteur de l'img :"+this.element.height);
    
    

    
    this.context.clearRect(0, 0, this.imgWidth,this.imgHeight);
    console.log('drawImage');
    // this prints an image element with src I gave
    console.log(this.element);
    this.context.drawImage(this.element,0,0, this.imgWidth,this.imgHeight);
    
  }

  getPersonne(imageUrl:string){
    this.personTrue =100;
    this.j=0;
    this.data.getPersonne(imageUrl).subscribe(data  =>{
      this.personnes = data.json() ;
      console.log(this.personnes);

      for (let i = 0; i < this.personnes.length; i++) {

        const personne = this.personnes[i];
  
        var x, y, rectW, rectH;
         x     = (personne.faceRectangle.left / this.element.width) * this.imgWidth;
         y     = (personne.faceRectangle.top / this.element.height) * this.imgHeight;
         rectW = (personne.faceRectangle.width / this.element.width) * this.imgWidth;
         rectH = (personne.faceRectangle.height / this.element.height) * this.imgHeight;
  
  
        //console.log('top est'+personne.faceRectangle.top)
        this.context.rect(x,y,rectH,rectW);
        this.context.stroke(); 
        this.verifyPersonne('ab86d255-0059-46eb-8377-558365faf0e2',personne.faceId);
        
        
      }
      
      
      

    })
    
  }
  verifyPersonne(id1,id2 : string){
    this.dataVerify.verifyPersonne(id1,id2).subscribe(data  =>{
      this.comparisation = data.json() ;
      
      ;
      console.log(this.comparisation);
      console.log(this.comparisation.isIdentical);
        if (this.comparisation.isIdentical) {
          this.personTrue=this.j;
        }
        
       console.log(this.personTrue)
       this.j++
    });
  }


}
