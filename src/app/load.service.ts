import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private functions: AngularFireFunctions,
    private storage: AngularFireStorage
  ) {}

  async saveImg(img: string) {
    let time = new Date().getTime();
    let ref = this.storage.ref('edited' + '/' + `${time}.png`);

    await ref.putString(img, 'data_url');

    return ref.getDownloadURL().toPromise();
  }

  async sendDesign(email: string, link: string, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.functions
        .httpsCallable('sendDesign')({
          email,
          link,
          name,
        })
        .pipe(first())
        .subscribe(
          async (resp) => {
            console.log(resp);
            resolve(resp);
          },
          (err) => {
            console.error({ err });
            reject(JSON.stringify(err));
          }
        );
    });
  }

  async generate(
    prompt: string,
    neg: string,
    type: 'other' | 'logo' = 'other',
    dimensions = {
      width: 500,
      height: 500,
    }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.functions
        .httpsCallable('generate')({
          type,
          prompt,
          neg,
          dimensions,
        })
        .pipe(first())
        .subscribe(
          async (resp) => {
            if (resp) {
              console.log(resp);
              resolve(resp);
            } else {
              reject('UNKNOWN ERROR');
            }
          },
          (err) => {
            console.error({ err });
            reject(JSON.stringify(err));
          }
        );
    });
  }
}
