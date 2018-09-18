import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// import { MenuMapping } from './../../../config/pages/';
import { IAuthorState } from '../../reducers';

/*
  Generated class for the Author component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'author',
  templateUrl: 'author.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {
  @Input() author: IAuthorState | undefined = undefined;
  @Input() link: Boolean;
  @Input() date: String;

  constructor() {
  }

  goToAuthorPage(e) {
    // this.navCtrl.push(MenuMapping.author, {
    //   id: this.authorId
    // });
  }

}
