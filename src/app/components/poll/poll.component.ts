import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll/poll.service';
import { Option } from 'src/app/types/option';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  pollOptions: Option[];
  state: ('voting' | 'voted' | 'adding')[];

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
    pollService.getPoll('no').subscribe(val => this.pollOptions = val.options);
    this.state = ['voting'];
  }

  ngOnInit(): void { 
    this.pollOptions.sort((a, b) => b.score - a.score);
  }

  vote(id: number) {
    this.pollService.addVote('no', id);
    this.pollOptions.sort((a, b) => b.score - a.score);
  }

  canAdd() {
    return this.getState() !== 'adding' && this.pollOptions.length < this.limit;
  }

  addState() {
    this.state.push('adding');
  }

  getState() {
    return this.state[this.state.length - 1];
  }

  add() {
    this.pollService.addOption('no', this.songName);
    this.state.pop();
  }
}