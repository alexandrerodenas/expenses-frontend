import { ExpenseEditionFormComponent } from './expense-edition-form.component';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Expense, RestaurantExpense, TripExpense } from "../../../domain/expense";
import { apply_yyyy_MM_dd } from "../../../../utils/date-formatter";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { By } from "@angular/platform-browser";

describe('ExpenseEditionFormComponent', () => {
  const anId = 1;
  const aCreationDate = new Date();
  const aLastUpdateDate = new Date();
  const anAmount = 100;
  const aCommentary = "this is a commentary.";
  const aDistance = 1000;
  const aNumberOfGuests = 12;

  const aTripExpense = new TripExpense(
    anId,
    anAmount,
    aCreationDate,
    aLastUpdateDate,
    aCommentary,
    aDistance
  );

  const aRestaurantExpense = new RestaurantExpense(
    anId,
    anAmount,
    aCreationDate,
    aLastUpdateDate,
    aCommentary,
    aNumberOfGuests
  );


  test(`Given form having no amount,
    when checking form validity,
    then it returns false.`,() => {
    const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
      .editionForm;

    formForEdition.patchValue({amount: null});

    expect(formForEdition.valid).toBeFalsy();
  });

  test(`Given form having negative amount,
    when checking form validity,
    then it returns false.`,() => {
    const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
      .editionForm;

    formForEdition.patchValue({amount: -1});

    expect(formForEdition.valid).toBeFalsy();
  });

  test(`Given form having no creation date,
    when checking form validity,
    then it returns false.`,() => {
    const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
      .editionForm;

    formForEdition.patchValue({creationDate: null});

    expect(formForEdition.valid).toBeFalsy();
  });

  test(`Given form having no commentary,
    when checking form validity,
    then it returns false.`,() => {
    const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
      .editionForm;

    formForEdition.patchValue({commentary: null});

    expect(formForEdition.valid).toBeFalsy();
  });

  test(`Given form having no type,
    when checking form validity,
    then it returns false.`,() => {
    const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
      .editionForm;

    formForEdition.patchValue({type: null});

    expect(formForEdition.valid).toBeFalsy();
  });

  describe("Trip expense edition form", () => {
    test(`Given a trip expense to edit,
      when initiating component,
      then a form has been created with expected fields.`, () => {
      const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
        .editionForm;

      expect(formForEdition.getRawValue()).toEqual(
        {
          id: aTripExpense.getId(),
          amount: aTripExpense.getAmount(),
          type: aTripExpense.getType(),
          creationDate: apply_yyyy_MM_dd(aTripExpense.getCreationDate()),
          commentary: aTripExpense.getCommentary(),
          distance: aTripExpense.getDistance(),
          guests: 0
        }
      );
    });

    test(`Given a trip expense to edit,
    when initiating component
    and checking view,
    then form field for distance is shown,
    and form field for guests number is hidden`, async () => {
      const fixture = await createComponentFixtureUsing(aTripExpense);
      const component = fixture.componentInstance;

      component.ngOnInit();

      const distanceFormField = fixture
        .debugElement
        .query(By.css("input[formControlName='distance']"));
      const guestsFormField = fixture
        .debugElement
        .query(By.css("input[formControlName='guests']"));

      expect(distanceFormField).toBeDefined();
      expect(guestsFormField).toBeNull();
    });

    test(`Given form having a negative distance,
    when checking form validity,
    then it returns false.`,() => {
      const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
        .editionForm;

      formForEdition.patchValue({distance: -1});

      expect(formForEdition.valid).toBeFalsy();
    });

    test(`Given form having no distance,
    when checking form validity,
    then it returns false.`,() => {
      const formForEdition = createComponentWithExpenseToEdit(aTripExpense)
        .editionForm;

      formForEdition.patchValue({distance: null});

      expect(formForEdition.valid).toBeFalsy();
    });
  });

  describe("Restaurant expense", () => {
    test(`Given a restaurant expense in input,
      when initiating component,
      then a form has been created with expected fields.`, () => {
      const formForEdition = createComponentWithExpenseToEdit(aRestaurantExpense)
        .editionForm;

      expect(formForEdition.getRawValue()).toEqual(
        {
          id: aRestaurantExpense.getId(),
          amount: aRestaurantExpense.getAmount(),
          type: aRestaurantExpense.getType(),
          creationDate: apply_yyyy_MM_dd(aTripExpense.getCreationDate()),
          commentary: aRestaurantExpense.getCommentary(),
          guests: aRestaurantExpense.getNumberOfGuests(),
          distance: 0
        }
      );
    });

    test(`Given a restaurant expense to edit,
    when initiating component
    and checking view,
    then form field for guests is shown,
    and form field for distance number is hidden`, async () => {
      const fixture = await createComponentFixtureUsing(aRestaurantExpense);
      const component = fixture.componentInstance;

      component.ngOnInit();

      const distanceFormField = fixture
        .debugElement
        .query(By.css("input[formControlName='distance']"));
      const guestsFormField = fixture
        .debugElement
        .query(By.css("input[formControlName='guests']"));

      expect(distanceFormField).toBeNull();
      expect(guestsFormField).toBeDefined();
    });


    test(`Given form having a negative number of guests,
    when checking form validity,
    then it returns false.`,() => {
      const formForEdition = createComponentWithExpenseToEdit(aRestaurantExpense)
        .editionForm;

      formForEdition.patchValue({guests: -1});

      expect(formForEdition.valid).toBeFalsy();
    });

    test(`Given form having no number of guests,
    when checking form validity,
    then it returns false.`,() => {
      const formForEdition = createComponentWithExpenseToEdit(aRestaurantExpense)
        .editionForm;

      formForEdition.patchValue({guests: null});

      expect(formForEdition.valid).toBeFalsy();
    });

  });

  test(`Given a valid form for an expense to edit,
  when submitting it,
  then it emits this forms`, () => {
    const component = createComponentWithExpenseToEdit(aRestaurantExpense);
    const spyOnEditionFormSubmission = jest.spyOn(component.onFormSubmission, "emit");

    component.submitForm();

    expect(spyOnEditionFormSubmission).toHaveBeenCalledWith(
      component.editionForm.getRawValue()
    );
  });

  test(`Given an invalid form for an expense to edit,
  when checking submit button,
  then it is disabled`, async () => {
    const fixture = await createComponentFixtureUsing(aRestaurantExpense);
    fixture.componentInstance.editionForm.patchValue({guests: -1});
    fixture.detectChanges();

    const submitButton : HTMLButtonElement = fixture
      .debugElement
      .query(By.css("button[type='submit']"))
      .nativeElement;

    expect(submitButton.disabled).toBeTruthy();
  });

});

function createComponentWithExpenseToEdit(expense: Expense): ExpenseEditionFormComponent {
  const component = new ExpenseEditionFormComponent(
    new FormBuilder()
  );
  component.expenseToEdit = expense;

  component.ngOnInit();

  return component;
}


async function createComponentFixtureUsing(expense: Expense)
  : Promise<ComponentFixture<ExpenseEditionFormComponent>> {
  let fixture: ComponentFixture<ExpenseEditionFormComponent>;
  await TestBed.configureTestingModule({
    declarations: [
      ExpenseEditionFormComponent
    ],
    imports: [
      FontAwesomeModule,
      ReactiveFormsModule
    ]
  })
    .compileComponents();

  fixture = TestBed.createComponent(ExpenseEditionFormComponent);
  fixture.componentInstance.expenseToEdit = expense;
  fixture.detectChanges();
  return fixture;
}
