import { Component, OnInit, ViewChild } from '@angular/core';
import * as alertify from 'alertifyjs';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { OrderService } from '../services/order.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  headElements = ['#', 'Prescription Image', 'Name', 'Description', 'Quantity', 'Price/item', 'Total', 'Status', 'Date'];
  orders:any=[];
  items = localStorage.getItem("items");
  previous: any = [];
  statuses:any=[];
  searchText: string;
  constructor(public service:OrderService, private statusService:StatusService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      this.service.GetOrdersByUserId(user.user_id).subscribe((data: any) => { 
        this.statusService.GetStatuses().subscribe((result:any)=>{
          this.statuses = result.items.filter(a=>a.id >4);
          this.orders = data;
          this.mdbTable.setDataSource(this.orders);
          this.orders = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        });  
      });
    }
  }

  onChange(statusId,data){
    data.statusId = statusId;
    data.status = null;
    this.service.EditOrder(data).subscribe(result=>{
      alertify.success('Order updated successfully!');
    },error=>{
      alertify.error(error.error);
    })   
  }
}
