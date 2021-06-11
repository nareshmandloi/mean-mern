import { Component, OnDestroy, OnInit } from '@angular/core';
import { post } from '../post.model'
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
// posts = [
//   {title: "First Post", content: "This is A first post"},
//   {title: "Second Post", content: "This is A second post"},
//   {title: "Third Post", content: "This is A third post"},
// ];
posts: post[] = [];
private postsSub: Subscription;
  constructor(public postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListner()
    .subscribe((posts:post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
