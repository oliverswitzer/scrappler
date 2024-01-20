export const firestoreConverter: any = {
  toFirestore: (data: any) => data,
  fromFirestore: (snapshot: any) => convertTimestampsToDates(
    snapshot.data({
      serverTimestamps: 'estimate',
    }),
  ),
};

function convertTimestampsToDates(document: any) {
  const data = { ...document };
  for (const k of Object.keys(data)) {
    if (k in data) {
      const v = data[k];
      if (v && typeof v === 'object') {
        if ('toDate' in v && typeof v.toDate === 'function') {
          data[k] = v.toDate();
        } else if (!Array.isArray(v)) {
          data[k] = convertTimestampsToDates(v);
        }
      }
    }
  }

  return data;
}
