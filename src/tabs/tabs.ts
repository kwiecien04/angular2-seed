import {Component} from 'angular2/core';
import {UiPane} from '../tabs/ui_pane.directive';
import {UiTabs} from '../tabs/ui_tabs.component';

class Detail {
    title:string;
    text:string;
    constructor(title:string,text:string) {
        this.title=title;
        this.text=text;
    }
}

@Component({
    template:` 
    
    <h4>Tabs Demo{{dactive}}</h4>
    <ui-tabs>
      <template ui-pane [title]='firsttitle' [active]='dactive'>
        You have {{details.length}} details.
      </template>
    
      <template ui-pane title='Summary'>
        Next last ID is {{id}}.
      </template>
        
        <template *ngFor="#detail of details" ui-pane [title]="detail.title">
        {{detail.text}} <br><br>
        <button class="btn" (click)="removeDetail(detail)">Remove</button>
      </template>
    </ui-tabs>
    <hr>
    <button class="btn btn-info" (click)="addDetail()">Add Detail</button>
    
    `,
    directives: [UiPane,UiTabs]
})

export class TestTabs {
    details:Detail[]=[];
    firsttitle:string='zaba';
    dactive:boolean=true;
    id:number=0;
    addDetail(){
       
        this.id++;
        this.details.push(new Detail(
            `Detail ${this.id}`,
            `text for ${this.id}`));
            
    }
    removeDetail(detail:Detail) {
        this.details=this.details.filter((d)=>d !== detail);
         alert('set active in removeDetail');
        this.dactive=true;
        
    }
}
