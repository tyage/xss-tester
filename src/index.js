import { launchCDPOnce } from './chrome';

const test = async (url) => {
  const { Runtime, Page } = await launchCDPOnce();
  await Runtime.enable();
  await Page.enable();
  await Page.navigate({ url });
  await Page.loadEventFired();
  await Runtime.evaluate({ expression: 'alert(document.body.innerHTML)' });

  return true;
};

export default {
  test
};
