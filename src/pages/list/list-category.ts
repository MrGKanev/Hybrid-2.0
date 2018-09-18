import { Component } from '@angular/core';
import { ListPage } from './list';

@Component({
    selector: 'page-category-list',
    templateUrl: 'list.html'
})
export class ListCategoryPage extends ListPage {
    type: string = 'posts';

    getQuery() {
        let query = super.getQuery();
        query.categories = parseInt(this.navParams.get('id'));
        return query;
    }
}