import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
  ],
})
export class ModalComponent {
  @Output('backdrop-click')
  public backdropClick$: EventEmitter<void> = new EventEmitter();

  @Input()
  public header: string = '';
}
