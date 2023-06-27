import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-expense-button',
  templateUrl: './create-expense-button.component.html',
  styleUrls: ['./create-expense-button.component.scss']
})
export class CreateExpenseButtonComponent {
  @Output() click = new EventEmitter<void>();

}
