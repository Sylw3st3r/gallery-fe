import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { WiredInputComponent } from '../wired-input/wired-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  RxFormBuilder,
  RxReactiveFormsModule,
} from '@rxweb/reactive-form-validators';
import {
  GalleryItem,
  GalleryItemFields,
} from '../../services/gallery-item.model';
import { WiredImageUploadComponent } from '../wired-image-upload/wired-image-upload.component';

type GalleryItemForm = FormGroup<{
  [key in GalleryItemFields]: key extends 'image'
    ? FormControl<File>
    : FormControl<string>;
}>;

@Component({
  selector: 'gallery-item-form',
  templateUrl: './gallery-item-form.component.html',
  styleUrls: ['./gallery-item-form.component.scss'],
  imports: [
    ModalComponent,
    WiredInputComponent,
    WiredImageUploadComponent,
    RxReactiveFormsModule,
    ReactiveFormsModule,
  ],
})
export class GalleryItemFormComponent {
  public galleryItemForm: GalleryItemForm;

  constructor(private readonly formBuilder: RxFormBuilder) {
    const galleryItem = new GalleryItem();
    this.galleryItemForm = this.formBuilder.formGroup(
      galleryItem,
    ) as GalleryItemForm;
  }

  onSubmit() {
    if (this.galleryItemForm.valid) {
      console.log(this.galleryItemForm.getRawValue());
    } else {
      this.galleryItemForm.markAllAsTouched(); // show errors
    }
  }
}
