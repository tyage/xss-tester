import { launchCDPOnce } from './chrome';

const test = async (url) => {
  const { Runtime, Page } = await launchCDPOnce();
  await Runtime.enable();
  await Page.enable();
  await Page.navigate({ url });
  await Page.loadEventFired();
  const { result } = await Runtime.evaluate({
    expression: 'JSON.stringify({ alertCounter: XSSTesterAlertCounter, promptCounter: XSSTesterPromptCounter })'
  });
  const { alertCounter, promptCounter } = JSON.parse(result.value);

  return alertCounter > 0 || promptCounter > 0;
};

export default {
  test
};
