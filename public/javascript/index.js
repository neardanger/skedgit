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
  console.log(this)
  v.currentTime = 13;
}, false);
v.addEventListener("timeupdate", function() {
    if (v.currentTime >= 136) {
        v.currentTime = 13
    }
}, false)
// users inputed location

var whereTo

$('img').addClass('materialboxed')

// switch between stages
$('#submit-location').click(function(evt){
  slideBetween('#stage1','#stage2')
  whereTo = $('#location_1').val()
  whereTo = whereTo.replace(/\s+/g, "+")
  whereTo = whereTo.replace(/^\s+|\s+$/g, "");
  // query.forEach(function(userL){
  //   userL.query.location = whereTo
  console.log(whereTo);
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
  console.log("sliders[i]",sliders[i]);
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

function addScheduleItem(){
  var scheduleQuery = $('#schedule-query').val()

  if(scheduleQuery){
    var i = scheduleItems.length
    console.log("i", i);
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
    console.log("$slider",$slider);
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
  console.log(query);
  // console.log("times", times)
  populateList()
  slideBetween('#stage2','#stage3')
})

  // stage 3 //////////////////////////////////////////////////////////
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

    function populateList(){
      // console.log("populateList called");
      $('#heading').after('<div class="progress" id="loady"><div class="indeterminate"></div></div>')
      console.log("query[currentStep]",query[currentStep]);
      $.ajax({
        method: "post",
        url: '/yelp/search',
        data: JSON.stringify(query[currentStep]),
        contentType: 'application/json'
      }).done(function(result){
        console.log("result",result);
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
            display_address: b.location.display_address[0],
            category: query[currentStep].query.term
          }
          // console.log("business foreach done");
          search.append(
                    '<tr style="height: 150px;border-top: 1px solid black;border-bottom: 1px solid black">' +
                      "<td class='center'>" + b.name + "<br><img class='materialboxed' src='"+ b.image_url +"'></td>" +
                      "<td><img src='" + b.rating_img_url_small + "'></td>" +
                      "<td style='width: 350px'>" + b.snippet_text +'</td>' +
                      '<td>' + b.location.display_address[0] +'</td>' +
                      '<td><a class="btn add-button" data-id="' + i + '">Add</a></td>' +
                    "</tr>"
                  )

        })
        $('.materialboxed').materialbox();
        // console.log("search append done");

        $('#loady').remove()
      })
      // console.log('populateList complete');
    }

    $('body').on('click','.add-button', function(evt){
      if (currentStep < (query.length)){
        $('html, body').animate({scrollTop:0}, 300)
        choice[currentStep] = businesses[$(evt.target).data("id")]
        choice[currentStep].times = times[currentStep]
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
          console.log("currentStep", currentStep)
          // $('#step' + currentStep)
          populateList()
      }
      if (currentStep == (query.length)) {
        slideBetween('#stage3', '#stage4')
        fillPage()
      }
    })



  // stage 4  //////////////////////////////////////////////////////////
  var prop = $('#searchProp')
  var tr = $('#trList')
  var save = $('#saveSchedule')

  // var choice = [{ id:"tar-and-roses-santa-monica",rating_img_url_small: "",category: "Restaurant", image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/OrWLCrnxBfhEjeyDCPC19w/ms.jpg", name:"Tar & Roses" },{id:"the-misfit-restaurant-bar-santa-monica", image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/Dvb6PZA56JLYRA-SNl5Ivw/ms.jpg", name: "The Misfit Restaurant + Bar", category: "Bar"},{id:'roccos-cheesecake-santa-monica',image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/BVZXOxC_Elyda1BU65IMig/ms.jpg",category: "Desert",name: "Rocco's Cheesecake"}]
function fillPage() {
  console.log("choice",choice);
  choice.forEach(function(b){
    prop.append(
      '<th class="center">'+ b.category + '</th>'
    )
    tr.append(
      "<td class='center'>" + b.name + "<br><img class='materialboxed' src='" + b.image_url + "'><br>" + b.times.start + " to " + b.times.end + "</td>"
    )
  })
  }

  save.on('click', function(){
    console.log('on clicked');

    if ($('#schedule-name').val()) {
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
        Materialize.toast('Schedule saved!', 2000, 'rounded green')
      })
    } else {
      Materialize.toast('Please name your schedule', 2000, 'rounded red')
    }
  })
