import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const user = sessionStorage.getItem('user');
    if (user) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};

