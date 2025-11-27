import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-emergency-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './incident-report.html',
  styleUrls: ['./incident-report.css'], // fixed typo
})
export class IncidentReport {
  title = signal('Incident Report');

  date = signal('');
  location = signal('');
  incidentType = signal('');
  damageLevel = signal('');
  remarks = signal('');

  editingId = signal<string | null>(null);

  incidents: any[] = [];

  constructor(private firestore: Firestore) {
    const incidentCollection = collection(this.firestore, 'incident_reports');
    collectionData(incidentCollection, { idField: 'id' })
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

  addReport() {
    const date = this.date();
    const location = this.location();
    const incidentType = this.incidentType();
    const damageLevel = this.damageLevel();
    const remarks = this.remarks();
    const id = this.editingId();

    if (date && location) {
      const incidentCollection = collection(this.firestore, 'incident_reports');
      if (id) {
        this.editReport(id, date, location, incidentType, damageLevel, remarks);
      } else {
        addDoc(incidentCollection, { date, location, incidentType, damageLevel, remarks });
        this.resetForm();
      }
    }
  }

  startEditReport(id: string, date: string, location: string, incidentType: string, damageLevel: string, remarks: string) {
    this.date.set(date);
    this.location.set(location);
    this.incidentType.set(incidentType);
    this.damageLevel.set(damageLevel);
    this.remarks.set(remarks);
    this.editingId.set(id);
  }

  deleteReport(id: string) {
    const reportDoc = doc(this.firestore, `incident_reports/${id}`);
    deleteDoc(reportDoc);
    if (this.editingId() === id) {
      this.resetForm();
    }
  }

  editReport(id: string, newDate: string, newLocation: string, newIncidentType: string, newDamageLevel: string, newRemarks: string) {
    const reportDoc = doc(this.firestore, `incident_reports/${id}`);
    updateDoc(reportDoc, { date: newDate, location: newLocation, incidentType: newIncidentType, damageLevel: newDamageLevel, remarks: newRemarks });
    this.resetForm();
  }
}
