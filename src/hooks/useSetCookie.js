export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=Strict`;
}

export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const cookieValue = c.substring(nameEQ.length, c.length);
      const cookieParts = c.split(";");
      for (let j = 0; j < cookieParts.length; j++) {
        const part = cookieParts[j].trim();
        if (part.startsWith("expires=")) {
          const expiryDate = new Date(part.substring(8));
          if (expiryDate < new Date()) {
            return null;
          }
        }
      }
      return cookieValue;
    }
  }
  return null;
}

export function eraseCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;path=/;Secure;SameSite=Strict`;
}
