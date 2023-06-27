import { ExpenseEditionContainerComponent } from './expense-edition-container.component';
import { ExpenseType, TripExpense } from "../../domain/expense";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { RestaurantExpenseToUpdate, TripExpenseToUpdate } from "../../repository/dtos/expense-to-update";
import { formatDate } from "@angular/common";
import { ExpenseRepositoryMock } from "../../repository/expense.repository.mock";

jest.mock("@angular/router");
describe('ExpenseEditionContainerComponent', () => {
  const anExpenseTripToEdit = new TripExpense(
    1,
    100,
    new Date(),
    new Date(),
    "a commentary",
    1000
  );
  const mockedExpenseRepository = new ExpenseRepositoryMock();
  const mockedRouter = new Router();

  describe("Container with valid expense", () => {
    const mockedActivatedRoute = {
      data: of({expenseToEdit: anExpenseTripToEdit})
    };
    const component = new ExpenseEditionContainerComponent(
      mockedActivatedRoute as unknown as ActivatedRoute,
      mockedExpenseRepository,
      mockedRouter
    );

    beforeEach(() => {
      component.ngOnInit();
      mockedExpenseRepository.update.mockReturnValue(of(anExpenseTripToEdit));
    })

    test(`Given an expense from route data,
      when initiating container,
      then it assigns expense as expected.`, (done) => {
      component.expenseToEdit.subscribe(expenseToEditInComponent => {
        expect(expenseToEditInComponent).toEqual(anExpenseTripToEdit);
        done();
      });
    });

    test(`Given a form to edit  trip expense,
      when editing expense from it,
      then it send expected request.`, (done) => {
      const aFormToEditExpense = {
        id: 1,
        amount: 100,
        type: "trip" as ExpenseType,
        creationDate: formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en'),
        commentary: "a commentary",
        distance: 1000,
        guests: 0
      };

      component.editExpenseFrom(aFormToEditExpense).subscribe(
        () => {
          expect(mockedExpenseRepository.update).toHaveBeenCalledWith(
            new TripExpenseToUpdate(
              aFormToEditExpense.id,
              aFormToEditExpense.amount,
              new Date(aFormToEditExpense.creationDate),
              aFormToEditExpense.commentary,
              aFormToEditExpense.distance
            )
          );
          done();
        }
      );
    });

    test(`Given a form to edit restaurant expense,
      when editing expense from it,
      then it send expected request.`, (done) => {
      const aFormToEditExpense = {
        id: 1,
        amount: 100,
        type: "restaurant" as ExpenseType,
        creationDate: formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en'),
        commentary: "a commentary",
        distance: 0,
        guests: 20
      };

      component.editExpenseFrom(aFormToEditExpense).subscribe(() => {
        expect(mockedExpenseRepository.update).toHaveBeenCalledWith(
          new RestaurantExpenseToUpdate(
            aFormToEditExpense.id,
            aFormToEditExpense.amount,
            new Date(aFormToEditExpense.creationDate),
            aFormToEditExpense.commentary,
            aFormToEditExpense.guests
          )
        );
        done();
      });
    });

    test(`Given a form to edit an expense,
      when editing expense from it,
      then user is redirected to list page.`, (done) => {
        const aFormToEditExpense = {
          id: 1,
          amount: 100,
          type: "restaurant" as ExpenseType,
          creationDate: formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en'),
          commentary: "a commentary",
          distance: 0,
          guests: 20
        };
        const spyOnNavigateByUrl = jest.spyOn(mockedRouter, 'navigateByUrl')
          .mockReturnValue(Promise.resolve(true));

        component.editExpenseFrom(aFormToEditExpense).subscribe(() => {
          expect(spyOnNavigateByUrl).toHaveBeenCalledWith("/expenses");
          done();
        });
      }
    );
  });

  test(`Given no expense from route data,
  when initiating container,
  then an error is thrown.`, (done) => {
    const mockedActivatedRoute = {
      data: of({})
    };
    const componentWithNoDataFromActivatedRoute = new ExpenseEditionContainerComponent(
      mockedActivatedRoute as unknown as ActivatedRoute,
      mockedExpenseRepository,
      mockedRouter
    );

    componentWithNoDataFromActivatedRoute.ngOnInit();

    componentWithNoDataFromActivatedRoute.expenseToEdit.subscribe({
        error: (error) => {
          expect(error).toEqual(new Error("No expense to edit found."));
          done();
        }
      }
    );
  });
});
