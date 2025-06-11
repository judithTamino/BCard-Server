const isValidAddress = (address) => {
  const {country, city, street, houseNumber, zip} = address;
  return country && city && street && houseNumber !== undefined && zip !== undefined;
};

export default isValidAddress;