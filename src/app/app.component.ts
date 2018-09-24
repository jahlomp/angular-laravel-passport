import { Component } from '@angular/core';
import { LaravelPassportService } from 'projects/laravel-passport/src/public_api';

@Component({
  selector: 'lr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-laravel';

  constructor(private laravelPassportService: LaravelPassportService) {
    this.laravelPassportService.loginWithEmailAndPassword('precious.jahlom@gmail.com', '1Jahlomp~~!!').subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {

      });
  }
}
