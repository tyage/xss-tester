import { launchCDPOnce } from './chrome';

const test = async () => {
  const { Runtime } = await launchCDPOnce();
  await Runtime.enable();

  return true;
};

export default {
  test
};
