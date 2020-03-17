import execCmd from '../../util/exec';
import { getActiveApp } from '../../cantara-config';
import publishNodeApp from './node';
import publishPackage from './package';

export default async function publishActiveApp() {
  const activeApp = getActiveApp();

   if (activeApp.type === 'node') {
    await publishNodeApp(activeApp);
  } else if (
    activeApp.type === 'js-package' ||
    activeApp.type === 'react-component'
  ) {
    await publishPackage(activeApp);
  } else {
    console.log(`Apps of type ${activeApp.type} can't be built.`);
  }
}
