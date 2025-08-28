import { db } from './firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
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
