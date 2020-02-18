"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
var fs_2 = require("../util/fs");
var envvars_1 = __importDefault(require("./envvars"));
var isDirectory = function (source) { return fs_1.lstatSync(source).isDirectory(); };
var getDirectories = function (source) {
    return fs_1.readdirSync(source)
        .map(function (name) { return path.join(source, name); })
        .filter(isDirectory);
};
/** Requires that at least one of the specified folders exist */
function requireAtLeastOneFolder(paths) {
    var doesOneFolderExist = paths
        .map(function (folderPath) { return fs_1.existsSync(folderPath); })
        .includes(true);
    if (!doesOneFolderExist) {
        throw new Error('No apps or packages folders were detected!');
    }
}
/** Returns list of all React Apps, Packages and Node Apps */
function getAllApps(_a) {
    var rootDir = _a.rootDir, stage = _a.stage, activeAppName = _a.activeAppName;
    var FOLDER_NAMES = {
        REACT_APPS: 'react-apps',
        NODE_APPS: 'node-apps',
        PACKAGES: 'packages',
    };
    var reactAppsRootDir = path.join(rootDir, FOLDER_NAMES.REACT_APPS);
    var packagesAppsRootDir = path.join(rootDir, FOLDER_NAMES.PACKAGES);
    var nodeAppsRootDir = path.join(rootDir, FOLDER_NAMES.NODE_APPS);
    requireAtLeastOneFolder([
        reactAppsRootDir,
        packagesAppsRootDir,
        nodeAppsRootDir,
    ]);
    var allAppsDirectories = __spreadArrays(getDirectories(reactAppsRootDir).map(function (dir) { return ({ dir: dir, type: 'react' }); }), getDirectories(packagesAppsRootDir).map(function (dir) { return ({
        dir: dir,
        type: 'package',
    }); }), getDirectories(nodeAppsRootDir).map(function (dir) { return ({ dir: dir, type: 'node' }); }));
    var allApps = allAppsDirectories.map(function (_a) {
        var dir = _a.dir, type = _a.type;
        var typeToUse = type;
        var displayName = path.basename(dir);
        var appName = displayName;
        var userAddedMetadata = undefined;
        if (type === 'package') {
            var packageSrc = path.join(dir, 'src');
            typeToUse = fs_1.existsSync(path.join(packageSrc, 'index.tsx'))
                ? 'react-component'
                : 'js-package';
        }
        if (type === 'node') {
            typeToUse = fs_1.existsSync(path.join(dir, 'serverless.yml'))
                ? 'serverless'
                : 'node';
        }
        var packageJsonPath = path.join(dir, 'package.json');
        if (fs_1.existsSync(packageJsonPath)) {
            var packageJSON = JSON.parse(fs_1.readFileSync(packageJsonPath).toString());
            displayName = packageJSON.name;
        }
        var cantaraConfigPath = path.join(dir, 'cantara.config.js');
        if (fs_1.existsSync(cantaraConfigPath)) {
            userAddedMetadata = require(cantaraConfigPath);
        }
        var envVars = envvars_1.default({
            appRootDir: dir,
            currentStage: stage,
            expectedEnvVars: userAddedMetadata ? userAddedMetadata.env || [] : [],
            fallbackStage: 'development',
            /** If this is the currently active app,
             * the env vars defined in cantara.config.js
             * are required and an error is thrown
             * if some are missing
             */
            required: appName === activeAppName,
        });
        return {
            name: appName,
            type: typeToUse,
            env: envVars,
            paths: {
                root: dir,
                src: path.join(dir, 'src'),
                build: path.join(dir, 'build'),
                assets: path.join(dir, 'assets'),
            },
            meta: __assign({ displayName: displayName }, userAddedMetadata),
        };
    });
    // Require index.ts(x) file to exist for every app
    allApps.forEach(function (app) {
        var indexTsFileExists = fs_1.existsSync(path.join(app.paths.src, 'index.ts'));
        var indexTsxFileExists = fs_1.existsSync(path.join(app.paths.src, 'index.tsx'));
        var doesIndexFileExist = indexTsFileExists || indexTsxFileExists;
        if (!doesIndexFileExist) {
            throw new Error("Index file for \"" + app.name + "\" was not found. Please create it.");
        }
    });
    return allApps;
}
exports.default = getAllApps;
/** Loads and parses the content from the user's .secrets.json file
 * in the project root. Here, Cantara specific secrets can be stored.
 * E.g. AWS keys. Can also be passed in as environment variables.
 */
function loadSecrets(_a) {
    var projectDir = _a.projectDir, identifiers = _a.secrets;
    var secretsFilePath = path.join(projectDir, '.secrets.json');
    var secrets = {};
    if (fs_1.existsSync(secretsFilePath)) {
        secrets = fs_2.readFileAsJSON(secretsFilePath);
    }
    for (var _i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
        var secretId = identifiers_1[_i];
        if (!secrets[secretId]) {
            secrets[secretId] = process.env[secretId];
        }
    }
    return secrets;
}
exports.loadSecrets = loadSecrets;