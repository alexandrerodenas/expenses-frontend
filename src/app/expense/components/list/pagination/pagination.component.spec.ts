import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {By} from "@angular/platform-browser";
import {ChangeDetectionStrategy} from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const subjectInActivatedRouteForPage = new BehaviorSubject(
    {
      has: () => true,
      get() {
        return
      }
    }
  );
  const mockedActivatedRoute = {
    queryParamMap: subjectInActivatedRouteForPage
  }
  const mockedConfiguration = {
    pagination: {
      limit: 2
    }
  };

  let spyOnPaginationChange: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      providers:[
        {
          provide: 'configuration', useValue: mockedConfiguration
        },
        {
          provide: ActivatedRoute, useValue: mockedActivatedRoute
        }
      ]
    })
      .overrideComponent(PaginationComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    spyOnPaginationChange = jest.spyOn(component.onPaginationChange, "emit");
    fixture.detectChanges();
  });

  test(`Given an observation on current page in url,
  when current page changes,
  then it updates current page in component accordingly.`, (done) => {
    const anExpectedNewPage = 3;
    subjectInActivatedRouteForPage.subscribe( _ => {
      expect(component.pagination.page).toEqual(anExpectedNewPage);
      done();
    });

    subjectInActivatedRouteForPage.next({
      has: () => true,
      get: () => anExpectedNewPage
    });
  });

  test(`Given pagination component with a count,
  when getting page indexes,
  then it returns expected indexes.`, () => {
    component.count = 10;

    const indexes = component.getPageIndexes();

    expect(indexes).toEqual([1,2,3,4,5]);
  });

  test(`Given pagination component with active page being 3,
  when checking view,
  then then page number three is active.`, () => {
    initiatePaginationAndChooseCurrentPage(
      {
        numberOfPages: 10,
        currentPage: 3
      }
    );
    fixture.detectChanges();

    const pageThreeLinkButton: HTMLLinkElement = fixture
      .debugElement
      .query(By.css("#page_3"))
      .nativeElement;

    expect(pageThreeLinkButton.classList).toContain('active');
  });

  test(`Given pagination component with active page,
  when changing active page to another page,
  then then active page is changed.`, () => {
    initiatePaginationAndChooseCurrentPage(
      {
        numberOfPages: 10,
        currentPage: 3
      }
    );

    component.changeToPage(5);
    fixture.detectChanges();

    const pageFiveLinkButton: HTMLLinkElement = fixture
      .debugElement
      .query(By.css("#page_5"))
      .nativeElement;
    fixture.detectChanges();
    expect(pageFiveLinkButton.classList).toContain('active');
  });

  test(`Given current page equals to total number of pages,
  when checking if user can navigate to next page,
  then it returns false.`, () => {
    initiatePaginationAndChooseCurrentPage(
      {
        numberOfPages: 10,
        currentPage: 10
      }
    );

    const nextPageLink: HTMLButtonElement = fixture
      .debugElement
      .query(By.css("#next-page"))
      .nativeElement;
    expect(nextPageLink.disabled).toBeTruthy();
  });

  test(`Given current page equals to 1,
  when checking if user can navigate to previous page,
  then it returns false.`, () => {
    initiatePaginationAndChooseCurrentPage(
      {
        numberOfPages: 10,
        currentPage: 1
      }
    );

    const previousPageLink: HTMLButtonElement = fixture
      .debugElement
      .query(By.css("#previous-page"))
      .nativeElement;
    expect(previousPageLink.disabled).toBeTruthy();
  });

  test(`Given current page equals to 1,
  when clicking on next page,
  then current page is increased by one.`, () => {
    initiatePaginationAndChooseCurrentPage(
      {
        numberOfPages: 10,
        currentPage: 1
      }
    );

    const nextPageLink: HTMLButtonElement = fixture
      .debugElement
      .query(By.css("#next-page"))
      .nativeElement;
    nextPageLink.click();
    fixture.detectChanges();

    expect(component.pagination.page).toEqual(2);
    expect(spyOnPaginationChange).toHaveBeenCalled();
  });

  test(`Given current page equals to 2,
  when clicking on previous page,
  then current page is decreased by one.`, () => {
    initiatePaginationAndChooseCurrentPage(
      {
        numberOfPages: 10,
        currentPage: 2
      }
    );

    const previousPageLink: HTMLButtonElement = fixture
      .debugElement
      .query(By.css("#previous-page"))
      .nativeElement;
    previousPageLink.click();
    fixture.detectChanges();

    expect(component.pagination.page).toEqual(1);
    expect(spyOnPaginationChange).toHaveBeenCalled();
  });

  function initiatePaginationAndChooseCurrentPage(
    {
      numberOfPages=0,
      currentPage=0
    }
  ): void {
    component.count = numberOfPages;
    component.pagination = {
      page: currentPage,
      limit: 1
    }
    mockedConfiguration.pagination.limit = 1;
    fixture.detectChanges();
  }
});
