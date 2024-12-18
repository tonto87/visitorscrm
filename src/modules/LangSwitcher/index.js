import React, { useState, useEffect, useRef } from "react";
import "./LangSwitcher.scss";
import useLanguage from "../../hooks/useLanguage";

const LANGUAGES = [
  { code: "en", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "az", flag: "https://flagcdn.com/w40/az.png" },
];

const LangSwitcher = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { selectedLanguage, changeLanguage } = useLanguage("az");
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleSelect = (code) => {
    changeLanguage(code);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="lang-switcher">
      <div
        className="selected-flag"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <img
          src={LANGUAGES.find((lang) => lang.code === selectedLanguage)?.flag}
          alt={selectedLanguage}
          className="flag-circle"
        />
      </div>

      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className="dropdown-item"
              onClick={() => handleSelect(lang.code)}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="flag-circle dropdown-flag"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
