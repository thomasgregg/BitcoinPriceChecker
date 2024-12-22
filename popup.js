const priceContainer = document.getElementById('price-container');
const refreshButton = document.getElementById('refresh');

async function fetchBitcoinPrice() {
  try {
    // Fetch the Bitcoin price
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();

    // Parse and round the price
    const price = Math.round(parseFloat(data.bpi.USD.rate.replace(',', '')));

    // Update the price text in the price container
    priceContainer.textContent = `1 BTC = $${price.toLocaleString()}`;

    // Indicate success via button text and color
    refreshButton.textContent = 'Updated!';
    refreshButton.style.backgroundColor = '#28a745'; // Green for success
    setTimeout(() => {
      refreshButton.textContent = 'Refresh Price';
      refreshButton.style.backgroundColor = '#F7931A'; // Reset to Bitcoin orange
    }, 2000);
  } catch (error) {
    // Handle errors
    priceContainer.textContent = 'Error fetching price.';

    // Indicate failure via button text and color
    refreshButton.textContent = 'Error!';
    refreshButton.style.backgroundColor = '#dc3545'; // Red for error
    setTimeout(() => {
      refreshButton.textContent = 'Refresh Price';
      refreshButton.style.backgroundColor = '#F7931A'; // Reset to Bitcoin orange
    }, 2000);
  }
}

// Fetch the price when the popup opens
fetchBitcoinPrice();

// Refresh the price when the button is clicked
refreshButton.addEventListener('click', fetchBitcoinPrice);
