import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private MOCK_POLL = {
    id: 'no',
    options: [
      {value: 'I Fell In Love With a Ninja Master - The Wonder Years', score: 5, id: 1},
      {value: 'Friendless Summer - Magazine Beach', score: 3, id: 2},
      {value: 'America\'s Suitehearts - Fall Out Boy', score: 4, id: 3},
      {value: 'Fight Milk! - Riley!', score: 8, id: 4}
    ]
  }

  constructor() { }

  getPoll(id: string) {
    return of(this.MOCK_POLL);
  }

  addVote(id: string, option: number) {
    this.MOCK_POLL.options.find(val => val.id === option).score += 1;
  }

  addOption(id: string, option: string) {
    var newId = 1;
    while(this.MOCK_POLL.options.find(val => val.id == newId)) {
      newId += 1;
    }

    this.MOCK_POLL.options.push({value: option, score: 0, id: newId});
  }
}
