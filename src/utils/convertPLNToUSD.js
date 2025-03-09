export const convertPLNToUSD = (PLN) => {

  const PLNtoUSD = PLN / 3.5;

  // Checking imput value

  if (typeof PLN === 'string') {
    return NaN;
  }

  if (PLN === undefined) {
    return NaN;
  }

  if (typeof PLN !== 'number' && typeof PLN !== 'string') {
    return 'Error';
  }

  if (PLN < 0) {
    return '$0.00';
  }

  // end of checking imput value
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}