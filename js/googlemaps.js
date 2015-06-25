function LetteringMap(mapCanvasId, utils, jsonSourceUrl) {

  jsonSourceUrl = jsonSourceUrl || "located_gsol.json";
  var map = null;


  var initialize = function() {
    document.getElementById(mapCanvasId).style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    fetchItems().then(function(items){
      initAndDrawMap();
      document.getElementById('loading').style.display = 'none';
      for(i in items) {
        var item = items[i];
        drawItem(item);
      }
    });
  }

  var initAndDrawMap = function() {
    var mapCanvas = document.getElementById(mapCanvasId);
    var loading = document.getElementById('loading').style.display = 'none';
    var mapOptions = {
      center: new google.maps.LatLng(46.547549,8.582305),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    mapCanvas.style.display = 'block';
  }

  var drawItem = function(item) {
    item.marker.setMap(map);

    google.maps.event.addListener(item.marker, 'click', function() {
      var contentString = utils.getInfoTemplate();
      contentString = utils.parseInfoWindow(contentString, item.foto);
      
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(map, item.marker);
    });
  }

  var fetchItems = function() {
    document.getElementById(mapCanvasId).style.display = 'none';
    return new Promise(function(resolve, reject) {
      this.utils.getJSON(jsonSourceUrl)
      .then(function(data) {
        var items = [];
        for(i in data) {
          foto = data[i];
          if(!foto.custom.location) continue;
            items.push(createItem(foto.custom));
          }
          resolve(items);
      }, function(status) {
          alert('Something went wrong.');
      });
    });
  }

  var createItem = function(foto) {
    var myLatlng = new google.maps.LatLng(
      foto.location.latitude, 
      foto.location.longitude
    );
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        // map: TO BE SET WHEN KNOWN,
    });

    var contentString = this.utils.getInfoTemplate();
    contentString = this.utils.parseInfoWindow(contentString, foto);
    
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var item = {
      'foto': foto,
      'marker': marker,
      'infoWindow': infowindow
    }
    return item;
  }

  return {
    initialize: initialize
  };
};
