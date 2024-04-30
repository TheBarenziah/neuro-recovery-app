import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user$.pipe(
        filter((user) => user !== undefined),
        map((user) => {
            if (!user) {
                router.navigateByUrl('/login');
                return false;
            }
            return true;   
        })
    )
}