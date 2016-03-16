import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/share';

@Injectable()
export class FileUploadService{
    private progerss$:Observable<number>;
    private progerss:number=0;
    private progerssObserver:any;
    constructor(){
        this.progerss$=new Observable(observer=>this.progerssObserver=observer);
    }
    public getObserver():Observable<number>{
        return this.progerss$;
    }
    
    public upload (url: string, files: File[]): Promise<any> {
    return new Promise((resolve, reject) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append('uploads[]', files[i], files[i].name);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };

      this.setUploadInterval(500);

        xhr.upload.onprogress = (event) => {
            this.progerss = Math.round(event.loaded / event.total * 100);

            this.progerssObserver.next(this.progerss);
        };

        xhr.open('POST', url, true);
        xhr.send(formData);
    });
    }
    
    
   setUploadInterval(interval:number) : void{
       setInterval(()=>{var x=0;x++;},interval);
   }
}
