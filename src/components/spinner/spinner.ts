import {
  Component, Input, ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger, transition, style,
  animate, state
} from '@angular/animations';

/*
  Generated class for the Spinner component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'spinner',
  templateUrl: 'spinner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibilityChanged', [
      state('1', style({ opacity: 1, transform: 'scale(1.0)' })),
      state('0', style({ opacity: 0, transform: 'scale(0.8)', display: 'none'
     })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ])
  ]
})
export class SpinnerComponent {

  @Input() isVisible : boolean = true;
  @Input() shouldRetry: boolean = false;
  @Input() onRetry: (e) => void;

  constructor() { }

}
