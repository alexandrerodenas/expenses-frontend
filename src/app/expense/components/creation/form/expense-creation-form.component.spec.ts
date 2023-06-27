import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { apply_yyyy_MM_dd } from "../../../../utils/date-formatter";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { By } from "@angular/platform-browser";
import { ExpenseCreationFormComponent } from "./expense-creation-form.component";
import { ExpenseType } from "../../../domain/expense";

describe('ExpenseCreateFormComponent', () => {
  const aCreationDate = new Date();
  const anAmount = 100;
  const aCommentary = "this is a commentary.";
  const aDistance = 1000;
  const aNumberOfGuests = 12;

  test(`Given expense creation form component just initiated,
    when checking form,
    then it returns form with default values.`,() => {
    const today = apply_yyyy_MM_dd(new Date());
    const component = createComponent();
    expect(
      component.creationForm.getRawValue()
    ).toEqual(
      {
        amount: 0,
        creationDate: today,
        commentary: "Here comes your comment",
        distance: 0,
        guests: 0,
        type: null
      }
    );
  });

  test(`Given form having no amount,
    when checking form validity,
    then it returns false.`,() => {
    const component = createComponentWithValidCreationForm();
    const creationForm = component.creationForm;

    creationForm.patchValue({amount: null});

    expect(creationForm.valid).toBeFalsy();
  });

  test(`Given form having negative amount,
    when checking form validity,
    then it returns false.`,() => {
    const component = createComponentWithValidCreationForm();
    const creationForm = component.creationForm;

    creationForm.patchValue({amount: -1});

    expect(creationForm.valid).toBeFalsy();
  });

  test(`Given form having no creation date,
    when checking form validity,
    then it returns false.`,() => {
    const component = createComponentWithValidCreationForm();
    const creationForm = component.creationForm;

    creationForm.patchValue({creationDate: null});

    expect(creationForm.valid).toBeFalsy();
  });

  test(`Given form having no commentary,
    when checking form validity,
    then it returns false.`,() => {
    const component = createComponentWithValidCreationForm();
    const creationForm = component.creationForm;

    creationForm.patchValue({commentary: null});

    expect(creationForm.valid).toBeFalsy();
  });

  test(`Given form having no type,
    when checking form validity,
    then it returns false.`,() => {
    const component = createComponentWithValidCreationForm();
    const creationForm = component.creationForm;

    creationForm.patchValue({type: null});

    expect(creationForm.valid).toBeFalsy();
  });

  describe("Trip expense edition form", () => {

    test(`Given a trip expense to edit,
    when initiating component
    and checking view,
    then form field for distance is shown,
    and form field for guests number is hidden`, async () => {
      const fixture = await createComponentFixtureWithValidFormOf("trip");

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
      const component = createComponentWithValidCreationForm();
      const creationForm = component.creationForm;

      creationForm.patchValue({distance: -1});

      expect(creationForm.valid).toBeFalsy();
    });

    test(`Given form having no distance,
    when checking form validity,
    then it returns false.`,() => {
      const component = createComponentWithValidCreationForm();
      const creationForm = component.creationForm;

      creationForm.patchValue({distance: null});

      expect(creationForm.valid).toBeFalsy();
    });
  });

  describe("Restaurant expense", () => {

    test(`Given a restaurant expense to edit,
    when initiating component
    and checking view,
    then form field for guests is shown,
    and form field for distance number is hidden`, async () => {
      const fixture = await createComponentFixtureWithValidFormOf("restaurant");

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
      const component = createComponentWithValidCreationForm();
      const creationForm = component.creationForm;

      creationForm.patchValue({guests: -1});

      expect(creationForm.valid).toBeFalsy();
    });

    test(`Given form having no number of guests,
    when checking form validity,
    then it returns false.`,() => {
      const component = createComponentWithValidCreationForm();
      const creationForm = component.creationForm;

      creationForm.patchValue({guests: null});

      expect(creationForm.valid).toBeFalsy();
    });

  });

  test(`Given a valid form for an expense to edit,
  when submitting it,
  then it emits this forms`, () => {
    const component = createComponentWithValidCreationForm();
    const spyOnEditionFormSubmission = jest.spyOn(component.onFormSubmission, "emit");

    component.submitForm();

    expect(spyOnEditionFormSubmission).toHaveBeenCalledWith(
      component.creationForm.getRawValue()
    );
  });

  test(`Given an invalid form for an expense to edit,
  when checking submit button,
  then it is disabled`, async () => {
    const fixture = await createComponentFixtureWithValidFormOf("trip");
    const creationForm = fixture.componentInstance.creationForm;

    creationForm.patchValue({distance: -1});
    fixture.detectChanges();

    const submitButton : HTMLButtonElement = fixture
      .debugElement
      .query(By.css("button[type='submit']"))
      .nativeElement;

    expect(submitButton.disabled).toBeTruthy();
  });


  function createComponentWithValidCreationForm(): ExpenseCreationFormComponent {
    const component = new ExpenseCreationFormComponent(
      new FormBuilder()
    );

    component.ngOnInit();

    component.creationForm.patchValue({
      amount: null,
      creationDate: aCreationDate,
      commentary: aCommentary,
      distance: aDistance,
      guests: aNumberOfGuests,
      type: "trip"
    });

    return component;
  }


  async function createComponentFixtureWithValidFormOf(type: ExpenseType)
    : Promise<ComponentFixture<ExpenseCreationFormComponent>> {
    let fixture: ComponentFixture<ExpenseCreationFormComponent>;
    await TestBed.configureTestingModule({
      declarations: [
        ExpenseCreationFormComponent
      ],
      imports: [
        FontAwesomeModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseCreationFormComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.creationForm.patchValue({
      amount: anAmount,
      creationDate: aCreationDate,
      commentary: aCommentary,
      distance: aDistance,
      guests: aNumberOfGuests,
      type: type
    });
    fixture.detectChanges();
    return fixture;
  }



});

function createComponent(): ExpenseCreationFormComponent {
  const component = new ExpenseCreationFormComponent(
    new FormBuilder()
  );

  component.ngOnInit();

  return component;
}


