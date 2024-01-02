import { Routes } from '@angular/router';
import { RedirectGuard } from './redirect.guard';
import { TextToolsComponent } from './text-tools/text-tools.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectingComponent } from './redirecting/redirecting.component';

export const routes: Routes = [
    {path: '', redirectTo: '/main', pathMatch: 'full'},
    {path: 'main', component: TextToolsComponent},
    {path: 'source', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://github.com/Ascyt/text-tools'}},
    {path: 'src', redirectTo: '/source', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
