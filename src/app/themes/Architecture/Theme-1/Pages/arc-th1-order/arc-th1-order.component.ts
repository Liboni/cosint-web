import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { OrderService } from 'src/app/services/order.service';
import { StatusService } from 'src/app/services/status.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-arc-th1-order',
  templateUrl: './arc-th1-order.component.html',
  styleUrls: ['./arc-th1-order.component.scss']
})
export class ArcTh1OrderComponent implements OnInit {
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
