import { Component, Input, OnInit } from '@angular/core';
import { PostInterface } from '../../types/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() post!: PostInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
