import { ListingSource, Neighborhood } from './listing';

export const firestoreConverter: any = {
  toFirestore: (data: any) => {
    return data;
  },
  fromFirestore: (snapshot: any) => {
    const data = snapshot.data({
      serverTimestamps: 'estimate',
    });

    if (data.neighborhood) {
      const neighborhood = Neighborhood[data.neighborhood as keyof typeof Neighborhood];
      if (neighborhood) {
        data.neighborhood = neighborhood;
      }

      const listingSource = ListingSource[data.source as keyof typeof ListingSource];
      if (listingSource) data.source = listingSource;
    }

    return convertTimestampsToDates(data);
  },
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
