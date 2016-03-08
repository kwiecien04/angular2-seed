import {Component} from 'angular2/core';

@Component({
    selector:'upload-image',
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
      this.makeFileRequest('http://localhost:3000/upload', [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });  
        
    }
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    
    makeFileRequest(url:string,params:Array<string>,files:Array<File>){
        return new Promise((resolve,reject)=>{
            let formData:any=new FormData();
            var xhr=new XMLHttpRequest();
            console.log(files);
             for(var i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
                console.log(files[i] + 'hey'  + files[i].name);
            }
            xhr.onreadystatechange=()=>{
                if(xhr.readyState==4){
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            
            xhr.open('POST',url,true);
            xhr.send(formData);
        });
    }
    
}
