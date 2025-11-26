import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';
import { RouterOutlet  } from '@angular/router';

@Component({
  selector: 'app-incident-report',
standalone: true,
imports: [CommonModule, FormsModule, RouterOutlet],
templateUrl: './incident-report.html',
styleUrl: './incident-report.css',
})
export class IncidentReport  {
title = signal('Report');

date = signal('');
location = signal('');
incidentType = signal('');
damageLevel = signal('');
remarks = signal('');

editingId = signal<string | null>(null);

incidents: any[] = [];

constructor(private firestore: Firestore) {
const disaster_incidents = collection(this.firestore, 'disaster_incidents');
collectionData(disaster_incidents, { idField: 'id' })
.subscribe(data => {
this.incidents = data; 
});
}

resetForm() {
    this.date.set('');
    this.location.set('');
    this.incidentType.set('');
    this.damageLevel.set('');
    this.remarks.set('');
    this.editingId.set(null);
}

addIncident() {
const date = this.date();
const location = this.location();
const incidentType = this.incidentType();
const damageLevel = this.damageLevel();
const remarks = this.remarks();
const id = this.editingId();

if (date && location ) {
const disaster_incidents = collection(this.firestore, 'disaster_incidents');
if (id) {
    this.editIncident(id, date, location, incidentType, damageLevel, remarks);
} else {
    addDoc(disaster_incidents, { date, location, incidentType, damageLevel, remarks});
    this.resetForm();
}
}
}

startEditIncident(id: string, date: string, location: string, incidentType: string, damageLevel: string, remarks: string) {
    this.date.set(date);
    this.location.set(location);
    this.incidentType.set(incidentType);
    this.damageLevel.set(damageLevel);
    this.remarks.set(remarks);
    this.editingId.set(id);
}

deleteIncident(id: string) {
const incidentDoc = doc(this.firestore, `disaster_incidents/${id}`);
deleteDoc(incidentDoc);
if (this.editingId() === id) {
    this.resetForm();
}
}

editIncident(id: string, newDate: string, newLocation: string, newIncidentType: string, newDamageLevel: string, newRemarks: string) {
const incidentDoc = doc(this.firestore, `disaster_incidents/${id}`);
updateDoc(incidentDoc, { date: newDate, location: newLocation, incidentType: newIncidentType, damageLevel: newDamageLevel, remarks: newRemarks});
this.resetForm();
}
}