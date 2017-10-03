import { launchCDPOnce } from './chrome';

const chromeOption = {
  //chromeFlags: ['--headless'],
  chromeFlags: ['--load-extension=./extension', '--disable-xss-auditor'],
  enableExtensions: true,
};

const test = async (url) => {
  const { Runtime, Page } = await launchCDPOnce(chromeOption);
  await Runtime.enable();
  await Page.enable();
  await Page.navigate({ url });
  await Page.loadEventFired();
  const { result } = await Runtime.evaluate({
    expression: 'JSON.stringify({ alertCounter: window.XSSTesterAlertCounter, promptCounter: window.XSSTesterPromptCounter })'
  });
  if (result.subtype === 'error') {
    throw new Error('error happend on alert check');
  }
  const { alertCounter, promptCounter } = JSON.parse(result.value);

  return alertCounter > 0 || promptCounter > 0;
};

export default {
  test
};
