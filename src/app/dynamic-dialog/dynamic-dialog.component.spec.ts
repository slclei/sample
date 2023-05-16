import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dynamicDialogComponent } from './dynamic-dialog.component';

describe('dynamicDialogComponent', () => {
  let component: dynamicDialogComponent;
  let fixture: ComponentFixture<dynamicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ dynamicDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(dynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
