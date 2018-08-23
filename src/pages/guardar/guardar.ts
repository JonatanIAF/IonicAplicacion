import { Component } from '@angular/core';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-guardar',
  templateUrl: 'guardar.html',
})
export class GuardarPage {
  model: Contact;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactProvider: ContactProvider, private toast: ToastController) {
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key =  this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
  }
  save() {
    this.saveContact()
      .then(() => {
        this.toast.create({ message: 'Contacto guardado.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Error al guardar.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private saveContact() {
    if (this.key) {
      return this.contactProvider.update(this.key, this.model);
    } else {
      return this.contactProvider.insert(this.model);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardarPage');
  }

}
