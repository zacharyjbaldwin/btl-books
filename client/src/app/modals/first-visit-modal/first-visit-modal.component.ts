import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-first-visit-modal',
  templateUrl: './first-visit-modal.component.html',
  styleUrls: ['./first-visit-modal.component.scss']
})
export class FirstVisitModalComponent implements OnInit {

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  gotIt() {
    this.modalRef.hide();
  }

}
