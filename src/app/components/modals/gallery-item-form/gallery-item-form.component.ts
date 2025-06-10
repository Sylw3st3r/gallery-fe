import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  RxFormBuilder,
  RxReactiveFormsModule,
} from '@rxweb/reactive-form-validators';
import { ModalComponent } from '../../shared/modal/modal.component';
import { WiredInputComponent } from '../../shared/wired-input/wired-input.component';
import { WiredImageUploadComponent } from '../../shared/wired-image-upload/wired-image-upload.component';
import { GalleryItemsRepo } from '../../../repos/gallery-items.repo';
import {
  CreateGalleryItemPayload,
  CreateGalleryItemPayloadFields,
} from '../../../models/create-gallery-item-payload.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryDataService } from '../../../services/gallery-data.service';

type GalleryItemForm = FormGroup<{
  [key in CreateGalleryItemPayloadFields]: key extends 'image'
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

  constructor(
    private readonly formBuilder: RxFormBuilder,
    private readonly _galleryItemsRepo: GalleryItemsRepo,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly galleryDataService: GalleryDataService,
  ) {
    const createGalleryItemPayload = new CreateGalleryItemPayload();
    this.galleryItemForm = this.formBuilder.formGroup(
      createGalleryItemPayload,
    ) as GalleryItemForm;
  }

  onSubmit() {
    if (this.galleryItemForm.valid) {
      this._galleryItemsRepo
        .create(this.galleryItemForm.getRawValue())
        .subscribe(() => {
          this.galleryDataService.retrigger();
          this.onClose();
        });
    } else {
      this.galleryItemForm.markAllAsTouched();
    }
  }

  onClose() {
    this.router.navigate(['..'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
