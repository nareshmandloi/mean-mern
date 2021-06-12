import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {
 private posts: post[] = [];
 private postUpdated = new Subject<post[]>();

 constructor(private http: HttpClient){}

 getPosts () {
   this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
   .pipe(map((postData) => {
    return postData.posts.map(post => {
      return {
        title : post.title,
        content: post.content,
        id: post._id
      };
    });
   }))
   .subscribe((transformedPosts) => {
     this.posts = transformedPosts;
     this.postUpdated.next([...this.posts]);
   });
 }

 getPostUpdateListner() {
   return this.postUpdated.asObservable();
 }

 addPost(title: string, content: string){
  const post: post = {id: null, title: title, content: content};
  this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post)
  .subscribe((responseData) => {
    const id = responseData.postId;
    post.id = id;
    this.posts.push(post);
  this.postUpdated.next([...this.posts]);
  });
 }

 deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
     const updatedPosts = this.posts.filter(post => post.id !== postId);
     this.posts = updatedPosts;
     this.postUpdated.next([...this.posts]);
    });
}

}
