import {Component,Input,OnInit,ChangeDetectorRef} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector:'indicator-bar',
    template:`<div class="progress" [hidden]="!visible">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow='progerss' aria-valuemin="0" aria-valuemax="100" style="width: {{progerss}}%;">
        <span class="sr-only">{{progerss}}% Complete</span>{{progerss}}%
    </div>
    </div>{{visible}}`
})

export class IndicatorBar implements OnInit{
    @Input() stream:Observable<number>;
    @Input() visible:boolean;
    progerss:number=0;
    constructor(private ref:ChangeDetectorRef){
       
    }
    ngOnInit(){
       
      setInterval(() => {
      this.stream.subscribe((values:number)=>{this.progerss = values;this.visible=true;},(err)=>console.log(err),()=>{console.log('end');});
      this.ref.markForCheck();
    }, 1000);
    }
    
}
