import {Component} from 'angular2/core';
import {CapitalizePipe} from '../pipes/capitalize.pipe';

@Component({
    selector:'test-me',
    template:`
    <div class="container">
    <h1>Zibi is Here</h1>
    <ul *ngFor="#name of names"><li>{{name|capitalize:0}}</li></ul>
    </div>
    `,
    pipes:[CapitalizePipe]
    
})

export class TestMe {
    names:Array<string>=[
       'Zibi','aneta','nina'
    ];  
}
