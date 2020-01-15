"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cantara_config_1 = __importDefault(require("../../cantara-config"));
var exec_1 = __importDefault(require("../../util/exec"));
/** Deploys the currently selected application.
 */
function deployActiveApp() {
    var _a = cantara_config_1.default().runtime, activeApp = _a.currentCommand.app, secrets = _a.secrets;
    if (activeApp.type !== 'serverless') {
        throw new Error('Currently, only the deployment of serverless endpoints is provided by Cantara.');
    }
    if (!secrets.AWS_ACCESS_KEY_ID || !secrets.AWS_SECRET_ACCESS_KEY) {
        throw new Error('Please define "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" in the .secrets.json file on the root of your project!');
    }
    var serverlessCmd = 'serverless deploy --stage prod';
    exec_1.default(serverlessCmd, {
        workingDirectory: activeApp.paths.root,
        redirectIo: true,
        withSecrets: true,
    });
}
exports.default = deployActiveApp;
