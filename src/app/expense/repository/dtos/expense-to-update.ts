import {Distance, ExpenseId} from "../../domain/expense";
import {apply_yyyy_MM_dd} from "../../../utils/date-formatter";
import { EditionForm } from "../../components/edition/form/model/edition-form";

export abstract class ExpenseToUpdate {
  protected constructor(
    protected readonly id: ExpenseId,
    protected readonly amount: number,
    protected readonly date: Date,
    protected readonly commentary: string
  ) {
  }

  public getId(): ExpenseId {
    return this.id;
  }

  public abstract toDto(): any;
}

export class RestaurantExpenseToUpdate extends ExpenseToUpdate {

  constructor(
    id: ExpenseId,
    amount: number,
    date: Date,
    commentary: string,
    private readonly guests: number
  ) {
    super(id, amount, date, commentary);
  }
  public override toDto(): any {
    return {
      id: this.id,
      nature: "restaurant",
      amount: this.amount,
      comment: this.commentary,
      purchasedOn: apply_yyyy_MM_dd(this.date),
      invites: this.guests
    }
  }
}

export class TripExpenseToUpdate extends ExpenseToUpdate {

  constructor(
    id: ExpenseId,
    amount: number,
    date: Date,
    commentary: string,
    private readonly distance: Distance
  ) {
    super(id, amount, date, commentary);
  }

  public override toDto(): any {
    return {
      id: this.id,
      nature: "trip",
      amount: this.amount,
      comment: this.commentary,
      purchasedOn: apply_yyyy_MM_dd(this.date),
      distance: this.distance
    }
  }
}


