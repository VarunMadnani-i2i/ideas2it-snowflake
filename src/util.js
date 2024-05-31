import { pricing } from './constants';

export function getStorageCost(providerKey, storageType, geoLocationKey) {
  const location = pricing.Providers[providerKey].geoLocations[geoLocationKey];

  console.log('location',location)

  if (location) {
    if (storageType === 'onDemand') {
      return location.onDemand;
    } else if (storageType === 'prePurchase' || storageType === 'capacity') {
      return location.capacity || location.prePurchase;
    }
  }
  return 'Invalid input or pricing information not available.';
}

export function getPriceByCategory(providerKey, category, geoLocationKey) {
  const location = pricing.Providers[providerKey].geoLocations[geoLocationKey];

  console.log(location, category);

  if (location) {
    if (
      category === 'Standard' ||
      category === 'Enterprise' ||
      category === 'BusinessCritical'
    ) {
      return location[category];
    }
  }
  return 'Invalid input or pricing information not available.';
}

export function getCreditHrs(storageSize) {
  console.log('getCreditHrs',pricing.Credits[storageSize]);
  if (pricing.Credits && pricing.Credits[storageSize] !== undefined) {
    return pricing.Credits[storageSize];
  } else {
    return 'Error fetching credit hours information.';
  }
}
