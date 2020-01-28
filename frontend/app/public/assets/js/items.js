(function ($) {
    $(document).ready(function () {

        // The name of the product host. This is pulled from the Kubernetes service.
        //kubectl get svc -o jsonpath='{.items[*].status.loadBalancer.ingress[0].ip}'
        var productHost = "http://34.67.216.125/";

        // The name of the ads host. This is pulled from the Compute Engine Load Balancer.
        //gcloud compute forwarding-rules list --filter='name:"ads-service-forwarding-rules"' --format='value(IPAddress)'
        var adHost = "http://34.102.180.189/";

        var app1 = new Vue({
            delimiters: ['[[', ']]'],
            el: '#items',
            data: {
                items: []
            },
            mounted() {

                var that = this;

                var request = $.ajax({
                    url: productHost,
                    method: "GET",
                    dataType: "json"
                });

                request.done(function (serviceJson) {
                    dataUrl = serviceJson.url;

                    var r = $.ajax({
                        url: dataUrl,
                        method: "GET",
                        dataType: "json",
                        crossDomain: true,
                    });

                    r.done(function (data) {
                        that.items = data;
                    });

                    r.fail(function (jqXHR, textStatus) {
                        console.log("Request failed: " + textStatus);
                    });

                });

                request.fail(function (jqXHR, textStatus) {
                    console.log("Request failed: " + textStatus);
                });
            }
            
        });

        var app2 = new Vue({
            delimiters: ['[[', ']]'],
            el: '#ads',
            data: {
                item: {}
            },
            mounted() {
                var that = this;

                var request = $.ajax({
                    url: adHost,
                    method: "GET",
                    dataType: "json"
                });

                request.done(function (data) {
                    that.item = data;
                });

                request.fail(function (jqXHR, textStatus) {
                    console.log("Request failed: " + textStatus);
                });
            }
        });
    });
})(jQuery);