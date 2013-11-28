var markersArray = [];

google.maps.Map.prototype.clearOverlays = function() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
};

function drawPopularName(level, latLng1, latLng2, map) {
    $.get("/popularNames",
        {
            level: level,
            lat1: latLng1.lat(),
            lon1:latLng1.lng(),
            lat2: latLng2.lat(),
            lon2:latLng2.lng()
        },
        function (data) {
            $.each(data, function (index, value) {
                var myLatlng = new google.maps.LatLng(value["geo"]["lat"], value["geo"]["lon"]);
                var marker = new MarkerWithLabel({
                    position: myLatlng,
                    map: map,
                    labelContent: value["name"],
                    labelAnchor: new google.maps.Point(22, 0),
                    labelClass: "labels", // the CSS class for the label
                    labelStyle: {opacity: 0.75}
                });
                markersArray.push(marker);
            });
        }
    );
}
function initialize() {

    var mapOptions = {
        center: new google.maps.LatLng(-25.363882,131.044922),
        zoom: 4
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    google.maps.event.addListener(map, 'bounds_changed', function() {
        console.log(map.zoom);
        if (map.zoom <= 13)
        {
            map.clearOverlays();
            var bounds = map.getBounds();
            drawPopularName("state", bounds.getNorthEast(), bounds.getSouthWest(), map);
        } else {
            map.clearOverlays();
            var bounds = map.getBounds();
            drawPopularName("suburb", bounds.getNorthEast(), bounds.getSouthWest(), map);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);