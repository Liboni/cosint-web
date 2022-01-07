import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { CesStoreApi } from 'src/app/enums/ces-store-api.enum';
import { OrderService } from 'src/app/services/order.service';
import { StatusService } from 'src/app/services/status.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-setup-transaction',
  templateUrl: './setup-transaction.component.html',
  styleUrls: ['./setup-transaction.component.scss']
})
export class SetupTransactionComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  headElements = ['#', 'Order Number', 'Full Name', 'Product Name', 'Address', 'Amount', 'Status', 'Transaction Details','Date'];
  orders:any=[];
  statuses:any=[];
  previous: any = [];
  searchText: string;
  constructor(public service:OrderService, private statusService:StatusService) { }

  ngOnInit(): void {
    this.service.GetOrders(CesStoreApi.API).subscribe((data:any)=>{
      this.statusService.GetStatuses().subscribe((result:any)=>{
        this.orders = data.filter(a=>a.statusId > 4);
        this.statuses = result.items.filter(a=>a.id >4);
        this.mdbTable.setDataSource(this.orders);
        this.orders = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
    });
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
