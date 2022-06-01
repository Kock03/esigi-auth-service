import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    titleModalObservable(): Observable<string> {
        return new Observable<string>((titleObserve) => {
            this.translateService
                .get(['dialog_title_login_error'])
                .subscribe((translations) => {
                    titleObserve.next(translations['dialog_title_login_error']);
                });
        });
    }

    messageModalObservable(): Observable<string> {
        return new Observable<string>((messageObserve) => {
            this.translateService
                .get(['dialog_message_login_error'])
                .subscribe((translations) => {
                    messageObserve.next(translations['dialog_message_login_error']);
                });
        });
    }

    constructor(public translateService: TranslateService) { }
}
