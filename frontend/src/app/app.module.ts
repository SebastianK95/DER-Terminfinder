import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {UserApiGatewayService} from './services/gateways/user-api-gateway.service';
import {FinderApiGatewayService} from './services/gateways/finder-api-gateway.service';
import {GroupApiGatewayService} from './services/gateways/group-api-gateway.service';
import {UserService} from './services/user.service';
import {FinderService} from './services/finder.service';
import {MessageBoxService} from './services/message-box.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LogoutComponent} from './components/logout/logout.component';
import {MessageBoxComponent} from './components/message-box/message-box.component';
import {ConfigService} from './services/config.service';
import {TerminHinzufuegenComponent} from './components/termin-hinzufuegen/termin-hinzufuegen.component';
import {TerminfindungComponent} from './components/terminfindung/terminfindung.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MeetingChoiceService} from './services/meeting-choice.service';
import {MeetingChoiceApiGatewayService} from './services/gateways/meeting-choice-api-gateway.service';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker';
import {UserSettingsComponent} from './components/user-settings/user-settings.component';
import {SessionService} from './services/session.service';
import {GeneralApiGateway} from './services/gateways/general-api-gateway.service';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {TokenApiGatewayService} from './services/gateways/token-api-gateway.service';
import {TokenService} from './services/token.service';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';
import {SessionApiGatewayService} from './services/gateways/session-api-gateway.service';
import {LoadingBarComponent} from './helper-components/loading-bar/loading-bar.component';
import {ChooseUserBoxComponent} from './helper-components/choose-user-box/choose-user-box.component';
import {CreateGroupComponent} from './components/create-group/create-group.component';
import {PoolsAnzeigenComponent} from './components/pools-anzeigen/pools-anzeigen.component';
import {ConfigureService} from './services/configure.service';
import * as $ from 'jquery';
import {EventService} from './services/event.service';
import { GroupComponent } from './components/group/group.component';
import {ROUTES} from './app.routes';
import {AuthService} from './services/auth.service';
import { AddGroupToFinderComponent } from './components/add-group-to-finder/add-group-to-finder.component';
import { DelGroupFromFinderComponent } from './components/del-group-from-finder/del-group-from-finder.component';
import { AddUserToGroupComponent } from './components/add-user-to-group/add-user-to-group.component';
import { VotingCounterPipe } from './pipes/voting-counter.pipe';

@NgModule({

    declarations: [
        AppComponent,
        DashboardComponent,
        RegisterFormComponent,
        LogoutComponent,
        PageNotFoundComponent,
        MessageBoxComponent,
        TerminHinzufuegenComponent,
        TerminfindungComponent,
        LoginFormComponent,
        UserSettingsComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        PoolsAnzeigenComponent,
        LoadingBarComponent,
        ChooseUserBoxComponent,
        CreateGroupComponent,
        GroupComponent,
        AddGroupToFinderComponent,
        DelGroupFromFinderComponent,
        AddUserToGroupComponent,
        VotingCounterPipe
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        AngularDateTimePickerModule,
        NKDatetimeModule,
        RouterModule.forRoot(
            ROUTES,
            {
                // enableTracing: true
            }
        )
    ],
    providers: [
        AuthService,
        ConfigService,
        UserApiGatewayService,
        FinderApiGatewayService,
        MeetingChoiceApiGatewayService,
        UserService,
        FinderService,
        MeetingChoiceService,
        MessageBoxService,
        GeneralApiGateway,
        SessionService,
        TokenApiGatewayService,
        TokenService,
        ConfigureService,
        SessionApiGatewayService,
        EventService,
        GroupApiGatewayService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
