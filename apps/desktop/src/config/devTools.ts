// import installExtension, {
//     REACT_DEVELOPER_TOOLS,
//     REDUX_DEVTOOLS,
// } from "electron-devtools-installer";

import { session } from "electron";
import path from "node:path";
import os from "node:os";

export default async function init() {
    // Install DevTools extensions
    if (process.env["NODE_ENV"] === "development") {
        try {
            const reactDevToolsPath = path.join(
                os.homedir(),
                "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/5.0.0_0"
            );
            const react =
                await session.defaultSession.loadExtension(reactDevToolsPath);
            console.log(`extension ${react.name} loaded`);

            // const reduxDevToolsPath = path.join(
            //     os.homedir(),
            //     "/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/3.1.6_0"
            // );
            // const redux =
            //     await session.defaultSession.loadExtension(reduxDevToolsPath);
            // console.log(`extension ${redux.name} loaded`);
        } catch (e) {
            console.error(e);
        }
    }
}
