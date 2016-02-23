import {Component} from 'angular2/core';
import {CapitalizePipe} from '../pipes/capitalize.pipe';

@Component({
    selector:'test-me',
    templateUrl:'./testing/testing.html',
    pipes:[CapitalizePipe]
    
})

export class TestMe {
    names:Array<string>=[
       'Zibi','aneta','nina'
    ];  
}
