import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template: `
     <div class="songs">
      <songs-list
        [list]="listened$ | async"
        (toggle)="OnToggle($event)">
        Played
      </songs-list>
    </div>
  `
})
export class SongsListenedComponent {
  listened$!: Observable<any[]>;

  constructor(
    private store: Store,
    private songsService: SongsService
  ) {}

  ngOnInit() {

    this.listened$ = this.store.select<any[]>('playlist').pipe(filter(Boolean),
    map((playlist: any) =>
     playlist.filter((track: { listened: boolean; }) => track.listened)));
  }

  OnToggle(event:any) {
    this.songsService.toggle(event);
  }
}
