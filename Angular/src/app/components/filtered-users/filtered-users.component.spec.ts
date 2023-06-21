import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredUsersComponent } from './filtered-users.component';

describe('FilteredUsersComponent', () => {
  let component: FilteredUsersComponent;
  let fixture: ComponentFixture<FilteredUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredUsersComponent]
    });
    fixture = TestBed.createComponent(FilteredUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
