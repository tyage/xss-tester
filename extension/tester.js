const hookScript = `
window.XSSTesterAlertCounter = 0;
window.alert = () => {
  ++XSSTesterAlertCounter;
};
window.XSSTesterPromptCounter = 0;
window.prompt = () => {
  ++XSSTesterPromptCounter;
};
`;

const scriptElement = document.createElement('script');
scriptElement.textContent = hookScript;
document.documentElement.appendChild(scriptElement);
