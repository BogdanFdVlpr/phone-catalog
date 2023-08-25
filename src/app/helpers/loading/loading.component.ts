import {Component, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() color: ThemePalette;
}
