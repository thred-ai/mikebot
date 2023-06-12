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

  async generate(
    prompt: string,
    neg: string,
    type: 'other' | 'logo' = 'other',
    dimensions = {
      width: 500,
      height: 500
    }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.functions
        .httpsCallable('generate')({
          type,
          prompt,
          neg,
          dimensions
        })
        .pipe(first())
        .subscribe(
          async (resp) => {
            if (resp) {
              console.log(resp)
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
