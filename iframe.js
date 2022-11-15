var iframe = document.getElementById('iframe');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
console.log(innerDoc);
