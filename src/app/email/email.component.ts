import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadService } from '../load.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  ngOnInit(): void {}

  loading = false;

  email = ''

  set(val: Event){
    this.email = (val.target as any).value
  }

  constructor(
    private userService: LoadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailComponent>
  ) {
    console.log("man")
  }

  async submit(email: string) {
    this.loading = true;
    this.loading = false;

    this.dialogRef.close(email)
  }
}
