let loc = document.getElementById('Location');
let tempicon = document.getElementById('image');
let tempvalue = document.getElementById('temp');
let climate = document.getElementById('desc');
let iconfile;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	getWeather(searchInput.value);
	searchInput.value='';
})

const getWeather=async(city)=>
{
	try{

		const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=94035a7a1e16dbff61cc704ba2c942ff`)
		const weatherData = await response.json();
		console.log(weatherData);
		const{name}=weatherData;
		const{feels_like}=weatherData.main;
		const{id,main}=weatherData.weather[0];
		loc.textContent=name;
		climate.textContent=main;
		tempvalue.textContent=Math.round(feels_like-273);
		if (id<300 && id>200)
			{
				tempicon.src="./thunder.svg"
			}
			else if (id<400 && id>300)
			{
				tempicon.src="./cloudy.svg"
			}
			else if (id<600 && id>500)
			{
				tempicon.src="./rainy-1.svg"
			}
			else if (id<700 && id>=600)
			{
				tempicon.src="./snowy-1.svg"
			}
			else if (id<800 && id>700)
			{
				tempicon.src="./mist.svg"
			}
			else if (id==800)
			{
				tempicon.src="./day.svg"
			}
			else if (id>800)
			{
				tempicon.src="./cloudy-day-3.svg"
			}

	}
	catch(error)
	{
		alert('oops city not found !');
	}
}


window.addEventListener("load" ,()=>{

	let long;
	let lat;

	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition((position)=>
		{


		long=position.coords.longitude;
		lat=position.coords.latitude;


		const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=94035a7a1e16dbff61cc704ba2c942ff`

		fetch(api).then((response)=>{

			return response.json();
		})

		.then (data =>{

			const{name}=data;
			const{feels_like}=data.main;
			const{id,main}=data.weather[0];

			loc.textContent=name;
			climate.textContent=main;
			tempvalue.textContent=Math.round(feels_like-273);
			if (id<300 && id>200)
			{
				tempicon.src="./thunder.svg"
			}
			else if (id<400 && id>300)
			{
				tempicon.src="./cloudy.svg"
			}
			else if (id<600 && id>500)
			{
				tempicon.src="./rainy-1.svg"
			}
			else if (id<700 && id>600)
			{
				tempicon.src="./snowy-1.svg"
			}
			else if (id<800 && id>700)
			{
				tempicon.src="./mist.svg"
			}
			else if (id==800)
			{
				tempicon.src="./day.svg"
			}
			else if (id>801)
			{
				tempicon.src="./cloudy-day-3.svg"
			}
		})

		}
		)
	}
})

