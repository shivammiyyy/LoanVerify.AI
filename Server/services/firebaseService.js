import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export async function saveSubmission(uid, phone, formData, prediction) {
  const doc = {
    userId: uid,
    phone,
    formData,
    prediction,
    timestamp: new Date().toISOString(),
  };
  await db.collection('submissions').add(doc);
}
