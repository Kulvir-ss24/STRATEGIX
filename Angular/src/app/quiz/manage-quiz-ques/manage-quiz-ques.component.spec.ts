import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuizQuesComponent } from './manage-quiz-ques.component';

describe('ManageQuizQuesComponent', () => {
  let component: ManageQuizQuesComponent;
  let fixture: ComponentFixture<ManageQuizQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQuizQuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageQuizQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
