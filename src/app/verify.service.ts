import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';
  
  constructor(private http : Http) { }

  verifyPersonne(id1,id2 : string){
    
    const headers = new Headers ({'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key':'34600182027a455e900e027661b3b31b'}) ;
    const options = new RequestOptions ({headers});
    return this.http.post(this.url,{faceId1: id1, faceId2: id2},options)
    
    


  }
}
