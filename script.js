var apiKey = "eb0e93c5fe8ebf8135e10e9db3baecf5"

//var apiKey="166a433c57516f51dfab1f7edaed8413"
var storedcities= (localStorage.getItem("storedcities"));

function createbutton(city){
    var newbutton=$("<button>");
    newbutton.addClass("btn");
    newbutton.addClass("btn-block");
    newbutton.addClass("btn-outline-primary");
    newbutton.addClass("city");
    newbutton.text(city);
    newbutton.attr("data-city", city);
    $("#storedcities").append(newbutton)
}

if (storedcities !=='undefined'&& storedcities!==null){
    createbutton
}
  



$(function () {
    
    function forecast(city){
        var queryUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + 
        city + 
        "&units=imperial&appid="+
        apiKey;
        $.ajax({
            url: queryUrl,
            method: "GET",
          }).then(function(casts){
              console.log(casts)
              var x=0
           for(var i=3;i<=35;i+=8){
               x= x+1
               var id ="#day-"+x
               console.log(id)
                var date =casts.list[i].dt_txt
                var icon=casts.list[i].weather[0].icon
               var iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
               console.log(iconurl)
               console.log(icon)
               var temp=casts.list[i].main.temp
               console.log(temp)
               var iconel=$("<img>").attr("src", iconurl)
               var tempEl=$("<p>").text("Temp:"+temp+"°F")
               $(id).html("<h5>"+date+"</h5>");
               $(id).append(iconel)
               $(id).append(tempEl)

            console.log(casts.list[i])
           }
          })
       
    }
    if (storedcities !=='undefined'&& storedcities!==null){
    forecast(storedcities)
    CurrentWeather(storedcities)}
  
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
          
        $("#city-name").text(data.name + " Weather");
        var iconUrl ="https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        
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
      createbutton(city);

    })
});
  
  