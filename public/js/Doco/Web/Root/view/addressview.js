var Doco.Web.Root.View.AddressView = Backbone.View.extend({

	initialize: function() {

        var start_marker;
        var start_icon = "/img/start-race.png";
        var finish_icon = "/img/finish2.png";
        var startfinish_icon = "/img/startfinish.png";

        var startimg = new google.maps.MarkerImage(start_icon,
              new google.maps.Size(32, 37),
              new google.maps.Point(0, 0),
              new google.maps.Point(16, 37)
        );

        var finishimg = new google.maps.MarkerImage(finish_icon,
              new google.maps.Size(32, 37),
              new google.maps.Point(0, 0),
              new google.maps.Point(16, 37)
        );

        var startfinishimg = new google.maps.MarkerImage(startfinish_icon,
               new google.maps.Size(32, 37),
               new google.maps.Point(0, 0),
               new google.maps.Point(16, 37)
        );

        google.maps.event.addListener( this.map, ' idle', function()
        {
            refleshMarker();
        });

	},
    refleshMarker : function(){
        //地図の表示範囲を取得
        var bounds = this.map.getBounds();
        var northEastLatLng = bounds.getNorthEast();
        var southWestLatLng = bounds.getSouthWest();

        //jsonファイルの取得
        $.ajax({
          url: 'get_marker?neLat='+northEastLatLng.lat()+'&neLng='+northEastLatLng.lng()+'&swLat='+southWestLatLng.lat()+'&swLng='+southWestLatLng.lng(),
          type: 'GET',
          dataType: 'json',
          timeout: 1000,
          error: function(){
            alert("地図データの読み込みに失敗しました");
          },
          success: function(json){
              //帰ってきた地点の数だけループ
              for (var i = 0; i < json.length; i++){

                var path = [];

                for (var j = 0; j < json[i].path.length; j++) {
                  var latlng = new google.maps.LatLng(json[i].path[j][0], json[i].path[j][1]);
                  path.push (latlng);
                }

                poly = new MyPolyline({ map: this.map , strokeColor: json[i].route_color});

                poly.setPath(path);
                poly.setName(json[i].name);

                if (path[0].equals(path[path.length-1])){
                  startfinish_marker = new google.maps.Marker({position: path[0], map: this.map, title: json[i].name, icon: startfinishimg});
                }
                else{
                  start_marker = new google.maps.Marker({position: path[0], map: this.map, title: json[i].name, icon: startimg});
                  finish_marker = new google.maps.Marker({position: path[path.length-1], map: this.map, title: "finish", icon: finishimg});
                }

                google.maps.event.addListener(poly, "click", function(evt) {
                    alert(this.getName());
                });

              }
          }
        });
    }
});



