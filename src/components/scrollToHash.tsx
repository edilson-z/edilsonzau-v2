// components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const element = document.querySelector(hash);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [hash]);

  return null;
}