// Google Tag Manager Loader
// Include this file in all your HTML pages using: <script src="gtm-loader.js"></script>

(function() {
  // Initialize Google Tag Manager
  var w = window;
  var d = document;
  var s = 'script';
  var l = 'dataLayer';
  var i = 'GTM-KDF75342';
  
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  
  var f = d.getElementsByTagName(s)[0];
  var j = d.createElement(s);
  var dl = l !== 'dataLayer' ? '&l=' + l : '';
  
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
  
  // Add noscript iframe fallback
  var noscriptDiv = d.createElement('noscript');
  var iframe = d.createElement('iframe');
  iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + i;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscriptDiv.appendChild(iframe);
  d.body.insertBefore(noscriptDiv, d.body.firstChild);
})();
