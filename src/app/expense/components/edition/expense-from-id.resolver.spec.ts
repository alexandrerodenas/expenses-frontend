import {ExpenseFromIdResolver} from './expense-from-id.resolver';
import {ExpenseRepository} from "../../repository/expense.repository";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {TripExpense} from "../../domain/expense";
import {ActivatedRouteSnapshot} from "@angular/router";
import { ExpenseRepositoryMock } from "../../repository/expense.repository.mock";

describe('ExpenseFromIdResolver', () => {
  const mockedExpenseRepository = new ExpenseRepositoryMock();
  const aValidExpenseId = 1;
  const anUnknownExpenseId = 2;
  const anExpense = new TripExpense(
    aValidExpenseId,
    10,
    new Date(),
    new Date(),
    "a commentary",
    200
  );
  const resolver: ExpenseFromIdResolver = new ExpenseFromIdResolver(mockedExpenseRepository);

  beforeEach(() => {
    mockedExpenseRepository.get.mockImplementation((id: number) => {
      if (id === aValidExpenseId) {
        return of(anExpense);
      }
      return throwError(() => "Not found expense.");
    });
  });

  test(`Given an expense id,
  when resolving expense from id,
  then returns expected expense.`, (done) => {
    const mockedActivatedRouteSnapshot = {
      paramMap: {
        get: () => aValidExpenseId
      }
    } as unknown as ActivatedRouteSnapshot;

    resolver.resolve(mockedActivatedRouteSnapshot).subscribe(
      expense => {
        expect(expense).toEqual(anExpense);
        done();
      }
    );
  });

  test(`Given an unknown expense id,
  when resolving expense from id,
  then an error is thrown.`, (done) => {
    const mockedActivatedRouteSnapshot = {
      paramMap: {
        get: () => anUnknownExpenseId
      }
    } as unknown as ActivatedRouteSnapshot;

    resolver.resolve(mockedActivatedRouteSnapshot).subscribe({
        error:
          (error) => {
            expect(error).toEqual("Not found expense.");
            done();
          }
      }
    );
  });
});
