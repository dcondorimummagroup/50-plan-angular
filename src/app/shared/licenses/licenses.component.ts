import { EventEmitter, Component, Output, Input } from '@angular/core';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent {
  @Input() selectedBox!: number;
  @Output() closeEvent = new EventEmitter<void>();
  close() {
    this.closeEvent.emit();
  }
  onOkClick() {
    this.close();
  }

  licenses = [
    {
      type: 'alpha',
      investmentRange: '100 - 1999',
      returns: {
        weekly: '0.625%',
        monthly: '2.5%',
        annual: '30%'
      }
    },
  ];
}
