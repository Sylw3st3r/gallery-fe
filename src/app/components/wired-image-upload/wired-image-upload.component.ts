import {
  Component,
  forwardRef,
  Injector,
  OnInit,
  Optional,
  Host,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperDialogComponent } from '../image-cropper-dialog/image-cropper-dialog.component';

@Component({
  selector: 'wired-image-upload',
  templateUrl: './wired-image-upload.component.html',
  styleUrl: './wired-image-upload.component.scss',
  imports: [ReactiveFormsModule, MatIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WiredImageUploadComponent),
      multi: true,
    },
  ],
})
export class WiredImageUploadComponent implements ControlValueAccessor, OnInit {
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl | null = null;

  disabled = false;
  onChanged = (_: File | null) => {};
  onTouched = () => {};

  controler?: NgControl;

  constructor(
    @Optional() @Host() private injector: Injector,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.controler = this.injector.get(NgControl, {
      self: true,
      optional: true,
    });
    if (this.controler) {
      this.controler.valueAccessor = this;
    }
  }

  writeValue(_: File | null): void {
    // No need to set input file programmatically; clear imageChangedEvent so cropper resets
    this.croppedImage = null;
    this.imageChangedEvent = null;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  fileChangeEvent(event: Event): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '500px',
      data: { imageChangedEvent: event },
    });

    dialogRef.afterClosed().subscribe((croppedBlob: Blob | null) => {
      if (croppedBlob) {
        const file = new File([croppedBlob], 'croppedImage.png', {
          type: 'image/png',
        });
        this.controler?.control?.patchValue({ image: file });
        this.controler?.control?.get('image')?.updateValueAndValidity();

        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(file),
        );
      }
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl,
      );
    }
    if (event.blob) {
      const file = new File([event.blob], 'croppedImage.png', {
        type: 'image/png',
      });
      this.onChanged(file);
    }
  }
}
