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
        this.get = function (aUrl, aCallback, postData, callback_args) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
                    if (aCallback != null)
                        if (callback_args == null) callback_args = [];
                    aCallback(anHttpRequest.responseText, ...callback_args);
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

    getData: function (aUrl, aCallback, postData = null, callback_args) {
        local = window.location.origin;
        var client = new this.HttpClient();
        client.get(local + aUrl, aCallback, postData, callback_args);

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
    },

    setStyle: function (style) {
        // /khS/khS/static/node_modules/bootswatch/dist/slate/bootstrap.css
        console.log("style", style);
        CookieManager.setCookie("style", style);
        var bootswatch_element = $("#bootswatch");
        var style_url = "";
        if (style != "default") {
            style_url = `/khS/khS/static/node_modules/bootswatch/dist/${style}/bootstrap.css`
        }
        bootswatch_element.attr("href", style_url);
        $("#current_style").html(style);
    }
}

var khsComponents = {

    createToast: function (title, msg, color_scheme = "primary") {
        color_schemes = {
            "primary": "text-white bg-primary",
            "success": "text-white bg-success",
            "danger": "text-white bg-danger",
            "warning": "text-black bg-warning"

        }
        toasts_element = $("#khs_toast");

        new_toast = $.parseHTML(
            `<div class="toast ${color_schemes[color_scheme]} border-5 rounded-3" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header rounded-0">
                    <strong class="me-auto">${title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${msg}
                </div>
            </div>`);
        toasts_element.append(new_toast);
        toast_bootstrap_element = new bootstrap.Toast(new_toast[0])
        toast_bootstrap_element.show()
    }

}
