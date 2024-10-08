import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 flex justify-between items-center z-99">
      <p>
        Questo sito utilizza i cookie per migliorare l'esperienza dell'utente.
        Continuando a navigare, accetti il nostro uso dei cookie.
      </p>
      <button
        onClick={handleAccept}
        className="bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
      >
        Accetta
      </button>
    </div>
  );
};

export default CookieConsent;
