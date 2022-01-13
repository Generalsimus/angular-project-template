import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { PostService } from 'src/app/services/post';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.scss']
})
export class UsersListViewComponent implements OnInit {
  users: User[] = []
  constructor(private UserService: UserService) {
    this.UserService.getUsers({}).then(users => (this.users = users))
  }

  getUserAddress(user: User): string {
    const address = user.address;
    return [address.city, user.address.street, user.address.suite].join(', ');
  }

  ngOnInit(): void {
  }

}
