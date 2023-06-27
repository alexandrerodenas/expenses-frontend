import {RestaurantExpenseToCreate, TripExpenseToCreate} from "./expense-to-create";
import {apply_yyyy_MM_dd} from "../../../utils/date-formatter";

describe("Expense to create", () => {

  const anAmount = 100;
  const aDate = new Date();
  const aCommentary = "a commentary";
  const aDistance = 1000;
  const aNumberOfGuests = 2;

  test(`Given a trip expense to create,
  when converting it as dto,
  then returns expected dto.`, () => {
    const tripExpenseToCreate = new TripExpenseToCreate(
      anAmount,
      aDate,
      aCommentary,
      aDistance
    );

    const dto: any = tripExpenseToCreate.toDto();

    expect(dto).toEqual({
      nature: "trip",
      amount: anAmount,
      comment: aCommentary,
      purchasedOn: apply_yyyy_MM_dd(aDate),
      distance: aDistance
    })
  });

  test(`Given a restaurant expense to create,
  when converting it as dto,
  then returns expected dto.`, () => {
    const restaurantExpenseToCreate = new RestaurantExpenseToCreate(
      anAmount,
      aDate,
      aCommentary,
      aNumberOfGuests
    );

    const dto: any = restaurantExpenseToCreate.toDto();

    expect(dto).toEqual({
      nature: "restaurant",
      amount: anAmount,
      comment: aCommentary,
      purchasedOn: apply_yyyy_MM_dd(aDate),
      invites: aNumberOfGuests
    })
  });
});
