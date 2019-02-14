window.fbAsyncInit = function() {
    FB.init({
        appId            : 'Your-App-ID',
        autoLogAppEvents : true,
        status     		 : true,
        cookie     		 : true,
        xfbml            : true,
        version          : 'v2.12'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function () {
    $('#share').click(function (e) {
        e.preventDefault();

        FB.ui({
            method: 'feed',
            href: 'https://developers.facebook.com/docs/'
        }, function (response) {
            console.log(response);
        });
    });
});