import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {
  @Input() message: string;
  @Output() alertOutput = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  Yes(){
    this.alertOutput.emit(true);
  }

  No(){
    this.alertOutput.emit(false);
  }

}
