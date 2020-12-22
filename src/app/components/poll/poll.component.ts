import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll/poll.service';
import { Option } from 'src/app/types/option';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  pollOptions: any;
  state: ('voting' | 'voted' | 'adding')[];
  added: boolean;

  songName: string;

  @Input() limit: number;

  @HostListener('window:keyup.enter')
  @HostListener('window:keyup.shift.enter')
  enterEvent() {
    if(this.getState() === 'adding') {
      this.add();
    }
  }

  constructor(private pollService: PollService) {
    pollService.getPoll('jhariah').subscribe(val => {
      this.pollOptions = val.data.options || [];
      this.pollOptions.sort((a, b) => (b.score - a.score) || 0);
    });

    this.state = ['voting'];
    this.added = false;
  }

  ngOnInit(): void { 
  }

  vote(id: number) {
    this.pollService.addVote('jhariah', id);
    this.pollOptions.sort((a, b) => b.score - a.score);
    this.state.push('voted');
  }

  canAdd() {
    return this.getState() !== 'adding' && this.pollOptions.length < this.limit && !this.added;
  }

  addState() {
    this.state.push('adding');
  }

  getState() {
    return this.state[this.state.length - 1];
  }

  add() {
    this.pollService.addOption('jhariah', this.songName);
    this.added = true;
    this.state.pop();
  }
}
