var apiKey = "a173635b06badd101b76739c4a211fcf"
var storedcities= (localStorage.getItem("storedcities"));
var newbutton=$("<button>");
     newbutton.addClass("btn");
     newbutton.addClass("btn-block");
     newbutton.addClass("btn-outline-primary");
     newbutton.addClass("city");
     newbutton.text(storedcities);
     newbutton.attr("data-city", storedcities);
       $("#storedcities").append(newbutton)

console.log(storedcities)



$(function () {



   CurrentWeather(storedcities)
  
    function CurrentWeather(city) {
      var queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey;
        $.ajax({
        url: queryUrl,
        method: "GET",
      }).then(function (data) {
        console.log(data);
        $("#city-name").text(data.name + " Weather");
        var iconUrl ="https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        console.log(iconUrl)
        var iconImg = $("<img>").attr("src", iconUrl);
        $("#weather-icon").empty();
        $("#weather-icon").append(iconImg)
        $("#temp").text(data.main.temp + "°");
        $("#wind").text(data.wind.speed + " mph");
        $("#humidity").text(data.main.humidity + " %");
      });
    }
    

    $(document).on("click", ".city", function(){
        var city=$(this).attr("data-city");
        CurrentWeather(city)
    });

   
 

    $("#search-form").on("submit", function (event) {

      event.preventDefault();
      if (city === "") {
        return;
      }
      
      var city = $("#search-input").val().trim();
      localStorage.setItem("storedcities",city)
      $("#search-input").val("");
      CurrentWeather(city);
     var newbutton=$("<button>");
     newbutton.addClass("btn");
     newbutton.addClass("btn-block");
     newbutton.addClass("btn-outline-primary");
     newbutton.addClass("city");
     newbutton.text(city);
     newbutton.attr("data-city", city);
       $("#storedcities").append(newbutton);


    })
});
  
  