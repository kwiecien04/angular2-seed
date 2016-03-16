import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../../home/components/home';
import {AboutCmp} from '../../about/components/about';
import {NameList} from '../../shared/services/name_list';
import {TestMe} from '../../testing/testing';
import {TestTabs} from '../../tabs/tabs';
import {UploadImage} from '../../upload/upload';
import {UploadProgerss} from '../../upload/uploadwithprogress';


@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './app/components/app.html',
  styleUrls: ['./app/components/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path:'/test', component:TestMe, as:'Order'},
  { path:'/tabs', component:TestTabs, as:'Tabs'},
  { path:'/upload', component:UploadImage, as:'Upload'},
  { path:'/uploadprogerss', component:UploadProgerss, as:'UploadProgress'}
])
export class AppCmp {}
