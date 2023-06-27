import {RestaurantExpense, TripExpense} from "./expense";

describe("expense", () => {

  const anId = 0;
  const anAmount = 10;
  const aCreationDate = new Date();
  const alastUpdateDate = new Date();
  const aCommentary = "a commentary";
  const aNumberOfGuests = 2;
  const aDistance = 800;
  const aValidRestaurantExpense: RestaurantExpense = new RestaurantExpense(
    anId,
    anAmount,
    aCreationDate,
    alastUpdateDate,
    aCommentary,
    aNumberOfGuests
  );
  const aValidTripExpense: TripExpense = new TripExpense(
    anId,
    anAmount,
    aCreationDate,
    alastUpdateDate,
    aCommentary,
    aDistance
  );

  test(`Given an expense,
  when getting unique identifier,
  then it returns expected identifier`, () => {
    expect(aValidRestaurantExpense.getId()).toEqual(anId);
  });

  test(`Given zero as amount,
      when creating an expense,
      then it throws an error`, () => {
    const zero = 0;

    expect(() => new TripExpense(
      anId,
      zero,
      aCreationDate,
      alastUpdateDate,
      aCommentary,
      aDistance
    )).toThrow("Amount must be strictly positive.");
  });

  test(`Given a negative amount,
      when creating an expense,
      then it throws an error`, () => {
    const aNegativeAmount = -1;

    expect(() => new TripExpense(
      anId,
      aNegativeAmount,
      aCreationDate,
      alastUpdateDate,
      aCommentary,
      aDistance
    )).toThrow("Amount must be strictly positive.");
  });

  test(`Given an expense,
  when getting amount,
  then it returns expected amount`, () => {
    expect(aValidRestaurantExpense.getAmount()).toEqual(anAmount);
  });

  test(`Given an expense,
  when getting creation date,
  then it returns expected date`, () => {
    expect(aValidRestaurantExpense.getCreationDate()).toEqual(aCreationDate);
  });

  test(`Given an expense,
  when getting last update,
  then it returns expected date`, () => {
    expect(aValidRestaurantExpense.getLastUpdate()).toEqual(aCreationDate);
  });

  test(`Given an expense,
  when getting commentary,
  then it returns expected commentary`, () => {
    expect(aValidRestaurantExpense.getCommentary()).toEqual(aCommentary);
  });

  describe("Restaurant expense", () => {
    test(`Given an restaurant expense,
      when getting number of guests,
      then it returns expected number`, () => {
      expect(aValidRestaurantExpense.getNumberOfGuests()).toEqual(aNumberOfGuests);
    });

    test(`Given a restaurant expense,
      when getting type,
      then it returns expected expense type`, () => {
      expect(aValidRestaurantExpense.getType()).toEqual("restaurant");
    });


    test(`Given a negative number of guests,
      when creating a trip expense,
      then it throws an error`, () => {
      const aNegativeNumberOfGuests = -1;

      expect(() => new RestaurantExpense(
        anId,
        anAmount,
        aCreationDate,
        alastUpdateDate,
        aCommentary,
        aNegativeNumberOfGuests
      )).toThrow("Number of guests must be strictly positive.");
    });

    test(`Given a floating number of guests,
      when creating a trip expense,
      then it throws an error`, () => {
      const aFloatingNumber = 1.1;

      expect(() => new RestaurantExpense(
        anId,
        anAmount,
        aCreationDate,
        alastUpdateDate,
        aCommentary,
        aFloatingNumber
      )).toThrow("Number of guests must be integer.");
    });
  });

  describe("Trip expense", () => {
    test(`Given a trip expense,
      when getting distance,
      then it returns expected number`, () => {
      expect(aValidTripExpense.getDistance()).toEqual(aDistance);
    });

    test(`Given a negative distance,
      when creating a trip expense,
      then it throws an error`, () => {
      const aNegativeDistance = -1;

      expect(() => new TripExpense(
        anId,
        anAmount,
        aCreationDate,
        alastUpdateDate,
        aCommentary,
        aNegativeDistance
      )).toThrow("Distance must be strictly positive.");
    });

    test(`Given zero as distance,
      when creating a trip expense,
      then it throws an error`, () => {
      const zero = 0;

      expect(() => new TripExpense(
        anId,
        anAmount,
        aCreationDate,
        alastUpdateDate,
        aCommentary,
        zero
      )).toThrow("Distance must be strictly positive.");
    });

    test(`Given a trip expense,
      when getting type,
      then it returns expected expense type`, () => {
      expect(aValidTripExpense.getType()).toEqual("trip");
    });
  })


});
