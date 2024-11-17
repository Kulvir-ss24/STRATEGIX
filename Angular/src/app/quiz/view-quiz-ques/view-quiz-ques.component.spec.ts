import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizQuesComponent } from './view-quiz-ques.component';

describe('ViewQuizQuesComponent', () => {
  let component: ViewQuizQuesComponent;
  let fixture: ComponentFixture<ViewQuizQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuizQuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
