import {Expense, RestaurantExpense, TripExpense} from "../../domain/expense";

export abstract class ExpenseMapper {

  public static fromDto(object: any): Expense {
    if (object.hasOwnProperty("nature")) {
      if (object["nature"] === "trip") {
        return new TripExpense(
          object["id"] as number,
          object["amount"] as number,
          new Date(object["purchasedOn"]),
          new Date(object["updatedAt"]),
          object["comment"],
          object["distance"] as number
        );
      } else if (object["nature"] === "restaurant") {
        return new RestaurantExpense(
          object["id"] as number,
          object["amount"] as number,
          new Date(object["purchasedOn"]),
          new Date(object["updatedAt"]),
          object["comment"],
          object["invites"] as number
        );
      }
    }
    throw new Error("Could not map dto to expense.");
  }
}
