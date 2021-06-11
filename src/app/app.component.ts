import { Component, ViewChild } from '@angular/core';
import {ConexService} from './services/conex.service';
import { Cervejaria } from "./services/cervejaria";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent {
  title = 'frontend-text';
  //filter
  categories: string[];
  cities: string[];
  maxIbu: number = 130
  minIbu: number = 0
  // Material table
  dataSource : MatTableDataSource<Cervejaria>;
  lista: Cervejaria[];
  displayedColumns: string[] = ['id', 'ibu','name', 'category', 'address', 'state', 'website']
  /*pagineo: PageEvent = {       
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  */
  pageSizeOptions: number[] = [10, 20, 50];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(
    private serviConex: ConexService
  ){

  }
  ngOnInit() {
    console.log('iniciando');
    this.getListado();
    //this.categories = this.eliminaDuplicados(this.categories)
    console.log('categorias', this.categories)
  }
  getListado(){
    this.serviConex.getlista().subscribe(
      (res: Cervejaria[]) =>{
        console.log(res);
        this.lista = res;
        this.dataSource = new MatTableDataSource(this.lista);
        //this.pagineo.length = res.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        console.log('erroorr: ',error)
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    //filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  eliminaDuplicados(arr){
    return arr.filter((valor, indice) => {
      return arr.indexOf(valor) === indice;
    });
  }
  
  fnCategories(){
    if (!this.categories) {
      this.categories = this.lista.map( e => {
        return e.category
      })
      this.categories = this.eliminaDuplicados(this.categories)
      console.log('categorias', this.categories)
    }
    
  }
  fnCities(){
    if (!this.cities) {
      this.cities = this.lista.map( e => {
        return e.city
      })
      this.cities = this.eliminaDuplicados(this.cities)
      //console.log('cities', this.cities)
      this.cities.sort();
    }
  }

  filterListado(filter, value){
    let listTemp: Cervejaria[]
    listTemp = this.lista.filter( e => {
      if( e[filter] == value) return e
    })
    console.log('filtro ', filter, listTemp)
    this.dataSource = new MatTableDataSource(listTemp);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterIbu(){
    let listTemp: Cervejaria[]
    listTemp = this.lista.filter( e => {
      if(e.ibu > this.minIbu && e.ibu < this.maxIbu ) return e
    })
    this.dataSource = new MatTableDataSource(listTemp);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  resetFilter(){
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }
  
}
