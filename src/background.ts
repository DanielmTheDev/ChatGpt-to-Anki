chrome.commands.onCommand.addListener(command => {
    if (command === 'import') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id ?? 0, {message: 'getSelectedText'}, function (response) {
                console.log(response.data);
            });
        });
    }
});