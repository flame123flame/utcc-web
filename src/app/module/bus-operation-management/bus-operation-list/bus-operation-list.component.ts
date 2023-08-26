import { Component } from '@angular/core';

@Component({
  selector: 'app-bus-operation-list',
  templateUrl: './bus-operation-list.component.html',
  styleUrls: ['./bus-operation-list.component.scss']
})
export class BusOperationListComponent {

  getDataInput(data: any) {
    return data.target.value
  }

}
