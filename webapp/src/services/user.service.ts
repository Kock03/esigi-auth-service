import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private loggedChanged = new Subject<boolean>();
    public isLogged = false;
    constructor() { }

    auth(token: any): void {
        localStorage.setItem('token', token);
        this.loggedChanged.next(true);
        this.isLogged = true;
    }

    logout(): void {
        localStorage.clear();
        // localStorage.removeItem('token');
        // localStorage.removeItem('xsrfToken');
        this.loggedChanged.next(false);
        this.isLogged = false;
        location.replace('http://192.168.8.184:3406/login');
    }

    isUserLoggedIn(): Subject<boolean> {
        return this.loggedChanged;
    }


}