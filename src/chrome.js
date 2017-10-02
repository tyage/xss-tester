import { launch } from 'chrome-launcher';
import chrome from 'chrome-remote-interface';

let chromeProcess = null;
const launchChromeOnce = async () => {
  if (chromeProcess !== null) {
    return chromeProcess;
  }

  chromeProcess = await launch({
    chromeFlags: ['--headless']
  });
  return chromeProcess;
};

let CDP = null;
const launchCDPOnce = async () => {
  if (CDP !== null) {
    return CDP;
  }

  return new Promise((resolve, reject) => {
    const chromeProcess = await launchChromeOnce();
    chrome({
      port: chromeProcess.port
    }, async (client) => {
      CDP = client;
      resolve(CDP);
    });
  });
};

export const exitChrome = () => {
  if (chromeProcess) {
    chromeProcess.kill();
  }
  chromeProcess = null;
  CDP = null;
};

process.on('exit', () => {
  exitChrome();
});