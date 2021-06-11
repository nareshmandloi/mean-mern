import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject  } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
 private posts: post[] = [];
 private postUpdated = new Subject<post[]>();

 constructor(private http: HttpClient){}

 getPosts () {
   this.http.get<{message: string, posts: post[]}>('http://localhost:3000/api/posts')
   .subscribe((postData) => {
     this.posts = postData.posts;
     this.postUpdated.next([...this.posts]);
   });
 }

 getPostUpdateListner() {
   return this.postUpdated.asObservable();
 }

 addPost(title: string, content: string){
  const post: post = {id: null, title: title, content: content};
  this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
  .subscribe((responseData) => {
    console.log(responseData.message);
    this.posts.push(post);
  this.postUpdated.next([...this.posts]);
  });
 }
}
