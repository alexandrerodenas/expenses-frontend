import { ExpenseId, ExpenseType } from "../../../../domain/expense";

export interface EditionForm {
  id: ExpenseId,
  amount: number,
  type: ExpenseType,
  creationDate: string,
  commentary: string,
  distance: number,
  guests: number
}
