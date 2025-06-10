import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  imports: [ImageCropperComponent, MatDialogModule, MatButtonModule],
})
export class ImageCropperDialogComponent {
  croppedBlob: Blob | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageChangedEvent: Event },
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedBlob = event.blob ?? null;
  }

  onConfirm() {
    this.dialogRef.close(this.croppedBlob);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
