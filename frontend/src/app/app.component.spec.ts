import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SessionService} from "./services/session.service";
import {MessageBoxComponent} from './components/message-box/message-box.component';
import {HttpModule} from '@angular/http';
import {EventService} from './services/event.service';
import {MessageBoxService} from './services/message-box.service';

class MockSessionService{
    async userIsLoggedIn(){
        return await false;
    }

    async setLoginUserId(){

    }
}

xdescribe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MessageBoxComponent
            ],
            providers: [
                {provide: SessionService, useClass: MockSessionService}, EventService, MessageBoxService
            ],
            imports: [
                RouterTestingModule, HttpModule
            ]
        }).compileComponents();
    }),);

    xit('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    xit(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Der Terminfinder');
    }));

    xit('should render navbar', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a.navbar-brand').textContent).toContain('Der erminfinder');
    }));
});

