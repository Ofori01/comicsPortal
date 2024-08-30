import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxParallaxModule, ParallaxStandaloneDirective } from '@yoozly/ngx-parallax';
import { SharedModule } from '../../shared/shared.module';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ParallaxStandaloneDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit{
  constructor(){
  }

  ngOnInit(): void {
    
    
  }

}
