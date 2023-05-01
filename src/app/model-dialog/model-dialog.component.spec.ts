import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDialogComponent } from './model-dialog.component';

describe('ModelDialogComponent', () => {
  let component: ModelDialogComponent;
  let fixture: ComponentFixture<ModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
