import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BlogEntry } from 'src/app/model/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.scss']
})
export class ViewBlogEntryComponent implements OnInit {

  blogEntry$: Observable<BlogEntry> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => this.blogService.findOne(parseInt(params['id'])).pipe(
      map((blogEntry: BlogEntry) => blogEntry)
    ))
  )

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
  }

}
