import { ExpenseRepository } from "./expense.repository";

export class ExpenseRepositoryMock extends ExpenseRepository {

  constructor() {
    super(null, null);
  }

  public override listFor = jest.fn();
  public override get = jest.fn();
  public override create = jest.fn();
  public override update = jest.fn();

}
