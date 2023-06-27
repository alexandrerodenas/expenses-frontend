import { ExpenseListResolver } from './expense-list.resolver';
import { ActivatedRouteSnapshot } from "@angular/router";
import { ExpenseRepositoryMock } from "../../repository/expense.repository.mock";
import { of } from "rxjs";

jest.mock("@angular/router");
describe('ExpenseListResolver', () => {

  const mockedConfiguration = {
    api: "",
    pagination: {
      limit: 1
    }
  };
  const mockedExpenseRepository = new ExpenseRepositoryMock();

  const anExpenseListResolver = new ExpenseListResolver(
    mockedConfiguration,
    mockedExpenseRepository
  );
  const anExpectedListResult = {};


  test(`Given no pagination parameter,
  when resolving list of expenses,
  then it returns page one
  with a number expenses based on configured limit.`, (done) => {
    const mockedActivatedRouteSnapshot = {
      queryParamMap: {
        has: jest.fn().mockReturnValue(false)
      }
    } as unknown as ActivatedRouteSnapshot;

    mockedExpenseRepository.listFor.mockReturnValue(of(anExpectedListResult));

    anExpenseListResolver
      .resolve(mockedActivatedRouteSnapshot)
      .subscribe(listResult => {
        expect(listResult).toEqual(anExpectedListResult);
        expect(mockedExpenseRepository.listFor).toHaveBeenCalledWith(
          1,
          mockedConfiguration.pagination.limit
        );
        done();
      });
  });


  test(`Given a pagination parameter in url,
  when resolving list of expenses,
  then it returns given page
  with a number of expenses based on configured limit.`, (done) => {
    const aPage = 2;
    mockedExpenseRepository.listFor.mockReturnValue(of(anExpectedListResult));
    const mockedActivatedRouteSnapshot = {
      queryParamMap: {
        has: jest.fn().mockReturnValue(true),
        get: jest.fn().mockReturnValue(aPage)
      }
    } as unknown as ActivatedRouteSnapshot;


    anExpenseListResolver
      .resolve(mockedActivatedRouteSnapshot)
      .subscribe(listResult => {
        expect(listResult).toEqual(anExpectedListResult);
        expect(mockedExpenseRepository.listFor).toHaveBeenCalledWith(
          aPage,
          mockedConfiguration.pagination.limit
        );
        done();
      });
  });
});
