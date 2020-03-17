import { getActiveApp } from "../../cantara-config";
import { CantaraApplication } from "../../util/types";
import execCmd from "../../util/exec";

export default async function publishPackage(app: CantaraApplication) {
    await execCmd('np --no-tests', {
      redirectIo: true,
      workingDirectory: app.paths.root,
    });
  }