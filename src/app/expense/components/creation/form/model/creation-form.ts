import { ExpenseType } from "../../../../domain/expense";

export interface CreationForm {
  amount: number,
  type: ExpenseType,
  creationDate: string,
  commentary: string,
  distance: number,
  guests: number
}
