import { Component, OnInit } from '@angular/core';
import { LoadService } from './load.service';
import { MatDialog } from '@angular/material/dialog';
import { EmailComponent } from './email/email.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mikebot';

  image?: string = undefined;

  loadingSend = false;

  regenerate() {}

  constructor(private l: LoadService, private dialog: MatDialog) {}

  ngOnInit(): void {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }

  async sendDesign(name: string) {
    if (this.image) {
      this.loadingSend = true;
      await this.l.sendDesign('arta@thredapps.com', this.image, name);
      this.loadingSend = false;
    }
  }

  openEmailDialog() {
    console.log('ko');
    let ref = this.dialog.open(EmailComponent, {
      width: 'calc(var(--vh, 1vh) * 50)',
      maxWidth: '100vw',
      panelClass: 'app-full-bleed-dialog',

      data: {},
    });

    ref.afterClosed().subscribe(val => {
      if (val && typeof val == 'string' && val != ""){
        let name = val as string

        this.sendDesign(name)
      }
    })
  }
}
