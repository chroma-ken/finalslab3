import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';
import {  RouterOutlet } from '@angular/router';

@Component({
selector: 'app-relief-distribution',
standalone: true,
imports: [CommonModule, FormsModule,  RouterOutlet],
templateUrl: './relief-distribution.html',
styleUrl: './relief-distribution.css',
})
export class ReliefDistribution  {
title = signal('Relief Distribution');

date = signal('');
barangay = signal('');
numberOfFamilies = signal('');
reliefitems = signal('');
distributedBy = signal('');

editingId = signal<string | null>(null);

reliefs: any[] = [];

constructor(private firestore: Firestore) {
const relief_distribution = collection(this.firestore, 'relief_distribution');
collectionData(relief_distribution, { idField: 'id' })
.subscribe(data => {
this.reliefs = data; 
});
}

resetForm() {
    this.date.set('');
    this.barangay.set('');
    this.numberOfFamilies.set('');
    this.reliefitems.set('');
    this.distributedBy.set('');
    this.editingId.set(null);
}

addRelief() {
const date = this.date();
const barangay = this.barangay();
const numberOfFamilies = this.numberOfFamilies();
const reliefitems = this.reliefitems();
const distributedBy = this.distributedBy();
const id = this.editingId();

if (date && barangay ) {
const relief_distribution = collection(this.firestore, 'relief_distribution');
if (id) {
    this.editRelief(id, date, barangay, numberOfFamilies, reliefitems, distributedBy);
} else {
    addDoc(relief_distribution, { date, barangay, numberOfFamilies, reliefitems, distributedBy});
    this.resetForm();
}
}
}

startEditRelief(id: string, date: string, barangay: string, numberOfFamilies: string, reliefitems: string, distributedBy: string) {
    this.date.set(date);
    this.barangay.set(barangay);
    this.numberOfFamilies.set(numberOfFamilies);
    this.reliefitems.set(reliefitems);
    this.distributedBy.set(distributedBy);
    this.editingId.set(id);
}

deleteRelief(id: string) {
const reliefDoc = doc(this.firestore, `relief_distribution/${id}`);
deleteDoc(reliefDoc);
if (this.editingId() === id) {
    this.resetForm();
}
}

editRelief(id: string, newDate: string, newBarangay: string, newNumberOfFamilies: string, newReliefItems: string, newDistributedBye: string) {
const reliefDoc = doc(this.firestore, `relief_distribution/${id}`);
updateDoc(reliefDoc, { date: newDate, barangay: newBarangay, numberOfFamilies: newNumberOfFamilies, reliefitems: newReliefItems, distributedBy: newDistributedBye});
this.resetForm();
}
}