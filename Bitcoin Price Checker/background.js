async function fetchAndUpdateBadge() {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
      const data = await response.json();
      let price = parseFloat(data.bpi.USD.rate.replace(',', ''));
  
      // Format the badge text with the $ sign
      let badgeText;
      if (price >= 1000 && price < 1000000) {
        badgeText = `$${(price / 1000).toFixed(0)}K`; // e.g., "$30K"
      } else if (price >= 1000000) {
        badgeText = `$${(price / 1000000).toFixed(1)}M`; // e.g., "$1.2M"
      } else {
        badgeText = `$${price.toFixed(0)}`; // e.g., "$500"
      }
  
      // Update the badge text
      chrome.action.setBadgeText({ text: badgeText });
      chrome.action.setBadgeBackgroundColor({ color: '#FF9900' });
    } catch (error) {
      chrome.action.setBadgeText({ text: 'ERR' });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    }
  }
  
  // Update the badge every 5 minutes
  setInterval(fetchAndUpdateBadge, 5 * 60 * 1000);
  
  // Initial fetch
  fetchAndUpdateBadge();
  