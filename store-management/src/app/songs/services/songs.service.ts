import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '../../store';

import {map} from 'rxjs/operators';
import {tap } from 'rxjs/operators';


export interface Song {
  id: number,
  track: string,
  listened: boolean,
  favourite: boolean,
  artist: string,
}

@Injectable()
export class SongsService {

  getPlaylist$ = this.http
    .get<Song[]>('http://localhost:3000/api/playlist').pipe
    (tap(next => this.store.set('playlist', next)));

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  toggle(event: any) {
    this.http
    .put<Song>(`http://localhost:3000/api/playlist/${event.track.id}`, event.track).
    subscribe((track: Song) => {
      const value = this.store.value.playlist;
      const playlist = value.map((song: Song) => {
        console.log(event.track);
        if (event.track.id === song.id) {
          return { ...song, ...event.track };
        } else {
          return song;
        }
      });
      console.log(playlist);
      this.store.set('playlist', playlist);
    });
  }

}
