import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
selector: 'app-evacuation-center',
standalone: true,
imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
templateUrl: './evacuation-center.html',
styleUrl: './evacuation-center.css',
})
export class EvacuationCenter  {
title = signal('Evacuation');

centerName = signal('');
capacity = signal<number | null>(null);
barangay = signal('');
currentPopulation = signal<number | null>(null);
status = signal('');

editingId = signal<string | null>(null);

centers: any[] = [];

constructor(private firestore: Firestore) {
const evacuation_centers = collection(this.firestore, 'evacuation_centers');
collectionData(evacuation_centers, { idField: 'id' })
.subscribe(data => {
this.centers = data; 
});
}

resetForm() {
    this.centerName.set('');
    this.capacity.set(null);
    this.barangay.set('');
    this.currentPopulation.set(null);
    this.status.set('');
    this.editingId.set(null);
}

addCenter() {
const name = this.centerName();
const capacity = this.capacity();
const barangay = this.barangay();
const population = this.currentPopulation();
const status = this.status();
const id = this.editingId();

if (name && capacity) {
const evacuation_centers = collection(this.firestore, 'evacuation_centers');
if (id) {
    this.editCenter(id, name, capacity, barangay, population, status);
} else {
    addDoc(evacuation_centers, { name, capacity, barangay, population, status});
    this.resetForm();
}
}
}

startEditCenter(id: string, name: string, capacity: number | null, barangay: string, population: number | null, status: string) {
    this.centerName.set(name);
    this.capacity.set(capacity);
    this.barangay.set(barangay);
    this.currentPopulation.set(population);
    this.status.set(status);
    this.editingId.set(id);
}

deleteCenter(id: string) {
const centerDoc = doc(this.firestore, `evacuation_centers/${id}`);
deleteDoc(centerDoc);
if (this.editingId() === id) {
    this.resetForm();
}
}

editCenter(id: string, newName: string, newCapacity: number | null, newBarangay: string, newPopulation: number | null, newStatus: string) {
const centerDoc = doc(this.firestore, `evacuation_centers/${id}`);
updateDoc(centerDoc, { name: newName, capacity: newCapacity, barangay: newBarangay, population: newPopulation, status: newStatus});
this.resetForm();
}
}