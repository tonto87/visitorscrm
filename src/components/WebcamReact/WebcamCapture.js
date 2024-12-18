import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import Webcam from "react-webcam";
import "./style.scss";
import { useTranslation } from "react-i18next";

const WebcamCapture = ({ onCapture }) => {
  const { t } = useTranslation();
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="webcam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-preview"
      />

      <div className="webcam-actions">
        <Button
          type="button"
          onClick={handleCapture}
          className="capture-button"
        >
          {t("webcam.capturePhoto")}
        </Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
