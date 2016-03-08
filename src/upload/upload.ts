import {Component} from "angular2/core";

@Component({
    selector:"upload-image",
    template:`
    <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
    <button type="button" (click)="upload()">Upload</button>
    `
})

export class UploadImage{
    filesToUpload:Array<File>;
    constructor(){
        this.filesToUpload=[];
    }
    upload(){
        
        
    }
    fileChangeEvent(fileInput:any){
        this.filesToUpload=<Array<File>> fileInput.target.files;
    }
    
    makeFileRequest(url:string,params:Array<string>,files:Array<File>){
        return new Promise((resolve,reject)=>{
            let formData:any=new FormData();
            var xhr=new XMLHttpRequest();
            files.forEach((file)=>{
                formData.append("upload[]",file,file.name);
            });
            xhr.onreadystatechange=()=>{
                if(xhr.readyState==4){
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST",url,true);
            xhr.send(formData);
        });
    }
    
}