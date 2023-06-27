import { ExpenseCreationContainerComponent } from './expense-creation-container.component';
import { CreationForm } from "./form/model/creation-form";
import { apply_yyyy_MM_dd } from "../../../utils/date-formatter";
import { of } from "rxjs";
import { RestaurantExpenseToCreate, TripExpenseToCreate } from "../../repository/dtos/expense-to-create";
import { Router } from "@angular/router";
import { ExpenseRepositoryMock } from "../../repository/expense.repository.mock";
import { fakeAsync } from "@angular/core/testing";

jest.mock("@angular/router");
describe('ExpenseCreationContainerComponent', () => {
  const mockedExpenseRepository = new ExpenseRepositoryMock();
  mockedExpenseRepository.create.mockReturnValue(of(void 0));
  const mockedRouter = new Router();

  const component = new ExpenseCreationContainerComponent(
    mockedExpenseRepository,
    mockedRouter
  );

  const aTripExpenseCreationForm: CreationForm = {
    amount: 12,
    type: "trip",
    creationDate: apply_yyyy_MM_dd(new Date()),
    commentary: "a commentary",
    distance: 1000,
    guests: undefined
  };

  const aRestaurantExpenseCreationForm: CreationForm = {
    amount: 12,
    type: "restaurant",
    creationDate: apply_yyyy_MM_dd(new Date()),
    commentary: "a commentary",
    distance: undefined,
    guests: 2
  };

  test(`Given a valid creation form for trip expense,
  when creating new expense out of it,
  then it send expected requests.`, fakeAsync(() => {
    component
      .createExpenseFrom(aTripExpenseCreationForm);

    expect(mockedExpenseRepository.create).toHaveBeenCalledWith(
      new TripExpenseToCreate(
        aTripExpenseCreationForm.amount,
        new Date(aTripExpenseCreationForm.creationDate),
        aTripExpenseCreationForm.commentary,
        aTripExpenseCreationForm.distance
      )
    );
  }));

  test(`Given a valid creation form for restaurant expense,
  when creating new expense out of it,
  then it send expected requests.`, fakeAsync(() => {
    component
      .createExpenseFrom(aRestaurantExpenseCreationForm);

    expect(mockedExpenseRepository.create).toHaveBeenCalledWith(
      new RestaurantExpenseToCreate(
        aRestaurantExpenseCreationForm.amount,
        new Date(aRestaurantExpenseCreationForm.creationDate),
        aRestaurantExpenseCreationForm.commentary,
        aRestaurantExpenseCreationForm.guests
      )
    );
  }));

  test(`Given a valid creation form for expense,
  when creating new expense out of it,
  then it redirects user to list of expenses page.`, fakeAsync(() => {
    component
      .createExpenseFrom(aRestaurantExpenseCreationForm);

    expect(mockedRouter.navigateByUrl).toHaveBeenCalledWith("/expenses");
  }));
});
