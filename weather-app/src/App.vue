
<template>
  <div id="app">
    <h1>5 day forecast</h1>
    <section aria-label="Search for your a five day forecast">
      <div class="form-group">
        <label for="search" class="sr-only">Location</label>
        <input type="text" name="search" id="search" placeholder="City" v-model="city_query" @keyup.enter="fetchForecast">
        <label for="state" class="sr-only">Select state</label>
        <select v-model="state_query" @keyup.enter="fetchForecast" id="state" name="state" placeholder="State">
          <option value="" class="disabled selected">State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>				
        <button @click="fetchForecast" class="searchBtn">Search</button>
      </div>
      <div v-if="error !== null || 'undefined'" :class="[{'error-show': error !=null}, 'error']">
        <p>{{error}}</p>
      </div>
      <div class="card-wrapper" >
        <div class="card" v-for="(weather, index) in weatherData" :key="weather.list" @mouseenter="onHover"
        :class="[index===0 ? 'js-big current' : 'js-small',`${weather.background}`]">
          <div class="card-header">
            <time>{{weather.dt_txt}}</time>
            <p class="location">{{location}}</p>
          </div>
          <div class="card-body">
            <p class="temp main-temp">{{weather.main.temp}}</p>
            <p class="description">{{weather.weather[0].description}}</p>
            <inline-svg :src="require(`${weather.weather[0].icon}`)"></inline-svg>
            <p class="precip">{{weather.pop}}% chance of rain</p>
            <p class="temp feels-temp">Feels like {{weather.main.feels_like}}</p>
            <p class="humidity">Humidity: {{weather.main.humidity}}%</p>
          </div>
        </div>
      </div>
    </section> 
    <footer>
      <p>Images from <a href="unsplash.com" title="Unsplash, photos for everyone" target="_blank">unsplash.com</a></p>
      <p>Icons made by <a href="https://www.flaticon.com/free-icon/cloud_3313884" title="bqlqn" target="_blank">bqlqn</a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon"> www.flaticon.com</a></p>
    </footer>
  </div>
</template>

<script>   
export default {
  
  name: 'App',
  data (){
    
    return {
      api_key : '4de4a8d80078d333a4a72f1c11d87820',
      forecast_url: 'https://api.openweathermap.org/data/2.5/',
      weatherData : [],
      city_query: '',
      state_query: '',
      location : '',
      error: null,
    }
  },
  methods: {
    fetchForecast(){
      this.error = null;

      if(!this.state_query == "" && !this.city_query == "" || !this.city_query == null){
        fetch(`${this.forecast_url}forecast?q=${this.city_query},${this.state_query},US&appid=${this.api_key}&units=imperial`)
          .then(res => {
            if(!res.ok){
              this.error = res.status;
            }
            else {
              return res.json()
            }
          })
          .then(this.storeData)
          .catch (err => {
              if(this.error === 404){
                this.error = 'Oops looks like something went wrong. Please try again';
                console.error('Error:',err);
              }
            }
          )
        }
      else {
        if(this.city_query == ''|| this.city_query == ' '|| this.city_query == null ){
          this.error = 'Please enter a city';
        }
        else if(this.state_query == '' || this.state_query == ' ' || this.state_query == 'state'){
          this.error = 'Please enter a state';
        }
        
      
      }
    },
    storeData(data) {
      //clearing the data array when a new search is done
      this.weatherData = [];
      //looping through the data.list to only return the 5 day forecast and not the data for every 3 hours
      if(data.list != null) {
          for(var i = 0; i < data.list.length; i+=8){
        this.weatherData.push(data.list[i]);
      }

      //looping through the weatherDate array to fix temps and dates
      for(var x = 0; x < this.weatherData.length; x++){
        const temp = parseInt(this.weatherData[x].main.temp),
              tempMin = parseInt(this.weatherData[x].main.temp_min),
              tempMax = parseInt(this.weatherData[x].main.temp_max),
              feelsLike = parseInt(this.weatherData[x].main.feels_like),
              date = new Date(this.weatherData[x].dt_txt.split(" ")[0]).toDateString().split(' 2020')[0],
              precip = (this.weatherData[x].pop * 100);
              

        //replacing the icon from the api with an svg
        if(this.weatherData[x].weather[0].icon == "01d" || this.weatherData[x].weather[0].icon == "01n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-sunny.svg';
          this.weatherData[x].background = 'background--sunny';
        }
        
        else if(this.weatherData[x].weather[0].icon == "02d" || this.weatherData[x].weather[0].icon == "02n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-partly-cloudy.svg';
          this.weatherData[x].background = 'background--partly-cloudy';
        }

        else if(this.weatherData[x].weather[0].icon == "03d" || this.weatherData[x].weather[0].icon == "03n" || this.weatherData[x].weather[0].icon == "04d" || this.weatherData[x].weather[0].icon == "04n") {
          this.weatherData[x].weather[0].icon = './assets/images/icn-cloudy.svg';
          this.weatherData[x].background = 'background--cloudy';
        }

        else if(this.weatherData[x].weather[0].icon == "09d" || this.weatherData[x].weather[0].icon == "09n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-light-rain.svg';
          this.weatherData[x].background = 'background--lt-rain';
        }

        else if(this.weatherData[x].weather[0].icon == "10d" || this.weatherData[x].weather[0].icon == "10n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-hvy-rain.svg';
          this.weatherData[x].background = 'background--hvy-rain';
        }
        else if(this.weatherData[x].weather[0].icon == "11d" || this.weatherData[x].weather[0].icon == "11n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-thunderstorm.svg';
          this.weatherData[x].background = 'background--thunderstorm.jpg';
        }
        else if(this.weatherData[x].weather[0].icon == "13d" || this.weatherData[x].weather[0].icon == "13n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-snow.svg';
          this.weatherData[x].background = 'background--snow';
        }
        else if(this.weatherData[x].weather[0].icon == "50d" || this.weatherData[x].weather[0].icon == "50n"){
          this.weatherData[x].weather[0].icon = './assets/images/icn-fog.svg';
          this.weatherData[x].background = 'background--fog';
        }
        this.location = this.city_query + ', ' + this.state_query;
        this.weatherData[x].main.temp = temp;
        this.weatherData[x].main.temp_min = tempMin;
        this.weatherData[x].main.temp_max = tempMax;
        this.weatherData[x].main.feels_like = feelsLike;
        this.weatherData[x].dt_txt = date;
        this.weatherData[x].pop = precip;
      }
      } 
    
    },
    onHover(item){
      var currentDate = document.querySelector('.current'),   card = document.querySelectorAll('.card');
      if(item.target.classList.contains('js-small') ){
        for(var i = 0; i < card.length; i++){
          card[i].classList.remove('js-big');
          card[i].classList.add('js-small');
        }
        item.target.classList.remove('js-small');
        item.target.classList.add('js-big');
        if(currentDate.classList.contains('js-big')){
          currentDate.classList.remove('js-big');
          currentDate.classList.add('js-small');
        }
      }

      if(item.target.classList.contains('current') && item.target.classList.contains('js-small')){
        item.target.classList.add('js-big');
        item.target.classList.remove('js-small');
      }

    },
  },
}
</script>

<style lang="scss">

@import "./assets/css/styles.scss";

</style>
