import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInfo } from '../../models/app.productinfo.model';


@Injectable()
export class HttpService {
    url: string;
    constructor(private http: HttpClient) {
        this.url = 'http://apiapptrainingservice.azurewebsites.net/api/products';
    }

    getProducts(): Observable<ProductInfo[]> {
        let resp: Observable<ProductInfo[]>  =null;
        resp = this.http.get<ProductInfo[]>(this.url);
        return resp;
    } 

    postProduct(prd: ProductInfo): Observable<ProductInfo> {
        let resp: Observable<ProductInfo>  =null;
        // define headers for post operation
        console.log(`Service called + ${JSON.stringify(prd)} `);
        const optoins = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        resp = this.http.post<ProductInfo>(this.url, JSON.stringify(prd), optoins);
        return resp;
    }

    // Http PUT always accepts two parameters
    // 1. Url Parameter as 'id', this will be concatinated in url
    // 2. Object to be updated
    putProduct(id:number, prd: ProductInfo): Observable<ProductInfo> {
        let resp: Observable<ProductInfo>  =null;
        // define headers for post operation
        const optoins = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        resp = this.http.put<ProductInfo>(`${this.url}/${id}`, JSON.stringify(prd), optoins);
        return resp;
    }
    // Http DELETE always accepts single parameter
    // 1. Url Parameter as 'id', this will be concatinated in url
    deleteProduct(id:number): Observable<any> {
        console.log(JSON.stringify(id));
        let resp: Observable<any>  =null;
        resp = this.http.delete<any>(`${this.url}/${id}`);
        return resp;
    }
}