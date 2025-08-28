import { db } from './firebase';
import { collection, getDocs, onSnapshot, Timestamp, Unsubscribe } from 'firebase/firestore';
import type { PotholeReport } from './types';

// Converts a Firestore document with Timestamps to a PotholeReport object with Dates
function fromFirestore(doc: any): PotholeReport {
    const data = doc.data();
    return {
        id: doc.id,
        description: data.description,
        location: data.location,
        address: data.address,
        zone: data.zone,
        status: data.status,
        severity: data.severity,
        reportedAt: (data.reportedAt as Timestamp).toDate(),
        filledAt: data.filledAt ? (data.filledAt as Timestamp).toDate() : undefined,
        imageUrl: data.imageUrl,
        userId: data.userId,
        droneCoordinates: data.droneCoordinates,
    };
}

export async function getReports(): Promise<PotholeReport[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "potholeReports"));
        const reports = querySnapshot.docs.map(fromFirestore);
        return reports;
    } catch (error) {
        console.error("Error fetching reports from Firestore: ", error);
        return [];
    }
}

export function getReportsRealtime(callback: (reports: PotholeReport[]) => void): Unsubscribe {
    const reportsCollection = collection(db, "potholeReports");
    const unsubscribe = onSnapshot(reportsCollection, (querySnapshot) => {
        const reports = querySnapshot.docs.map(fromFirestore);
        callback(reports);
    }, (error) => {
        console.error("Error fetching real-time reports from Firestore: ", error);
        callback([]);
    });
    return unsubscribe;
}
