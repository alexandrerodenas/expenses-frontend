import {Distance} from "../../domain/expense";
import {apply_yyyy_MM_dd} from "../../../utils/date-formatter";

export abstract class ExpenseToCreate {
  protected constructor(
    protected readonly amount: number,
    protected readonly date: Date,
    protected readonly commentary: string
  ) {
  }

  public abstract toDto(): any;
}

export class RestaurantExpenseToCreate extends ExpenseToCreate {

  constructor(
    amount: number,
    date: Date,
    commentary: string,
    private readonly guests: number
  ) {
    super(amount, date, commentary);
  }
  public override toDto(): any {
    return {
      nature: "restaurant",
      amount: this.amount,
      comment: this.commentary,
      purchasedOn: apply_yyyy_MM_dd(this.date),
      invites: this.guests
    }
  }
}

export class TripExpenseToCreate extends ExpenseToCreate {

  constructor(
    amount: number,
    date: Date,
    commentary: string,
    private readonly distance: Distance
  ) {
    super(amount, date, commentary);
  }

  public override toDto(): any {
    return {
      nature: "trip",
      amount: this.amount,
      comment: this.commentary,
      purchasedOn: apply_yyyy_MM_dd(this.date),
      distance: this.distance
    }
  }
}


