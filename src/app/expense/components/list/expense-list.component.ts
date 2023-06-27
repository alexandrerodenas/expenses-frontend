import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, ExpenseId } from "../../domain/expense";
import { faCoins, faSuitcase, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from "./pagination/pagination.component";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseListComponent {
  public readonly faSuitcase = faSuitcase;
  public readonly faUtensils = faUtensils;
  public readonly faCoins = faCoins;

  @Input() expenses: ReadonlyArray<Expense>;
  @Input() count: number;
  @Output() onPaginationChange = new EventEmitter<Pagination>();
  @Output() onExpenseClick = new EventEmitter<ExpenseId>();
  @Output() onCreationButtonClick = new EventEmitter<void>();

  public changePagination(pagination: Pagination): void {
    this.onPaginationChange.emit(pagination);
  }

  public openCreationPage(): void {
    this.onCreationButtonClick.emit();
  }
}
