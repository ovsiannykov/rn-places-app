if (coords) {
  const { latitude, longitude } = coords;
  let response = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  for (let item of response) {
    let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

    setUserLocation(address);
  }
}
