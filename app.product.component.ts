import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../sharedmodule/services/app.http.service';
import { ProductInfo } from './../../../models/app.productinfo.model';
import { FormGroup,FormControl, AbstractControl } from '@angular/forms';
import { filter } from 'minimatch';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
    selector: 'app-product-component',
    templateUrl: './app.product.view.html'
})
export class ProductComponent implements OnInit {
    productInfo: ProductInfo;
    products: Array<ProductInfo>;
    tableColumns: Array<string>;
    showForm: boolean;
    frmProduct: FormGroup;
    message: string;
    flag:string;
    showMessage = false;
    searchValue: string;
    filteredProducts: Array<ProductInfo>;
    constructor(private serv: HttpService) {
        this.productInfo = new ProductInfo(0,'','','','','',0);
        this.products = new Array<ProductInfo>();
        this.tableColumns = new Array<string>();
        this.showForm = false;
        this.message=``;
        this.flag = `Save`;
        this.searchValue=``;
        this.filteredProducts = new Array<ProductInfo>();
        this.frmProduct = new FormGroup({
            ProductRowId: new FormControl(this.productInfo.ProductRowId),
            ProductId :new FormControl(this.productInfo.ProductId),
            ProductName :new FormControl(this.productInfo.ProductName),
            CategoryName: new FormControl(this.productInfo.CategoryName),
            Manufacturer: new FormControl(this.productInfo.Manufacturer),
            Description: new FormControl(this.productInfo.Description),
            BasePrice: new FormControl(this.productInfo.BasePrice)
        });
     }

    ngOnInit(): void {
        //console.log(this.tableColumns);
        for(let c in this.productInfo)
        {
            this.tableColumns.push(c);
        }
        //console.log(JSON.stringify(this.tableColumns));
        this.loadData();
     }

    loadData(): void {
        this.serv.getProducts().subscribe((resp) => {
            this.products = resp;
            this.filteredProducts =resp;
            //console.log(JSON.stringify(resp));
        });
    }

    save():void{
        this.frmProduct.setValue(this.productInfo);
        this.flag=`Save`;
        this.showForm = true;
    }
    saveData(): void {
        let prd: ProductInfo = this.frmProduct.value;

        this.serv.postProduct(prd).subscribe((resp) => {
            console.log(resp);
            this.message = `Data Saved Successfully`;
        },(error) => {
            console.log(`Error Occuerd ${error.status}`);
        });

        this.showMessage = true;
        this.showForm=false;
    }

    deleteData(productId:number):void{
        //console.log(`Product Id ${productId}`);
        this.serv.deleteProduct(productId).subscribe((resp)=>{
            console.log(`Product deleted successfully.`);
            this.message=`Data Deleted Successfully`;
        },(error)=>{
            console.log(`Error Occuerd ${error.status}`);
        });

        this.showMessage=true;
    }

    updateData(prd: ProductInfo){
        //console.log(JSON.stringify(prd));
        this.frmProduct.setValue(prd);
        this.flag=`Update`;
        this.showForm =true;
    }

    update(){
        //console.log(this.frmProduct.value);
        this.productInfo= this.frmProduct.value;
        this.serv.putProduct(this.productInfo.ProductRowId,this.productInfo).subscribe((resp)=>{
            this.message=`Data Updated Successfully`;;
        },(error)=>{
            console.log(error);
        });
        //this.loadData();

        this.showMessage=true;
        this.showForm =false;
    }

    submitForm(){
        if(this.flag===`Save`){
            this.saveData();
        }
        else if (this.flag===`Update`){
            this.update();
        }
    }

    Cancel(){
        this.showForm=false;
    }

    searchData(searchValue: string){
        if(searchValue.length===0){
            this.filteredProducts=this.products;
        }
        else{
       this.filteredProducts= this.products.filter((prd)=>{
           var found =false;
            this.tableColumns.forEach((tblColumns)=>{
                var data = `${prd[tblColumns]}`;
                if(data.includes(searchValue)){
                    found =true;
                }              
            })
            return found ;
        });
    }
    }
}
