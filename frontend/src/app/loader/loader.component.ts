import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  loaderService = inject(LoaderService);

  isLoading: Subject<boolean> = this.loaderService.isLoading;
}
