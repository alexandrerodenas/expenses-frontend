import {ExpenseRepository} from "./expense.repository";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {ExpenseMapper} from "./dtos/expense.mapper";
import {RestaurantExpenseToCreate} from "./dtos/expense-to-create";
import {TripExpenseToUpdate} from "./dtos/expense-to-update";

jest.mock("@angular/common/http");
describe("Expense repository", () => {
  const anId = 1;
  const anAmount = 55;
  const aDate = new Date();
  const aCommentary = "a commentary";
  const aDistance = 1000;
  const aNumberOfGuests = 5;

  const mockedConfiguration = {
    api: "anApi"
  }

  const aTripExpenseAsDto = {
    "id": 50,
    "nature": "trip",
    "amount": 965,
    "comment": "Enim maioren.",
    "purchasedOn": "2022-05-12",
    "updatedAt": "2022-11-16T00:09:12.057Z",
    "distance": 988
  };

  const aRestaurantExpenseAsDto = {
    "id": 42,
    "nature": "restaurant",
    "amount": 846,
    "comment": "Excepturi blanditiis at est sapiente tenetur ipsum sunt voluptate, vp.",
    "purchasedOn": "2022-08-08",
    "updatedAt": "2022-10-21T06:25:59.492Z",
    "invites": 2
  }

  const mockedHttpClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<HttpClient>;

  let expenseRepository: ExpenseRepository;

  beforeEach(() => {
    expenseRepository = new ExpenseRepository(
      mockedConfiguration,
      mockedHttpClient
    );
  });

  test(`Given a list of expenses to retrieve,
  when retrieving the two first hits,
  then it returns expected hits.`, (done) => {
    mockedHttpClient.get.mockReturnValue(
      of({
        "items": [
          aTripExpenseAsDto,
          aRestaurantExpenseAsDto
        ],
        "count": 34
      })
    );
    const limit = 2;
    const page = 0;

    expenseRepository.listFor(
      page,
      limit
    ).subscribe(expenses => {
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        mockedConfiguration.api + "/expenses?page=0&limit=2"
      );
      expect(expenses.items).toEqual(
        [
          aTripExpenseAsDto,
          aRestaurantExpenseAsDto
        ].map(ExpenseMapper.fromDto)
      );
      expect(expenses.count).toEqual(34);
      done();
    });
  });

  test(`Given a list of expenses to retrieve,
  when retrieving one by id,
  then it returns expected expense.`, (done) => {
    const anId = 50;
    const anExpenseDto = {
      "id": anId,
      "nature": "trip",
      "amount": 965,
      "comment": "Enim maioren.",
      "purchasedOn": "2022-05-12",
      "updatedAt": "2022-11-16",
      "distance": 988
    };
    mockedHttpClient.get.mockReturnValue(
      of(anExpenseDto)
    );

    expenseRepository.get(
      anId
    ).subscribe(expense => {
      expect(mockedHttpClient.get).toHaveBeenCalledWith(
        `${mockedConfiguration.api}/expenses/${anId}`
      );
      expect(expense).toEqual(
        ExpenseMapper.fromDto(anExpenseDto)
      );
      done();
    });
  });

  test(`Given a restaurant expense to create,
    when creating it,
    then it creates expected expense.`, (done) => {
    const aRestaurantExpenseToCreate = new RestaurantExpenseToCreate(
      anAmount,
      aDate,
      aCommentary,
      aNumberOfGuests
    );
    mockedHttpClient.post.mockReturnValue(
      of(null)
    );

    expenseRepository.create(aRestaurantExpenseToCreate).subscribe(
      createdExpense => {
        expect(mockedHttpClient.post).toHaveBeenCalledWith(
          `${mockedConfiguration.api}/expenses`,
          aRestaurantExpenseToCreate.toDto()
        );
        done();
      }
    )
  });


  test(`Given a restaurant expense to update,
    when updating it,
    then it updates expected expense.`, (done) => {
    const aTripExpenseToUpdate = new TripExpenseToUpdate(
      anId,
      anAmount,
      aDate,
      aCommentary,
      aDistance
    );
    const responseDto = {
      "amount": anAmount,
      "commentary": aCommentary,
      "purchasedOn": aDate,
      "distance": aDistance,
      "id": anId,
      "nature": "trip",
      "updatedAt": new Date()
    }
    mockedHttpClient.put.mockReturnValue(
      of(responseDto)
    );

    expenseRepository.update(aTripExpenseToUpdate).subscribe(
      updatedExpense => {
        expect(mockedHttpClient.put).toHaveBeenCalledWith(
          `${mockedConfiguration.api}/expenses/${anId}`,
          aTripExpenseToUpdate.toDto()
        );
        expect(updatedExpense).toEqual(ExpenseMapper.fromDto(responseDto));
        done();
      }
    )
  });

});
