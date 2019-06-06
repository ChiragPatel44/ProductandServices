import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { HttpService } from './services/app.http.service';

// the current module is exporting HttpService

@NgModule({
    imports:[CommonModule, HttpClientModule],
    exports:[CommonModule],
    declarations:[],
    providers:[HttpService]
})
export class SharedModule {

}