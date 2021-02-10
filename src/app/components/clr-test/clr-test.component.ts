import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clr-test',
  templateUrl: './clr-test.component.html',
  styleUrls: ['./clr-test.component.css']
})
export class ClrTestComponent implements OnInit {

  public name: string = 'firstTab'
  public nameTwo: string = 'secondTab'
  public nameThree: string = 'thirdTab'

  public isshown: boolean = false

  public test:string[] = ['1', '2', '3', '4']

  constructor() { }

  ngOnInit(): void {
  }

}
