import React, { useEffect, useState } from "react";
import '../../styles/LoadingScreen.css';

export default function LoadingScreen({ message = "LOADING..." }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const fullText = String(message ?? ""); // đảm bảo là string
    if (!fullText.length) return;           // nếu chuỗi rỗng thì bỏ qua

    let index = 0;
    const speed = 150; // ms giữa mỗi ký tự

    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index = (index + 1) % fullText.length; // chạy vòng tròn từ đầu tới cuối
    }, speed);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="loading-wrapper">
      <div className="loading-container">
        <div className="loading-spinner" />
        <span className="loading-message" style={{ whiteSpace: "pre" }}>
          {displayText}
        </span>
      </div>
    </div>
  );
}
