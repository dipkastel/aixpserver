import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {Role} from '../../model/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.userService.logOut().subscribe(data => {
        this.router.navigate(['/login']);
      });
    }
  }

  login() {
    this.userService.login(this.user).subscribe(data => {
      if(data.role===Role.USER){
        this.router.navigate(['/datasets']);
      }
      if(data.role===Role.ADMIN){
        this.router.navigate(['/register']);
      }
    }, err => {
      this.errorMessage = 'Username or password is incorrect.';
    });
  }

}
