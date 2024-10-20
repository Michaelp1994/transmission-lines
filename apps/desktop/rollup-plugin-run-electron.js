import { spawn } from "child_process";
import electronPath from "electron";

let spawnProcess = null;
export default function runElectron() {
    return {
        name: "my-example", // this name will show up in logs and errors
        writeBundle: {
            order: "post",
            handler() {
                if (spawnProcess !== null) {
                    spawnProcess.off("exit", process.exit);
                    spawnProcess.kill("SIGINT");
                    spawnProcess = null;
                }
                spawnProcess = spawn(String(electronPath), [".", "--inspect"]);
                spawnProcess.stdout.on(
                    "data",
                    (d) => d.toString().trim() && console.warn(d.toString())
                );
                spawnProcess.stderr.on("data", (d) => {
                    const data = d.toString().trim();
                    if (!data) return;
                    console.error(data);
                });
                spawnProcess.on("exit", process.exit);
            },
        },
    };
}
