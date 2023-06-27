import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateExpenseButtonComponent} from './create-expense-button.component';
import {By} from "@angular/platform-browser";

describe('CreateExpenseButtonComponent', () => {
  let component: CreateExpenseButtonComponent;
  let fixture: ComponentFixture<CreateExpenseButtonComponent>;

  let spyOnExpenseCreationButton: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateExpenseButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateExpenseButtonComponent);
    component = fixture.componentInstance;
    spyOnExpenseCreationButton = jest.spyOn(component.click, "emit");
    fixture.detectChanges();
  });

  test(`Given button to create a new expense,
  when clicking on it,
  then it emits expected event.`, () => {
    const button: HTMLButtonElement = fixture
      .debugElement
      .query(By.css('button'))
      .nativeElement;

    button.click();

    expect(spyOnExpenseCreationButton).toHaveBeenCalled();
  });
});
