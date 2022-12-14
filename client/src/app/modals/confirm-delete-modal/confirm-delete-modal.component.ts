import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {

  @Output() public confirm = new EventEmitter();
  public title?: string;

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  public yes() {
    this.confirm.emit();
    this.modalRef.hide();
  }

  public no() {
    this.modalRef.hide();
  }

}
