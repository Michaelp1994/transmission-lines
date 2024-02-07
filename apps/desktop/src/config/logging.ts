// import electronLog from "electron-log";
// import { app } from "electron";

export default function init() {
    // app.commandLine.appendSwitch("remote-debugging-port", "9229");
    // electronLog.initialize();
    // Object.assign(console, electronLog.functions);
    process.traceProcessWarnings = true;
}
