var query = { active: true, currentWindow: true },
    title = document.getElementById('title'),
    urlInput = document.getElementById('url'),
    message = document.getElementById('message'),
    shortUrlInput = document.getElementById('short'),
    sub = document.getElementById('submit');
sub.innerText = chrome.i18n.getMessage("submit");
title.innerText = chrome.i18n.getMessage("paste");
chrome.tabs.query(query, (tabs)=>{
    if(tabs && tabs[0]){
        urlInput.value = tabs[0].url;
        checkIt();
    }
});

sub.addEventListener('click', checkIt);

function checkIt(){
    message.innerText = chrome.i18n.getMessage("please_wait");
    chrome.runtime.sendMessage({action: "shortUrl",url:urlInput.value},(ans) =>{
        //console.log(ans);
        if(ans.status && ans.newUrl){
            message.innerText = chrome.i18n.getMessage("success");
            shortUrlInput.value  = ans.newUrl;
            shortUrlInput.classList.remove('hidden');
            chrome.runtime.sendMessage({action: "injectJs"});
        }
        else{
            message.innerText = chrome.i18n.getMessage("error");
        }
    });
}
