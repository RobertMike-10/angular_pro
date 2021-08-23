import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';

import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';
import { concatMap, filter,map } from 'rxjs/operators';

@Component({
  selector: 'songs-favourites',
  template: `
     <div class="songs">
      <songs-list
        [list]="favourites$ | async"
        (toggle)="OnToggle($event)">
        Favourites
      </songs-list>
    </div>
  `
})
export class SongsFavouritesComponent implements OnInit {

  favourites$!: Observable<any[]>;

  myfavoritas!: any[] ;
  constructor(
    private store: Store,
    private songsService: SongsService
  ) {}

  ngOnInit() {
    this.favourites$ = this.store.select<any[]>('playlist').pipe(filter(Boolean),
     map((playlist: any) =>
      playlist.filter((track: { favourite: boolean; }) => track.favourite)));
  }

  OnToggle(event:any) {
    this.songsService.toggle(event);
  }
}
