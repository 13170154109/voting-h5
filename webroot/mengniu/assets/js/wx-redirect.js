
var wxr_domain = "campaign.archisense.cn";


function wxr_getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function wxr_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function wxr_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}






var wxr_openid = "";
var wxr_hash = "";


if (wxr_getParameterByName("hash")) {
    wxr_hash = wxr_getParameterByName("hash");
}

if (wxr_getParameterByName("openid")) {
    wxr_openid = wxr_getParameterByName("openid");
}


if (window.location.host.indexOf(wxr_domain) == 0 && navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1) {


    if (wxr_openid == "") {

        var redirect = "http://"+wxr_domain+ document.location.pathname + document.location.search;

        document.location = "http://campaign.archisense.cn/wechat/api/login.php?redirect=" + encodeURIComponent(redirect);

    }

    if (wxr_openid != "") {
        // alert(wxr_openid);
        //test
    }

    if (wxr_hash != "") {
        // alert(wxr_hash);
    }


}