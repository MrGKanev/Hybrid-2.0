import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-authors-list',
    templateUrl: 'list.html'
})
export class ListAuthorsPage extends ListPage {
    type: string = 'users';
}