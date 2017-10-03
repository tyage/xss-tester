import { launch } from 'chrome-launcher';
import chrome from 'chrome-remote-interface';

let chromeProcess = null;
const launchChromeOnce = async (chromeOption) => {
  if (chromeProcess !== null) {
    return chromeProcess;
  }

  chromeProcess = await launch(chromeOption);
  return chromeProcess;
};

let CDP = null;
export const launchCDPOnce = async (chromeOption) => {
  if (CDP !== null) {
    return CDP;
  }

  return new Promise(async (resolve, reject) => {
    const chromeProcess = await launchChromeOnce(chromeOption);
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
