var utils = function utils() {
  
  function getJSON(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  };

  function parseInfoWindow(template, foto) {
    template = template.replace(/{{text}}/g, foto.text);
    template = template.replace(/{{author.full_name}}/g, foto.author.full_name);
    template = template.replace(/{{author.username}}/g, foto.author.username);
    template = template.replace(/{{image.thumbnail.url}}/g, foto.image.thumbnail.url);
    template = template.replace(/{{image.thumbnail.width}}/g, foto.image.thumbnail.width);
    template = template.replace(/{{image.thumbnail.height}}/g, foto.image.thumbnail.height);
    template = template.replace(/{{date}}/g, getDateString(foto.date));
    template = template.replace(/{{link}}/g, foto.link);
    return template;
  }

  function getDateString(dateUnixTs) {
    var date = new Date(dateUnixTs * 1000);
    var month = date.getMonth();
    month = (month>=10) ? month : "0"+month;
    
    var day = date.getDate();
    day = (day>=10) ? day : "0"+day;

    var dateStr = day + "/" + month + "/" + date.getFullYear();
    return dateStr;
  }

  function getInfoTemplate() {
    var contentString = "<div style='width:250px'>";
    contentString += "<p><strong>{{author.full_name}}</strong> - <a target='_blankblank' href='http://instagram.com/{{author.username}}'>@{{author.username}}</a> [{{date}}]</p>";
    contentString += "<div>";
      contentString += "<p style='float:left; width:95px; margin-right:5px'>";
        contentString += "<a href='{{link}}' target='_blank'>";
          contentString += "<img width='75' height='75' src='{{image.thumbnail.url}}'>";
        contentString += "</a>";
      contentString += "</p>";
      contentString += "<p style='float:left; width:130px;'>{{text}}</p>";
    contentString += "</div>";
    contentString += "<p style='clear:both;'></p>";
    contentString += "<p><a href='{{link}}' target='_blank'>Ver en Instagram</a></p>";
    contentString += "</div>";
    return contentString;
  }

  return {
    getJSON: getJSON,
    parseInfoWindow: parseInfoWindow,
    getInfoTemplate: getInfoTemplate
  }
}();