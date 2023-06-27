import {ExpenseMapper} from "./expense.mapper";
import {Expense, RestaurantExpense, TripExpense} from "../../domain/expense";

describe("Expense mapper", () => {

  test(`Given an expense as dto representing a trip expense,
  when mapping it to expense,
  then it returns expected expense.`, () => {
    const anExpenseFromExternalSource = {
      "id": 50,
      "nature": "trip",
      "amount": 965,
      "comment": "Enim maioren.",
      "purchasedOn": "2022-05-12",
      "updatedAt": "2022-11-16T00:09:12.057Z",
      "distance": 988
    };

    const mappedExpense: Expense = ExpenseMapper.fromDto(anExpenseFromExternalSource);

    expect(mappedExpense instanceof TripExpense).toBeTruthy();
    expect(mappedExpense.getAmount()).toEqual(anExpenseFromExternalSource.amount);
    expect(mappedExpense.getCreationDate()).toEqual(new Date(anExpenseFromExternalSource.purchasedOn));
    expect(mappedExpense.getLastUpdate()).toEqual(new Date(anExpenseFromExternalSource.updatedAt));
    expect(mappedExpense.getId()).toEqual(anExpenseFromExternalSource.id);
    expect(mappedExpense.getCommentary()).toEqual(anExpenseFromExternalSource.comment);
    expect((mappedExpense as TripExpense).getDistance()).toEqual(anExpenseFromExternalSource.distance);
  });

  test(`Given an expense as dto representing a restaurant expense,
  when mapping it to expense,
  then it returns expected expense.`, () => {
    const anExpenseFromExternalSource = {
      "id": 42,
      "nature": "restaurant",
      "amount": 846,
      "comment": "Excepturi blanditiis at est sapiente tenetur ipsum sunt voluptate, vp.",
      "purchasedOn": "2022-08-08",
      "updatedAt": "2022-10-21T06:25:59.492Z",
      "invites": 2
    }

    const mappedExpense: Expense = ExpenseMapper.fromDto(anExpenseFromExternalSource);

    expect(mappedExpense instanceof RestaurantExpense).toBeTruthy();
    expect(mappedExpense.getAmount()).toEqual(anExpenseFromExternalSource.amount);
    expect(mappedExpense.getCreationDate()).toEqual(new Date(anExpenseFromExternalSource.purchasedOn));
    expect(mappedExpense.getLastUpdate()).toEqual(new Date(anExpenseFromExternalSource.updatedAt));
    expect(mappedExpense.getId()).toEqual(anExpenseFromExternalSource.id);
    expect(mappedExpense.getCommentary()).toEqual(anExpenseFromExternalSource.comment);
    expect((mappedExpense as RestaurantExpense).getNumberOfGuests()).toEqual(anExpenseFromExternalSource.invites);
  });

});
