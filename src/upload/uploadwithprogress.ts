
import {Component,OnInit,ChangeDetectorRef} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {FileUploadService} from './uploadservice';
import {IndicatorBar} from './progerss.component';

@Component({
     selector:'upload-progerss',
    template:`
  <h1>you are in upload progress</h1>
     <!-- <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
    <button type="button" (click)="upload()">Upload</button>-->
    
   
            <div class="input-group">
                <span class="input-group-btn">
                 <button type="button" [disabled]="!filename" (click)="upload()" ng class="btn btn-danger">Upload</button>
                    <span class="btn btn-primary btn-file">
                        Browse&hellip; <input type="file" (change)="fileChangeEvent($event)" multiple>
                    </span>
                </span>
                <input type="text"  class="form-control" [ngModel]="filename" placeholder="please Browse to select file to upload" readonly>
      </div>
    
    
     
     <!--<div class="progress">
     <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow='ups' aria-valuemin="0" aria-valuemax="100" style="width: {{ups}}%;">
    <span class="sr-only">{{ups}}% Complete</span>{{ups}}%
  </div>
</div>-->
<indicator-bar [stream]=in [visible]=visible></indicator-bar>
    here:{{visible}} `,
    styleUrls:['./upload/upload.css'],
    providers:[FileUploadService],
    directives:[IndicatorBar]
})
export class UploadProgerss implements OnInit{
    in:Observable<number>;
    filesToUpload:Array<File>;
    filename:string='';
    public ups:number=0;
    visible:boolean=false;
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
            console.log('good');
            setTimeout(()=>{this.visible=false;alert('zibi');},2000);
            
        }, (error) => {
            console.error(error);
        });  
        
    } 
        
    
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        
        var x:number;
        for(x=0;x<this.filesToUpload.length;x++){
            this.filename+=this.filesToUpload[x].name+ ' ';
        }
        
       // this.filesToUpload.forEach((file)=>{this.filename+=file.name;});
       // this.filename=this.filesToUpload[0].name;
    }
    
}
