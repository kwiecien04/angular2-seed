import {Component,OnInit} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';
import {FileUploadService} from './uploadservice';

@Component({
     selector:'upload-progerss',
    template:`
    <h1>you are in upload progress</h1>{{up}}
    <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
    <button type="button" (click)="upload()">Upload</button><input type="text" [(ngModel)]="up"/>
     `,
    providers:[FileUploadService]
})
export class UploadProgerss implements OnInit{
    //progerss:Observable<number>;
    filesToUpload:Array<File>;
    up:number=0;
    constructor(private _uploadService:FileUploadService)  {
      
         this.filesToUpload=[];
    }
    ngOnInit(){
         this._uploadService.getObserver().subscribe(progerss=>{this.up=progerss;console.log(this.up);},(err)=>console.log(err),()=>console.log('done'));
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
