"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}

export default function LiveSupport() {
  useEffect(() => {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "7054b99490b4e86615f02ad6cec7dbde12322431";
    window.smartsupp =
      window.smartsupp ||
      function () {
        (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
      };
    window.smartsupp._ = window.smartsupp._ || [];

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
