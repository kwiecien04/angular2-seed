import {Component} from 'angular2/core';
import {Rating} from '../../rating/rate.component';

@Component({
  selector: 'home',
  templateUrl: './home/components/home.html',
  styleUrls: ['./home/components/home.css'],
  directives: [Rating]
})
export class HomeCmp {
    ranges:Array<number>=[1,2,3,4,5,6];
    retval:number=3;
    getValue(val){
        this.retval=val;
    }
  }
