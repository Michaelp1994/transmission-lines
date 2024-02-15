import GeneralStudy from "@repo/opendss-interface/classes/GeneralStudy";

export default async function saveScript(
    study: GeneralStudy,
    fileName: string
) {
    await study.saveScript(fileName);
}
