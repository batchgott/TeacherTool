import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRandomizerComponent } from './student-randomizer.component';

describe('StudentRandomizerComponent', () => {
  let component: StudentRandomizerComponent;
  let fixture: ComponentFixture<StudentRandomizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRandomizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRandomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
