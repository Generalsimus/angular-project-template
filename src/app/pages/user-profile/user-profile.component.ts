import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/services/post';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(
    private UserService: UserService,
    private PostService: PostService,
    private route: ActivatedRoute,
    public router: Router
  ) {
  }
  showFullPosts: boolean = false;
  user?: User
  posts: Post[] = []
  heroes$!: Observable<any>
  async getUser(userId: number) {
    return this.user = (await this.UserService.getUser({ id: userId }))
  }
  async getUserPosts(userId: number) {
    let posts = (await this.PostService.getPosts({ userId: userId }))
    if (!this.showFullPosts) {
      posts = posts.slice(0, 3)
    }
    return this.posts = posts
  }
  getUserAddress(user: User): string {
    const address = user.address;
    return [address.city, user.address.street, user.address.suite].join(', ');
  }
  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get("userId"))
    this.showFullPosts = !!this.route.snapshot.paramMap.get("posts")

    this.getUser(userId)
    this.getUserPosts(userId)
  }
}
