import {
  Component,
  forwardRef,
  Host,
  Injector,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'wired-input',
  templateUrl: './wired-input.component.html',
  styleUrls: ['./wired-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WiredInputComponent),
      multi: true,
    },
  ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
  ],
  standalone: true,
})
export class WiredInputComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  controler?: NgControl;

  disabled: boolean = false;

  onChanged = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Host() private injector: Injector) {}

  get formControl(): FormControl | null {
    return this.controler?.control as FormControl | null;
  }

  ngOnInit(): void {
    // Get NgControl from injector
    this.controler = this.injector.get(NgControl, {
      self: true,
      optional: true,
    });

    if (this.controler) {
      // Bind the control value accessor to this component (needed for reactive forms)
      this.controler.valueAccessor = this;
    }
  }

  // These methods are required by ControlValueAccessor interface,
  // but we don't manage value manually anymore
  writeValue(_: any): void {
    // No need to track manually as input uses [formControl]
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChanged(input.value);
  }

  get errorMessage(): string | null {
    const errors = this.controler?.control?.errors;
    if (!errors) return null;

    const message = errors[Object.keys(errors)[0]].message;

    return message || `Invalid ${this.label}`;
  }
}
