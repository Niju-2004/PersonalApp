import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Learning } from './learning';

describe('Learning', () => {
  let component: Learning;
  let fixture: ComponentFixture<Learning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Learning],
    }).compileComponents();

    fixture = TestBed.createComponent(Learning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
