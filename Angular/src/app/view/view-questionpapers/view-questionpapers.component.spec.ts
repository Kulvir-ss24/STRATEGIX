import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionpapersComponent } from './view-questionpapers.component';

describe('ViewQuestionpapersComponent', () => {
  let component: ViewQuestionpapersComponent;
  let fixture: ComponentFixture<ViewQuestionpapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionpapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuestionpapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
