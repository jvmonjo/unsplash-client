import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '../models/image.interface';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  api_url: string = 'https://api.unsplash.com'
  headers = {
    Authorization: 'Client-ID 3Tru75ntRO1zneWdUtRPEAz1o1FepMggoxAhOLadTGY'
  }

  options = {
    headers: new HttpHeaders(this.headers)
  }

  constructor(private http: HttpClient) { }

  getImagesByKeyWord(keyWord: string): Observable<Image[]> {
    if (keyWord === '') {
      return of([]);
    }
    return this.http.get<{results: Image[]}>(`${this.api_url}/search/photos?query=${keyWord}`, this.options)
      .pipe(
        map((response) => response.results || []),
        mergeMap((photos: Image[]) => of(photos.map((photo: any) => new Image(photo.id, photo.description, photo.user.name, photo.user.links.self, photo.created_at, photo.urls, photo.color, photo.blur_hash))))
      )
  }

  getImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.api_url}/photos/${id}`, this.options)
    .pipe(
      mergeMap((photo: any) => of(new Image(photo.id, photo.description, photo.user.name, photo.user.links.self, photo.created_at, photo.urls, photo.color, photo.blur_hash)))
    )
  }
}
