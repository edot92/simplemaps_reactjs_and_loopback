module.exports = function (Maps) {
  var parsingJSON = function (param) {
    var validator = require('is-my-json-valid')
    var validate = validator({
      required: true,
      type: 'object',
      properties: {
        placemark_id: {
          type: "string",
          required: true
        },
        name: {
          type: "string",
          required: true
        },
        address: {
          type: "string",
          required: true
        },
        lat: {
          type: "string",
          required: true
        },
        lng: {
          type: "string",
          required: true
        }
      }
    });
    var results = {
      "error": '',
      "message": null
    }

    var tempJSON;
    try {
      tempJSON = JSON.parse(param);
    } catch (err) {
      console.log(err);
      results.error = 'invalid parse param json from server';
      return JSON.stringify(results);
    }
    //cek if json is valid format key and available
    for (var index = 0; index < tempJSON.length; index++) {
      var isValid = validate(tempJSON[index]);
      if (!isValid) {
        results.error = 'invalid parse json';
        return JSON.stringify(results);
      }
    }

    results.message = tempJSON;
    return JSON.stringify(results);
  }

  // loopback
  Maps.getdataexample = function (cb) {
    global
      .ClientRequest('http://www.qlue.co.id/vacancy/svc/getDataExample.ph', function (error, response, body) {
        if (error != null || response.statusCode != 200) {
          var path = require('path');
          var jsonfile = require('jsonfile')
          var file = __dirname + '/formatmaps.txt'
          jsonfile.readFile(file, function (errRead, obj) {
            if (errRead != null) {
              var err = new Error();
              err.status = response.statusCode;
              err.message = "Remote server error, maybe url was offline & failed to load local json";
              cb(err);
            } else {
              var temp1 = parsingJSON(JSON.stringify(obj));
              var jsonRes = JSON.parse(temp1);
              console.log(jsonRes.error)
              if (jsonRes.error != '') {
                var err = new Error();
                err.status = 400;
                err.message = jsonRes.error;
                cb(err);
              } else 
                cb(null, jsonRes);
              }
            })
        } else {
          var temp1 = parsingJSON(body);
          var jsonRes = JSON.parse(temp1);
          console.log(jsonRes.error)
          if (jsonRes.error != '') {
            var err = new Error();
            err.status = 400;
            err.message = jsonRes.error;
            cb(err);
          } else 
            cb(null, jsonRes);
          }
        });
  };
};
