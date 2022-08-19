import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { BlogEntriesPageable } from 'src/app/model/blog-entry.interface';
import { User } from 'src/app/model/user.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

import { UsersService } from 'src/app/services/user-service/users.service';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  origin = this.window.location.origin;

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )
  
  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(userId))
  )

  blogEntries$: Observable<BlogEntriesPageable> = this.userId$.pipe(
    switchMap((userId: number) => this.blogService.indexByUser(userId, 1, 10))
  )

  constructor(
    private activatedRoute: ActivatedRoute, /*No šī dabū ārā userId laikam */
    private userService: UsersService,
    private blogService: BlogService,
    @Inject(WINDOW) private window: Window
  ) { }


  onPaginateChange(event: PageEvent) {
    return this.userId$.pipe(
      tap((userId: number) => this.blogEntries$ = this.blogService.indexByUser(userId, event.pageIndex, event.pageSize))
    ).subscribe()
  }
 

}
