import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,smile,gender';
  
  constructor(private http : Http) { }

  getPersonne(imageUrl : string){
    
    const headers = new Headers ({'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key':'34600182027a455e900e027661b3b31b'}) ;
    const options = new RequestOptions ({headers});
    return this.http.post(this.url,{url : imageUrl},options)
    
    


  }

}
