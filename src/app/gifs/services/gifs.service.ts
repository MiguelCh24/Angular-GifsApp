import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = 'h9fxWB39jVMMNkMn7pmucr2DfWAFJQuF'
  private gifUrl: string = 'http://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get historial() {

    return [...this._historial];

  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }

  }


  insertargifs(consulta: string) {

    consulta = consulta.trim().toLowerCase()

    if (!this._historial.includes(consulta)) {
      this._historial.unshift(consulta);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this.historial));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', consulta)

    this.http.get<SearchGifsResponse>(`${this.gifUrl}/search`, { params }).subscribe((rta: any) => {

      this.resultados = rta.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }
    )
  }
}
