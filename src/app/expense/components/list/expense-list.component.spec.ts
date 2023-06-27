import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListComponent } from './expense-list.component';
import { RestaurantExpense, TripExpense } from "../../domain/expense";
import { By } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, LOCALE_ID } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CreateExpenseButtonComponent } from "./create-expense-button/create-expense-button.component";
import { PaginationComponent } from "./pagination/pagination.component";

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

  const expenses = [
    new TripExpense(1, 100, new Date(), new Date(), "a commentary", 250),
    new RestaurantExpense(2, 250, new Date(), new Date(), "another commentary", 2)
  ];
  const datePipe = new DatePipe('en-US');
  let spyOnPaginationChange: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExpenseListComponent,
        CreateExpenseButtonComponent,
        PaginationComponent
      ],
      imports: [
        FontAwesomeModule
      ],
      providers:[
        { provide: LOCALE_ID, useValue: "en-US" }
      ]
    })
      .overrideComponent(ExpenseListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    component.expenses = expenses;
    spyOnPaginationChange = jest.spyOn(component.onPaginationChange, "emit");
    fixture.detectChanges();
  });

  test(`Given a list of expense,
  when checking view,
  then it displays id.`, () => {
    const tableRows = fixture.debugElement.queryAll(By.css("tr"));
    expect(tableRows.length).toEqual(expenses.length + 1); // because of header row

    const expectedData = expenses.map(expense => ({
      id: expense.getId(),
      amount: expense.getAmount(),
      creationDate: datePipe.transform(expense.getCreationDate(), 'dd/MM/yyyy hh:mm:ss'),
      updatedAt: datePipe.transform(expense.getLastUpdate(), 'dd/MM/yyyy hh:mm:ss'),
      commentary: expense.getCommentary()
    }));

    tableRows.slice(1).forEach((row, i) => {
      const tableColumns = row.queryAll(By.css('td'));
      const {id, amount, creationDate, updatedAt, commentary} = expectedData[i];
      expect(tableColumns[0].nativeElement.innerHTML).toBe(`${id}`);
      expect(tableColumns[1].nativeElement.innerHTML).toBe(`${amount}`);
      expect(tableColumns[2].nativeElement.innerHTML).toBe(creationDate);
      expect(tableColumns[3].nativeElement.innerHTML).toBe(updatedAt);
      expect(tableColumns[4].nativeElement.innerHTML).toBe(commentary);
    });
  });

  test(`Given pagination child component,
  when pagination changes,
  then it redirects change to container.`, () => {
    component.changePagination({
      page: 3,
      limit: 10
    });

    expect(spyOnPaginationChange).toHaveBeenCalledWith({
      page: 3,
      limit: 10
    });
  });

  test(`Given list of expenses,
  when clicking on one of them,
  then it emits proper id.`, () => {
    const spyOnExpenseClick = jest.spyOn(component.onExpenseClick, "emit");
    const targetedId = expenses[0].getId();
    const tableRowOfFirstExpense: HTMLTableRowElement = fixture
      .debugElement
      .query(By.css(`#expense-row-${targetedId}`))
      .nativeElement;

    tableRowOfFirstExpense.click();

    expect(spyOnExpenseClick).toHaveBeenCalledWith(targetedId);
  });

  test(`Given a button to create new expense,
  when clicking on it,
  then it emits proper action.`, () => {
    const spyOnCreationButtonClick = jest.spyOn(component.onCreationButtonClick, "emit");
    const creationExpenseBtn: HTMLButtonElement = fixture
      .debugElement
      .query(By.css("#expense-creation-btn"))
      .nativeElement;

    creationExpenseBtn.click();

    expect(spyOnCreationButtonClick).toHaveBeenCalled();
  });
});
