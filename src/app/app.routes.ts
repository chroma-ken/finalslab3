// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { EvacuationCenter } from './evacuation-center/evacuation-center'
import { IncidentReport } from './incident-report/incident-report'
import { ReliefDistribution } from './relief-distribution/relief-distribution'

export const routes: Routes = [
    // FIX: Change 'IncidentReport' to 'incident-report' to match the case of the path definition below.
    {path: '', redirectTo: 'incident-report', pathMatch: 'full'}, 
    {path: 'incident-report', component: IncidentReport},
    {path: 'evacuation-center', component: EvacuationCenter},
    {path: 'relief-distribution', component: ReliefDistribution},

];