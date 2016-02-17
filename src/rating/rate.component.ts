import {Component,Input, Output,OnInit,EventEmitter } from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
    selector:'rating',
    template:`
    <span tabindex="0">
    <template  ngFor  [ngForOf]="ranges" #index=index >
    <span class="sr-only">(*)</span>
    <i id="{{index}}" class="text-info" (click)="clicked(index+1)" (mouseenter)="enter(index + 1)" (mouseleave)="reset()" [ngClass]="index < temp ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'"></i>
    </template>
    
    </span>
    
    `,
    directives:[NgClass],
    styles:['i { cursor: pointer; cursor: hand; }'],
    host:{'(mouseenter)':'show($event)'}
    
})

export class Rating implements OnInit {
   @Input() ranges:Array<number>; 
   @Input() default:number=2;
   @Output() retval:EventEmitter<any>=new EventEmitter();
   temp:number;
   ngOnInit(){
       this.temp=this.default;
   }
   clicked(value) {
      this.default=value;
      this.retval.next(value);
   }
   
   show(el){
       
       console.log(el.target);
   }
   enter(index){
       this.temp=index;
      
   }
   reset() {
       this.temp=this.default;
   }
}
