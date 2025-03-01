import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
    script.async = true;

    script.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          rootId: "JotformAgent-01955090b7fe7d3b91f2aca0057e6dd6bbb9",
          formID: "01955090b7fe7d3b91f2aca0057e6dd6bbb9",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isInitialOpen: false,
          isDraggable: false,
          background: "linear-gradient(180deg, #C8CEED 0%, #C8CEED 100%)",
          buttonBackgroundColor: "#0a1551",
          buttonIconColor: "#fff",
          variant: false,
          customizations: {
            greeting: "Yes",
            greetingMessage: "Hi! How can I assist you?",
            pulse: "Yes",
            position: "right",
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="JotformAgent-01955090b7fe7d3b91f2aca0057e6dd6bbb9"></div>;
};

export default Chatbot;
