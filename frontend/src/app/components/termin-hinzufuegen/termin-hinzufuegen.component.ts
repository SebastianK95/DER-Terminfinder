import {Component, OnInit} from '@angular/core';
import {MeetingChoiceService} from '../../services/meeting-choice.service';
import {ActivatedRoute} from '@angular/router';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {SessionService} from "../../services/session.service";

@Component({
    selector: 'app-termin-hinzufuegen',
    templateUrl: './termin-hinzufuegen.component.html',
    styleUrls: ['./termin-hinzufuegen.component.scss']
})
export class TerminHinzufuegenComponent implements OnInit {

    constructor(private meetingchoiceservice: MeetingChoiceService, private route: ActivatedRoute, private general: GeneralApiGateway, private sessionService: SessionService) {
    }

    private isprivat: boolean = false;
    private date;

    getDate() {
        var d_time = new Date(this.date).toString();
        var time_all = d_time.split(/ /g)[4];
        var time_arr = time_all.split(/:/g);
        var minute = time_arr[1];
        var hour = time_arr[0];
        var time = hour + minute;
        var time_int = parseInt(time);
        var d_date = new Date(this.date).toISOString(); // <- Problemfall
        var date = d_date.split(/T/g)[0].replace(/-/g, "");
        console.log(date)
        var date_int = parseInt(date);
        var privat = 0;
        if (this.isprivat) {
            privat = 1;
        }
        return {
            time: time,
            date: date,
            privat: this.isprivat ? 1 : 0
        }
    }

    terminHinzufuegen() {
        var date = this.getDate();
        this.general.insert('MeetingChoice',
            {
                date: date.date,
                time: date.time,
                isprivat: date.privat,
                finderId: this.route.snapshot.params['finderId']
            }
        ).then(() => {
                location.assign('/pools/' + this.sessionService.getUser().id);
            }
        );
    }

    ngOnInit() {
    }

}
