import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguage = (ref) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
    setSelectedLanguage(code);
    document.querySelector("html").setAttribute("lang", code);
  };

  return {
    selectedLanguage,
    changeLanguage,
  };
};

export default useLanguage;
