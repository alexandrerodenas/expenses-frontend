import {Inject, Injectable} from "@angular/core";
import {Expense} from "../domain/expense";
import {HttpClient} from "@angular/common/http";
import * as config from "../../config";
import {map, Observable} from "rxjs";
import {ListResult} from "./dtos/list-result";
import {ExpenseMapper} from "./dtos/expense.mapper";
import {ExpenseToCreate} from "./dtos/expense-to-create";
import {ExpenseToUpdate} from "./dtos/expense-to-update";

@Injectable()
export class ExpenseRepository {

  constructor(
    @Inject('configuration') private configuration: { api: string },
    private readonly httpClient: HttpClient
  ) {
  }

  public listFor(page: number, limit: number): Observable<ListResult<Expense>> {
    return this.httpClient
      .get<ReadonlyArray<Expense>>(`${this.configuration.api}/expenses?page=${page}&limit=${limit}`)
      .pipe(
        map((response: any) => {
          return {
            items: response.items.map(ExpenseMapper.fromDto),
            count: response.count
          }
        })

      );
  }

  public get(expenseId: number): Observable<Expense> {
    return this.httpClient
      .get<Expense>(`${this.configuration.api}/expenses/${expenseId}`)
      .pipe(
        map(response => ExpenseMapper.fromDto(response))
      );
  }

  public create(expenseToCreate: ExpenseToCreate) : Observable<void> {
    return this.httpClient
      .post<void>(`${this.configuration.api}/expenses`, expenseToCreate.toDto());
  }

  public update(expenseToUpdate: ExpenseToUpdate): Observable<Expense> {
    return this.httpClient
      .put<Expense>(`${this.configuration.api}/expenses/${expenseToUpdate.getId()}`, expenseToUpdate.toDto())
      .pipe(
        map(response => ExpenseMapper.fromDto(response))
      );
  }
}
