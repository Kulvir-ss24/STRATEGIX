import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabfileComponent } from './view-labfile.component';

describe('ViewLabfileComponent', () => {
  let component: ViewLabfileComponent;
  let fixture: ComponentFixture<ViewLabfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLabfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLabfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
