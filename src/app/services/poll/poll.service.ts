import { Injectable } from '@angular/core';

import { map, tap, first } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Poll } from 'src/app/types/poll';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  polls: any;
  pollStore: AngularFirestoreCollection<Poll>;

  constructor(private firestore: AngularFirestore) { 
    this.pollStore = firestore.collection('polls');
    this.polls = {};
  }

  getPoll(id: string) {
    return this.pollStore.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })),
      map(val => val.filter(item => item.id === id),
      tap(val => this.polls[id] = val))
    );
  }

  addVote(id: string, option: number) {
    let options = this.polls[id].options.find(val => val.id === option).score += 1;
    this.firestore.collection('polls').doc(id).update({options: options});
  }

  addOption(id: string, option: string) {
    if(!this.polls[id]) {
      this.getPoll(id).pipe(first()).subscribe(val => {
        this.polls[id] = val[0] || {};
        this.addOptionPoll(id, option);
      });
    } else this.addOptionPoll(id, option);
  }

  private addOptionPoll(id: string, option: string) {
    var newId = 1;
    let options = this.polls[id].data.options || [];

    while(options.find(val => val.id == newId)) {
      newId += 1;
    }

    options.push({value: option, score: 0, id: newId});
    this.firestore.collection('polls').doc(id).update({options: options});
  }

  newPoll(id: string) {
    this.firestore.collection('polls').doc(id).update({options: []});
  }
}
