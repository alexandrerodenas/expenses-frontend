export type ExpenseId = number;
export type Distance = number;
export type ExpenseType = "trip" | "restaurant";

export abstract class Expense {

  protected constructor(
    private readonly id: ExpenseId,
    private readonly amount: number,
    private readonly creationDate: Date,
    private readonly lastUpdate: Date,
    private readonly commentary: string
  ) {
    if(amount <= 0){
      throw new Error("Amount must be strictly positive.");
    }
  }

  public getId(): ExpenseId {
    return this.id
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getLastUpdate(): Date {
    return this.lastUpdate;
  }

  public getCommentary(): string {
    return this.commentary;
  }

  public abstract getType() : ExpenseType;
}

export class TripExpense extends Expense {

  constructor(
    id: ExpenseId,
    amount: number,
    creationDate: Date,
    lastUpdate: Date,
    commentary: string,
    private readonly distance: Distance
  ) {
    super(id, amount, creationDate, lastUpdate, commentary);
    if(distance <= 0){
      throw new Error("Distance must be strictly positive.");
    }
  }


  public getDistance(): Distance {
    return this.distance;
  }

  public getType() : ExpenseType {
    return "trip";
  }
}

export class RestaurantExpense extends Expense {

  constructor(
    id: ExpenseId,
    amount: number,
    creationDate: Date,
    lastUpdate: Date,
    commentary: string,
    private readonly guests: number
  ) {
    super(id, amount, creationDate, lastUpdate, commentary);

    if(this.guests < 0){
      throw new Error("Number of guests must be strictly positive.");
    }
    if(!Number.isInteger(this.guests)){
      throw new Error("Number of guests must be integer.");
    }
  }

  public getNumberOfGuests(): number {
    return this.guests;
  }

  public getType() : ExpenseType {
    return "restaurant";
  }
}
