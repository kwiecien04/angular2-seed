
import {Component,OnInit,ChangeDetectorRef} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {FileUploadService} from './uploadservice';
import {IndicatorBar} from './progerss.component';

@Component({
     selector:'upload-progerss',
    template:`
    <h1>you are in upload progress</h1>
    <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
    <button type="button" (click)="upload()">Upload</button>
     <!--<div class="progress">
     <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow='ups' aria-valuemin="0" aria-valuemax="100" style="width: {{ups}}%;">
    <span class="sr-only">{{ups}}% Complete</span>{{ups}}%
  </div>
</div>-->
<indicator-bar [stream]=in></indicator-bar>
     `,
    providers:[FileUploadService],
    directives:[IndicatorBar]
})
export class UploadProgerss implements OnInit{
    in:Observable<number>;
    filesToUpload:Array<File>;
    public ups:number=0;
    constructor(private _uploadService:FileUploadService,private ref:ChangeDetectorRef)  {
       setInterval(() => {
      _uploadService.getObserver().subscribe((progerss:number)=>{  this.ups = progerss;});
      this.ref.markForCheck();
    }, 1000);
         this.filesToUpload=[];
    }
    ngOnInit(){
        this.in=this._uploadService.getObserver();
        this.ups++;
        this.ups--;
        // this._uploadService.getObserver().subscribe((progerss:number)=>{this.ups=progerss;console.log(this.ups);},(err)=>console.log(err),()=>console.log('done'));
         //this.progerss=this._uploadService.getObserver();
    }
    upload(){
        this._uploadService.upload('http://localhost:3000/upload', this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });  
        
    }
        
    
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    
}
