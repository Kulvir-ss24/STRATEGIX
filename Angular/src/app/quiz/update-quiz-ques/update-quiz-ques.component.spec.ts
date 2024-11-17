import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizQuesComponent } from './update-quiz-ques.component';

describe('UpdateQuizQuesComponent', () => {
  let component: UpdateQuizQuesComponent;
  let fixture: ComponentFixture<UpdateQuizQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuizQuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuizQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
