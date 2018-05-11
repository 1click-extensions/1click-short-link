var query = { active: true, currentWindow: true },
    urlInput = document.getElementById('url'),
    message = document.getElementById('message'),
    shortUrlInput = document.getElementById('short'),
    sub = document.getElementById('submit');
sub.innerText = chrome.i18n.getMessage("submit");
chrome.tabs.query(query, (tabs)=>{
    if(tabs && tabs[0]){
        urlInput.value = tabs[0].url;
    }
});

sub.addEventListener('click', ()=>{
    message.innerText = chrome.i18n.getMessage("please_wait");
    chrome.runtime.sendMessage({action: "shortUrl",url:urlInput.value},(ans) =>{
        console.log(ans);
        if(ans.status && ans.newUrl){
            message.innerText = chrome.i18n.getMessage("success");
            shortUrlInput.value  = ans.newUrl;
        }
        else{
            message.innerText = chrome.i18n.getMessage("error");
        }
    });
})
