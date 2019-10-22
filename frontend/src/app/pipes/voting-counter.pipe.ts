import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votingCounter'
})
export class VotingCounterPipe implements PipeTransform {

  transform(value: any[]): number {
    var statusJa: number = 0;

    var i: number = 0;
    value = value.filter((val) => {
      return !! val
    });

    for (let user of value) {
      if (user[0].STATUS === 'j') {
        statusJa++;
      }
    }
    return statusJa;
  }

}
