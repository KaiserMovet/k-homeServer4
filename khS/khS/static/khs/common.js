var CookieManager = {
    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    setCookie: function (cname, cvalue, exdays = 30) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

var RequestManager = {

    HttpClient: function () {
        this.get = function (aUrl, aCallback, postData, ...args) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
                    if (aCallback != null)
                        aCallback(anHttpRequest.responseText, ...args);
                }
            }

            anHttpRequest.open("POST", aUrl, true);
            anHttpRequest.setRequestHeader("Accept", "application/json");
            anHttpRequest.setRequestHeader("Content-Type", "application/json");
            if (postData != null) {
                postData = JSON.stringify(postData);
            };
            console.log("data to send", postData);
            anHttpRequest.send(postData);
            console.log(anHttpRequest)
        }
    },

    getData: function (aUrl, aCallback, postData = null, ...args) {
        local = window.location.origin;
        var client = new this.HttpClient();
        client.get(local + aUrl, aCallback, postData, ...args);

    },
}

var Utils = {
    // Function add specified class (class_list[class_index]) to element
    // and remove rest of the classess
    setClass: function (element, class_index, class_list) {
        element = $(element);
        var current_index = 0;
        // remove classess
        class_list.forEach(class_str => {
            if (current_index != class_list) {
                element.removeClass(class_str);
            }
            current_index += 1;
        }
        );
        // add classess
        element.addClass(class_list[class_index]);
    }
}

