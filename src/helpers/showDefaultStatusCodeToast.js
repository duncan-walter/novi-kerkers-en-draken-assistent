function showDefaultStatusCodeToast(statusCode, showToast, successMessage) {
  switch (statusCode) {
    case 200:
    case 201:
      showToast(successMessage, 'success');
      break;
    case 401:
      showToast('Onbekende reiziger, toegang geweigerd.', 'error');
      break;
    case 403:
      showToast('De wachters erkennen je rang niet als voldoende.', 'error');
      break;
    case 406:
      showToast('Als je dit ziet heeft Duncan zijn intelligence check gefaald.', 'error');
      break;
    case 500:
    default:
      showToast('Een mysterieuze storing blokkeert je pad.', 'error');
      break;
  }
}

export default showDefaultStatusCodeToast;