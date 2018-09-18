import { NavController, Content } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import debug from 'debug';

import { IListComponent } from './interfaces';
import { MenuMapping } from './../../config/pages/';
import { getNavParamsFromItem } from '../utils/item';

const log = debug('ListParentComponent');

export class ListParentComponent implements IListComponent {
    type: string;
    options: any;
    content: Content;
    _list: Array<any>;

    constructor(
        public navCtrl: NavController,
        public cdRef: ChangeDetectorRef,
    ) {
    }

    openPage = (e, item) => {
        let params = getNavParamsFromItem(this.type, item);
        log('about to open', `${this.type}Item`, params)
        this.navCtrl.push(MenuMapping[`${this.type}Item`], params)
    }

    trackBy = (index: number, item) => item.id;

    // http://stackoverflow.com/questions/41797590/angular-2-onpush-change-detection-for-dynamic-components
    set list(val: Array<any>) { this._list = val; this.cdRef.markForCheck(); }
    get list() { return this._list };
}