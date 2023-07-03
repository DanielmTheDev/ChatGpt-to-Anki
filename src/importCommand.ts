import {constants} from "./constants";

export function addImportCommandListener(): void {
    chrome.commands.onCommand.addListener(command => {
        if (command === constants.commands.import) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id ?? 0, {message: constants.messages.getSelectedText}, function (response) {
                    console.log(response.data);

                });
            });
        }
    });
}