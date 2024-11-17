import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizQuesComponent } from './add-quiz-ques.component';

describe('AddQuizQuesComponent', () => {
  let component: AddQuizQuesComponent;
  let fixture: ComponentFixture<AddQuizQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizQuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuizQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
