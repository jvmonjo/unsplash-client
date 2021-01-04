import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})

export class ImagesComponent implements OnInit {

  images: Image[] = [];

  @ViewChild('imageSearchInput', { static: true }) imageSearchInput: ElementRef;
  public isLoading: boolean = false
  public query: string = localStorage.getItem('imageQuery') || 'cats'

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.getImages()
    this.bindTyping()
  }

  getImages() {
      this.imagesService
        .getImagesByKeyWord(this.query)
        .subscribe(images=> {
          this.images = images
          this.isLoading = false
        },
        (err) => {
          this.isLoading = false
          console.log('error', err)
        })
    }

  bindTyping() {
    fromEvent(this.imageSearchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is different from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      this.isLoading = true;
      // this.query = text

      // Persist query on localStorage
      localStorage.setItem('imageQuery', text) 
      this.getImages()
    })
  }

  }
