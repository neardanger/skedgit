// stage 1  //////////////////////////////////////////////////////////
v = document.getElementsByTagName("video")[0]

// run the video in the background and loops it
v.addEventListener('play', function() {
  console.log(this)
  v.currentTime = 13;
}, false);
v.addEventListener("timeupdate", function() {
    if (v.currentTime >= 136) {
        v.currentTime = 13
    }
}, false)

$('img').addClass('materialboxed')


//  stage 2  //////////////////////////////////////////////////////////
var $content = $('<div class="row"></div>')
var $typesCol = $('<div class="col s6"></div>')
var $times = $('.time-list')


// $content.append($typesCol)

$('#show-content').click(function(){
  $('#lower-content').append($content)
  $('#show-content').remove()
})

$(document).ready(function(){
  for(i=1; i < 13; i ++) {
    $times.append('<li><a href="#!">'+ i + ":00" +'</a></li>'
 )
    console.log(i)
  }})

  for (var i=1; i<=3; i++){
    var slider = document.getElementById('time' + i);
    console.log(slider);
      noUiSlider.create(slider, {
       start: [14, 16],
       connect: true,
       step: 1,
       range: {
         'min': 1,
         'max': 24
       },
       format: {
         to: function(value){
          if (value == 12) {
            return value + "pm"
          } else if (value == 24){
            return (value - 12) + "am"
          } else if (value > 12) {
            return (value - 12) + "pm"
          }
          return value + "am"
         },
         from: function(value){
          var returnValue = value.replace("am", '')
          returnValue = value.replace("pm",'')
          return returnValue
         }
       }
    })
  }

  // stage 3 //////////////////////////////////////////////////////////
  var search = $('#searchList')
  var $row = $('row')

  $(document).ready( function(){
    var choice = []

    var currentStep = 0

    var query = [{
      query: {
        location: "santa+monica",
        category_filter: "restaurants"
      }
    },
    {
      query: {
        location: "santa+monica",
        category_filter: "bars"
      }
    },
    {
      query: {
        location: "santa+monica",
        category_filter: "desserts"
      }
    }]

    var headings = ["Restaurants","Bars","Desserts"]
    var businesses = []

    function populateList(){
      console.log(query[currentStep]);
      $('#heading').after('<div class="progress" id="loady"><div class="indeterminate"></div></div>')
      $.ajax({
        method: "post",
        url: '/yelp/search',
        data: JSON.stringify(query[currentStep]),
        contentType: 'application/json'
      }).done(function(result){
        search.html('')
        $('#heading').text(headings[currentStep])
        result.businesses.forEach(function(b, i){
          businesses[i] = {
            id: b.id,
            name: b.name,
            image_url: b.image_url,
            rating_img_url_small: b.rating_img_url_small,
            snippet_text: b.snippet_text,
            display_address: b.location.display_address[0],
            category: choice[currentStep]
          }
          search.append(
                    '<tr style="height: 150px;border-top: 1px solid black;border-bottom: 1px solid black">' +
                      "<td class='center'>" + b.name + "<br><img src='"+ b.image_url +"'></td>" +
                      "<td><img src='" + b.rating_img_url_small + "'></td>" +
                      "<td style='width: 350px'>" + b.snippet_text +'</td>' +
                      '<td>' + b.location.display_address[0] +'</td>' +
                      '<td><a class="btn add-button" data-id="' + i + '">Add</a></td>' +
                    "</tr>"
                  )
        })

        $('#loady').remove()
      })
    }

    populateList()

    $('body').on('click','.add-button', function(evt){
      if (currentStep < query.length){
        $('html, body').animate({scrollTop:0}, 300)
        choice[currentStep] = businesses[$(evt.target).data("id")]
        console.log(choice[currentStep])
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
        console.log(currentStep)
        $('#step' + currentStep)
        populateList()
      }
    })
  })


  // stage 4  //////////////////////////////////////////////////////////
  var prop = $('#searchProp')
  var tr = $('#trList')
  var save = $('#saveSchedule')
  var choice = [{ id:"tar-and-roses-santa-monica",rating_img_url_small: "",category: "Restaurant", image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/OrWLCrnxBfhEjeyDCPC19w/ms.jpg", name:"Tar & Roses" },{id:"the-misfit-restaurant-bar-santa-monica", image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/Dvb6PZA56JLYRA-SNl5Ivw/ms.jpg", name: "The Misfit Restaurant + Bar", category: "Bar"},{id:'roccos-cheesecake-santa-monica',image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/BVZXOxC_Elyda1BU65IMig/ms.jpg",category: "Desert",name: "Rocco's Cheesecake"}]
function fillPage() {
  choice.forEach(function(b){
    prop.append(
      '<th class="center">'+ b.category + '</th>'
    )
    tr.append(
      "<td class='center'>" + b.name + "<br><img src='"+ b.image_url +"'></td>"
    )
  })
  }

  save.on('click', function(){
    console.log('on clicked');

    var newSchedule = {
      name: $('#schedule-name').val(),
      businesses: []
    }

    console.log("newSchedule",newSchedule);
    choice.forEach(function(c){
      newSchedule.businesses.push(c)
    })

    $.ajax({
      method: "post",
      url: "/schedules",
      data: JSON.stringify(newSchedule),
      contentType: 'application/json'
    }).done(function(){
      Materialize.toast('Schedule Saved!', 3000, 'rounded green')
    })
  })

  fillPage()
