import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  searchToggle(event: MouseEvent) {
    const obj = event.target as HTMLElement;
    const container = obj.closest('.search-wrapper') as HTMLElement;

    if (!container.classList.contains('active')) {
      container.classList.add('active');
      event.preventDefault();
    } else if (
      container.classList.contains('active') &&
      !obj.closest('.input-holder')
    ) {
      container.classList.remove('active');
      // clear input
      const input = container.querySelector('.search-input') as HTMLInputElement;
      input.value = '';
    }
  }
}
