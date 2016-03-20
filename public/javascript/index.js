// transitional code
function slideOutLeft(el){
  $(el).animate({marginLeft: "-1000px", opacity: "0"}, 250, function(){
    $(el).hide()
  })
  return $(el)
}

function slideInLeft(el){
  $(el).css({marginLeft: "1000px", opacity: "0"})
  $(el).removeClass('hide')
  $(el).animate({marginLeft: "0", opacity: "1"}, 250)
  return $(el)
}

function slideBetween(el, next){
  $(el).animate({marginLeft: "-1000px", opacity: "0"}, 250, function(){
    $(el).hide()
    slideInLeft(next)
  })
  return $(el)
}



// stage 1  //////////////////////////////////////////////////////////
v = document.getElementsByTagName("video")[0]

// run the video in the background and loops it
v.addEventListener('play', function() {
  // console.log(this)
  v.currentTime = 13;
}, false);
v.addEventListener("timeupdate", function() {
    if (v.currentTime >= 136) {
        v.currentTime = 13
    }
}, false)
// users inputed location

var whereTo

// switch between stages
$('#submit-location').click(function(evt){
  slideBetween('#stage1','#stage2')
  whereTo = $('#location_1').val()
  whereTo = whereTo.replace(/\s+/g, "+")
  whereTo = whereTo.replace(/^\s+|\s+$/g, "");
  // query.forEach(function(userL){
  //   userL.query.location = whereTo
  // console.log(whereTo);
})
//  stage 2  //////////////////////////////////////////////////////////
var $content = $('<div class="row"></div>')
var $typesCol = $('<div class="col s6"></div>')
var $categoriesList = $('#categories-list')
var $timesList = $('#times-list')

var times = []
var sliders = []
var scheduleItems = []

// for the time bar
function addSlider(i){
  sliders[i] = document.getElementById('time' + i)
  // console.log("sliders[i]",sliders[i]);
  var timeStart = 9 + (i * 2)
  var timeEnd = i<=25 ? timeStart + 2 : 27
    noUiSlider.create(sliders[i], {
     start: [timeStart, timeEnd],
     connect: true,
     step: 1,
     range: {
       'min': 5,
       'max': 27
     },
     format: {
       to: function(value){
        if (value == 12) {return value + "pm"}
        if (value == 24) {return (value - 12) + "am"}
        if (value > 24) {return (value - 24) + "am"}
        if (value > 12) {return (value - 12) + "pm"}
        return value + "am"
       },
       from: function(value){
        // var returnValue = value.replace("am", '')
        // returnValue = value.replace("pm",'')
        return value
       }
     }
  })
}

var query = []
// addes schedule item
function addScheduleItem(){
  var scheduleQuery = $('#schedule-query').val()

  if(scheduleQuery){
    var i = scheduleItems.length
    // console.log("i", i);
    query[i]={
      query: {
        term: scheduleQuery,
        location: whereTo
      }
    }
    scheduleItems.push(query[i])
    $categoriesList.append('<div>'+query[i].query.term+'</div><br>')
    var $slider = $('<div id="time'+i+'" class="time-slider"></div><br>')
    $categoriesList.append($slider)
    // console.log("$slider",$slider);
    addSlider(i)
  } else {
    Materialize.toast('Please enter a query', 2000, 'rounded red')
  }
}

$('#add-schedule-item').click(addScheduleItem)


// evaluate the times and move to next step
$('#stage2-submit').click(function(){
  for (var i=0; i<sliders.length; i++){
    var values = sliders[i].noUiSlider.get()
    times[i] = {
      start: values[0],
      end: values[1]
    }
  }
  // console.log(query);
  // console.log("times", times)
  populateList()
  slideBetween('#stage2','#stage3')
})

  // stage 3 ///////////////////////////////////////////////////////////////
  var search = $('#searchList')
  var $row = $('row')


    var choice = []

    var currentStep = 0

    // var query = [{
    //   query: {
    //     location: "",
    //     category_filter: "restaurants"
    //   }
    // },
    // {
    //   query: {
    //     location: "",
    //     category_filter: "bars"
    //   }
    // },
    // {
    //   query: {
    //     location: "",
    //     category_filter: "desserts"
    //   }
    // }]
    // var headings = ["Restaurants","Bars","Desserts"]
    var businesses = []

    $('#resize').click(function(){
      $('#map').css({width:"500px"})
      // initMap()
    })
    var lat
    var lng
    function populateList(){
      // console.log("populateList called");

      $('#heading').after('<div class="progress" id="loady"><div class="indeterminate"></div></div>')
      // console.log("query[currentStep]",query[currentStep]);
      $.ajax({
        method: "post",
        url: '/yelp/search',
        data: JSON.stringify(query[currentStep]),
        contentType: 'application/json'
      }).done(function(result){
        var businessMarkers = []
        lat = result.region.center.latitude
        lng = result.region.center.longitude
        // console.log("result",result);
        // console.log("$ ajax done called");
        search.html('')
        $('#heading').text(query[currentStep].query.term)
        result.businesses.forEach(function(b, i){
          businesses[i] = {
            id: b.id,
            name: b.name,
            image_url: b.image_url,
            rating_img_url_small: b.rating_img_url_small,
            snippet_text: b.snippet_text,
            display_address: b.location.display_address[0] + " " + b.location.display_address[1],
            category: query[currentStep].query.term
          }
          // console.log("business foreach done");
          search.append(
                    '<tr style="height: 150px;border-top: 1px solid black;border-bottom: 1px solid black">' +
                      "<td class='center'>" + b.name + "<br><img class='materialboxed' src='"+ b.image_url +"'></td>" +
                      "<td><img class='round-img' src='" + b.rating_img_url_small + "'></td>" +
                      "<td style='width: 350px'>" + b.snippet_text +'</td>' +
                      '<td>' + b.location.display_address[0] +'</td>' +
                      '<td><a class="btn add-button" data-id="' + i + '">Add</a></td>' +
                    "</tr>"
                  )
                  businessMarkers[i] = {
                    name: b.name,
                    lat: b.location.coordinate.latitude,
                    lng: b.location.coordinate.longitude,
                    icon: b.image_url,
                    address: b.location.display_address[0] + " " + b.location.display_address[1],
                    phone: b.number,
                    rating: b.rating_img_url_small,
                    url: b.url
                  }
        })
        // $('.materialboxed').materialbox();
        // console.log("search append done");
        // console.log(lat, lng);
        initMap(lat,lng, businessMarkers)

        $('#loady').remove()
      })
      // console.log('populateList complete');
    }

    $('body').on('click','.add-button', function(evt){
      if (currentStep < (query.length)){
        $('html, body').animate({scrollTop:0}, 300)
        choice.push(businesses[$(evt.target).data("id")])
        choice[currentStep].times = times[currentStep]
        // console.log(choice[currentStep])
        if(currentStep == 0) {
          var width = "50%"
        }
        else if(currentStep == 1) {
          var width = "70%"
        }
        else if(currentStep == 2) {
          var width = "90%"
        }
        $('.determinate').css({width: width})

          currentStep++
          // console.log("currentStep", currentStep)
          // $('#step' + currentStep)
          populateList()
      }
      if (currentStep == (query.length)) {
        slideBetween('#stage3', '#stage4')
        $('#map').remove()
        fillPage()
      }
    })

// build google map w/google code ///////////////////////////////////////////////google maps
    function initMap(lat,lng, businessMarkers, directions) {
      var lat = lat || 0
      var lng = lng || 0
      var businessMarkers = businessMarkers || []
      var num = num || 0
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: lat,lng: lng}
      });
      directionsDisplay.setMap(map);


      google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
      })

      if(businessMarkers){
        businessMarkers.forEach(function(m){
          var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h5 id="firstHeading" class="firstHeading">' + m.name + '</h5>'+
        '<div id="bodyContent"><p>' + m.address
        + '<br><img src="'
        + m.rating +'"><br><a target="_blank"href="'
        + m.url + '">More info</a></p>' +
        '</div>'+ '</div>'
          var icon = {
              url: m.icon, // url
              scaledSize: new google.maps.Size(25, 25), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
          };
        var marker = new google.maps.Marker({
          position: {lat: m.lat, lng: m.lng},
          map: map,
          icon: icon,
          animation: google.maps.Animation.DROP,
          title: m.name
        })
        google.maps.event.addListener(marker , 'click', function(){
            var infowindow = new google.maps.InfoWindow({
              content: contentString,
              position: {lat: m.lat, lng: m.lng},
            });
            infowindow.open(map);
            });
        })
      }

      if (directions) calculateAndDisplayRoute(directionsService, directionsDisplay)
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var wpts = []

      var choice2 = choice
      choice2.splice(0,choice2.length - 1).forEach(function(c){
        wpts.push({
          location: c.display_address,
          stopover: true
        })
      })
      // console.log(lat, 'lat', lng, 'lng');
      directionsService.route({
        origin: choice[0].display_address,
        destination: choice2[choice2.length -1].display_address,
        waypoints: wpts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var route = response.routes[0];
          var summaryPanel = document.getElementById('directions-panel');
          summaryPanel.innerHTML = '';
          // For each route, display summary information.
          for (var i = 0; i < route.legs.length; i++) {
            var routeSegment = i + 1;
            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                '</b><br>';
            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  // stage 4  //////////////////////////////////////////////////////////////////////////////////////////////////

  var prop = $('#searchProp')
  var tr = $('#trList')
  var save = $('#saveSchedule')

  var newScheduleItem = []
//generate choices they picked
  // var choice = [{ id:"tar-and-roses-santa-monica",rating_img_url_small: "",category: "Restaurant", image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/OrWLCrnxBfhEjeyDCPC19w/ms.jpg", name:"Tar & Roses" },{id:"the-misfit-restaurant-bar-santa-monica", image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/Dvb6PZA56JLYRA-SNl5Ivw/ms.jpg", name: "The Misfit Restaurant + Bar", category: "Bar"},{id:'roccos-cheesecake-santa-monica',image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/BVZXOxC_Elyda1BU65IMig/ms.jpg",category: "Desert",name: "Rocco's Cheesecake"}]
function fillPage() {
  console.log("fillPage choice",choice);
  choice.forEach(function(b){
    newScheduleItem.push(b)
    prop.append(
      '<th class="center">'+ b.category + '</th>'
    )
    tr.append(
      "<td class='center'>" + b.name + "<br><img class='center' src='" + b.image_url + "'><br>" + b.times.start + " to " + b.times.end + "</td>"
    )
  })

  $('#directions-panel').before('<div id="map" class="center"></div>')
  initMap(lat,lng,null,true)

  }

  save.on('click', function(){
    // console.log('on clicked');

    if ($('#schedule-name').val()) {
      var newSchedule = {
        name: $('#schedule-name').val(),
        businesses: []
      }

      console.log(choice, "choice");

      newScheduleItem.forEach(function(i){
        newSchedule.businesses.push(i)
        console.log(i,'i');
      })

      console.log("newSchedule",newSchedule);
      $.ajax({
        method: "post",
        url: "/users/profile",
        data: JSON.stringify(newSchedule),
        contentType: 'application/json'
      }).done(function(){
        Materialize.toast('Schedule saved!', 2000, 'rounded green')
        window.location = "/users/profile"
      })
    } else {
      Materialize.toast('Please name your schedule', 2000, 'rounded red')
    }
  })
