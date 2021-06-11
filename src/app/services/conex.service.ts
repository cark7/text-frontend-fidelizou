import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Cervejaria } from './cervejaria';
@Injectable({
  providedIn: 'root'
})
export class ConexService {

  
  constructor(
    private http: HttpClient,
  ) { }
  //url = "http://localhost:3000/random/12";
  url = "http://localhost:3000";
  getlista(){
    let response;
    try {
      response = this.http.get<Cervejaria[]>(`${this.url}`);
      console.log("respuesta:" + response)
    } catch (error) {
      console.log("error:" + error)
    }
    return response;
  }

}
