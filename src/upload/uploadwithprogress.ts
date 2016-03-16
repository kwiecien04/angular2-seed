import {Component} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';
import {FileUploadService} from './uploadservice';

@Component({
     selector:'upload-progerss',
    template:`
    <h1>you are in upload progress</h1>
    <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
    <button type="button" (click)="upload()">Upload</button>
    `,
    providers:[FileUploadService]
})
export class UploadProgerss{
    filesToUpload:Array<File>;
    constructor(private _uploadService:FileUploadService){
        this.filesToUpload=[];
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
