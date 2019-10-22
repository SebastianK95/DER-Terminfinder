import {ChangePasswordComponent} from './change-password.component';
import {async, TestBed} from "@angular/core/testing";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MessageBoxComponent} from "../message-box/message-box.component";
import {EventService} from '../../services/event.service';

class MockActivatedRoute {
    toString() {
        return 'url:\'changePassword\/abctoken\', path'
    }
}

class MockUserService {
}

class MockTokenService {
    tokenIsNotExpired(tokenString) {
        return true;
    }
}

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent, MessageBoxComponent],
            imports: [FormsModule],
            providers: [
                {provide: UserService, useClass: MockUserService},
                {provide: TokenService, useClass: MockTokenService},
                EventService,
                {provide: ActivatedRoute, useClass: MockActivatedRoute}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
