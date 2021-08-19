import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.scss'],
})
export class AllStoriesComponent implements OnInit {
  apiUrl: string = '/stories'

  constructor() {}

  ngOnInit(): void {}
}
