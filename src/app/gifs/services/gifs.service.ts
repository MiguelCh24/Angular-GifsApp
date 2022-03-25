import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = 'h9fxWB39jVMMNkMn7pmucr2DfWAFJQuF'
  private _historial: string[] = [];


  get historial() {

    return [...this._historial];

  }

  constructor(private http: HttpClient) { }


  insertargifs(consulta: string) {

    consulta = consulta.trim().toLowerCase()

    if (!this._historial.includes(consulta)) {
      this._historial.unshift(consulta);
      this._historial = this._historial.splice(0, 10)
    }
    console.log(this._historial)

    this.http.get('http://api.giphy.com/v1/gifs/search?api_key=h9fxWB39jVMMNkMn7pmucr2DfWAFJQuF&q=matrix').subscribe(rta => console.log(rta))

  }
}
