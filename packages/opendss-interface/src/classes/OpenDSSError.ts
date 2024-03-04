export default class OpenDSSError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OpenDSSError";
    }
}
