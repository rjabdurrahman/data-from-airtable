(function () {
    var config = {
        nodeId: 'form-container-de0e6bad-986d-4c58-a948-c77e786346bd',
        width: '100%',
        height: '700px',
        url: 'https://eform.pandadoc.com/?eform=ea958435-9833-40ae-bd52-0913beca1218',
        events: {
            loaded: function () { },
            started: function (data) { },
            completed: function (data) { },
            exception: function (data) { }
        },
        data: {},
    };

    const dataQueryString = config.data ? Object.keys(config.data)
        .map(function (key) {
            return '&' + key + '=' + encodeURIComponent(JSON.stringify(config.data[key]));
        })
        .join('') : '';

    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.src = config.url + dataQueryString;

    if (config.nodeId) {
        var node = document.getElementById(config.nodeId);
        node.style.height = config.height;
        node.style.width = config.width;
        iframe.height = '680px';
        iframe.width = '500px';
        node.append(iframe);
    } else {
        iframe.height = config.height;
        iframe.width = config.width;
        document.body.append(iframe);
    }

    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    window[eventMethod](messageEvent, function (e) {
        if (e && e.data && config && iframe && e.source === iframe.contentWindow) {

            try {
                var message = JSON.parse(e.data);
                if (message && message.event) {
                    var event = message.event.replace('embed.form.', '');
                    var callback = config.events ? config.events[event] : null;
                    if (callback) {
                        callback(message.data);
                    }
                }
            } catch (e) { }
        }
    }, false);
})();