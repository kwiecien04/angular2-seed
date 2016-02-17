import {Pipe,PipeTransform} from 'angular2/core';

@Pipe({
    name:'capitalize'
})

export class CapitalizePipe implements PipeTransform {
    transform(value:string,args:any[]):any {
        return value.charAt(args[0]).toUpperCase() + value.slice(1);
    }  
}
