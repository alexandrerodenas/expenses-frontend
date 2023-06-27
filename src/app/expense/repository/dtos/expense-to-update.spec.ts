import {RestaurantExpenseToCreate, TripExpenseToCreate} from "./expense-to-create";
import {apply_yyyy_MM_dd} from "../../../utils/date-formatter";
import {RestaurantExpenseToUpdate, TripExpenseToUpdate} from "./expense-to-update";

describe("Expense to update", () => {

  const anId = 20;
  const anAmount = 100;
  const aDate = new Date();
  const aCommentary = "a commentary";
  const aDistance = 1000;
  const aNumberOfGuests = 2;

  test(`Given a trip expense to update,
  when converting it as dto,
  then returns expected dto.`, () => {
    const tripExpenseToUpdate = new TripExpenseToUpdate(
      anId,
      anAmount,
      aDate,
      aCommentary,
      aDistance
    );

    const dto: any = tripExpenseToUpdate.toDto();

    expect(dto).toEqual({
      id: anId,
      nature: "trip",
      amount: anAmount,
      comment: aCommentary,
      purchasedOn: apply_yyyy_MM_dd(aDate),
      distance: aDistance
    })
  });

  test(`Given a restaurant expense to update,
  when converting it as dto,
  then returns expected dto.`, () => {
    const restaurantExpenseToUpdate = new RestaurantExpenseToUpdate(
      anId,
      anAmount,
      aDate,
      aCommentary,
      aNumberOfGuests
    );

    const dto: any = restaurantExpenseToUpdate.toDto();

    expect(dto).toEqual({
      id: anId,
      nature: "restaurant",
      amount: anAmount,
      comment: aCommentary,
      purchasedOn: apply_yyyy_MM_dd(aDate),
      invites: aNumberOfGuests
    });
  });
});
