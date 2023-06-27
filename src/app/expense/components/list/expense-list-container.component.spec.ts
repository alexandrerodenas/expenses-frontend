import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListContainerComponent } from './expense-list-container.component';
import { ExpenseRepository } from "../../repository/expense.repository";
import { of } from "rxjs";
import { ExpenseListComponent } from "./expense-list.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateExpenseButtonComponent } from "./create-expense-button/create-expense-button.component";
import { createTestableExpense } from "./mock/testable-expense";
import { ExpenseRepositoryMock } from "../../repository/expense.repository.mock";

describe('ExpenseListContainerComponent', () => {
  let component: ExpenseListContainerComponent;
  let fixture: ComponentFixture<ExpenseListContainerComponent>;

  let mockedExpenseRepository: ExpenseRepositoryMock;

  const mockedRouter = {
    navigateByUrl: jest.fn(),
    navigate: jest.fn()
  } as unknown as Router;

  const aListOfExpenses = [
    createTestableExpense(),
    createTestableExpense(),
    createTestableExpense(),
  ];

  const mockedActivatedRoute = {
    data: of(
      {
        listResult: {
          items: aListOfExpenses,
          count: aListOfExpenses.length
        },
      }
    ),
    queryParamMap: of(void 0)
  };


  const mockedConfiguration = {
    api: "",
    pagination: {
      limit: 2
    }
  }

  beforeEach(async () => {
    mockedExpenseRepository = new ExpenseRepositoryMock();
    mockedExpenseRepository.listFor.mockReturnValue(
      of({
        items: aListOfExpenses,
        count: aListOfExpenses.length
      })
    );
    await TestBed.configureTestingModule({
      declarations: [
        ExpenseListContainerComponent,
        ExpenseListComponent,
        PaginationComponent,
        CreateExpenseButtonComponent
      ],
      imports: [
        FontAwesomeModule
      ],
      providers: [
        {
          provide: ExpenseRepository, useValue: mockedExpenseRepository
        },
        {
          provide: 'configuration', useValue: mockedConfiguration
        },
        {
          provide: Router, useValue: mockedRouter
        },
        {
          provide: ActivatedRoute, useValue: mockedActivatedRoute
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test(`Given a list of expense in activated route data,
  when initiating component container,
  then list of expense has been set.`, () => {
    expect(component.expenses).toEqual(aListOfExpenses);
    expect(component.count).toEqual(aListOfExpenses.length);
  });


  test(`Given a list of expense from api,
  when getting a pagination change from child component,
  then it fetches a new list of expenses using new pagination.`, () => {
    component.changePagination({
      page: 2,
      limit: 10
    })
    expect(mockedExpenseRepository.listFor).toHaveBeenCalledWith(2, 10);
    expect(mockedRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: {page: 2},
      relativeTo: mockedActivatedRoute
    });
  });

  test(`Given a list of expenses displayed,
  when getting emission of click on one of expenses,
  then user navigates to edition page.`, () => {
    const expenseListComponent = fixture
      .debugElement
      .query(By.directive(ExpenseListComponent))
      .componentInstance;
    const anExpenseId = 1;

    expenseListComponent.onExpenseClick.emit(anExpenseId);

    expect(mockedRouter.navigateByUrl).toHaveBeenCalledWith(`/expenses/edit/${anExpenseId}`);
  });


  test(`Given a button to navigates to creation page,
  when clicking on it,
  then user navigates to edition page.`, () => {
    const expenseListComponent = fixture
      .debugElement
      .query(By.directive(ExpenseListComponent))
      .componentInstance;

    expenseListComponent.onCreationButtonClick.emit();

    expect(mockedRouter.navigateByUrl).toHaveBeenCalledWith(`/expenses/new`);
  });


});
