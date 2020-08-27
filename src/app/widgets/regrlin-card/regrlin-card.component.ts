import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-regrlin-card',
  templateUrl: './regrlin-card.component.html',
  styleUrls: ['./regrlin-card.component.scss']
})
export class RegrlinCardComponent implements OnInit {

  @Input() header;
  @Input() data;
  @Input() title;
  @Input() subtitle;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }
}