import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private authSerivce: AuthService
        ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        console.log('name: ' + this.authSerivce.decodedToken.nameid);

        return this.userService.getUser(this.authSerivce.decodedToken.nameid)
        .pipe(catchError(error => {
            this.alertify.error('Problem retrieving data (Member Edit Resolver)');
            this.router.navigate(['/members/edit']);
            return of(null);
        }));
    }

    
}