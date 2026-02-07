
let input_bar = document.querySelector(".box");
let search_btn = document.querySelector(".btn");

search_btn.addEventListener("click", () => {
    let inputText = input_bar.value.trim();

    console.log(inputText);


    api_data(inputText).then((data) => {
        console.log(data)
        updateDOM(data)
    });


    input_bar.value = "";
})



async function api_data(Location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=ec00dcdc4a7f4b59a1443243262301&q=${Location}&aqi=no`
    const response = await fetch(url);
    console.log(response);

    if(response.status===400){
        alert("Give a valid location");
        return;
    }
    const jsonData = await response.json();


    return jsonData;
}

function updateDOM(data) {
    // *******Filter required ********
    const locationName = data.location.name;
    const temperature = data.current.temp_c;

    const updateDetails = data.current.last_updated;
    const [date, time]=updateDetails.split(" ");
    


    const climate = data.current.condition.text;

    function formatUnixTimestamp(unixSeconds) {
        // Convert seconds to milliseconds
        const date = new Date(unixSeconds * 1000);

        // Extract the date (YYYY-MM-DD)
        const yyyyMmDd = date.toISOString().split('T')[0];

        // Extract the time (HH:MM:SS)
        const time = date.toLocaleTimeString('en-GB'); // 'en-GB' gives 24-hour format

        // Get the Day name
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        return {
            time: time,
            day: day,
            date: yyyyMmDd
        };
    }

    // Usage:
    const result = formatUnixTimestamp(data.current.last_updated_epoch);
    console.log(`${result.time} ${result.day} ${result.date}`);
    // Output: "04:30:00 Thursday 2026-01-22"


    const iconUrl=data.current.condition.icon;

    // console.log(temperature, locationName, data, time, iconUrl);


    //****************Update dom */

    const tempElem=document.querySelector(".temp");
    const locationElem=document.querySelector(".place");
    const timeElem=document.querySelector(".time");
    const dayElem=document.querySelector(".day");
    const dateElem=document.querySelector(".date");
    const iconElem=document.querySelector("img");
    const climateElem=document.querySelector(".cond");

    tempElem.textContent=temperature+"℃";
    locationElem.textContent=locationName;
    timeElem.textContent=time;
    dayElem.textContent=result.day;
    dateElem.textContent=date;
    iconElem.src=iconUrl;
    climateElem.textContent=climate;

}
