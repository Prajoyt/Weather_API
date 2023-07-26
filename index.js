//initializing all elements
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector('.weather2 p');
const dateField = document.querySelector('.weather2 span');
const emojiField = document.querySelector('.weather3 img');
const weatherField = document.querySelector('.weather3 span');
const searchField = document.querySelector('.searchField');
const form = document.querySelector('form');

//default location
let target = "delhi";

//function to fetch api
const fetchData = async (target) => {

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=03eda61d115a4683b9e62052231307&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();

        //destructuring 

        const { current: { temp_c, condition: {
            text, icon
        } },
            location: { name, localtime },
        } = data;

        //  console.log(data);

        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location Not found!!!!!")
    }




};

//function to update dom
function updateDom(temperate, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();
    // console.log(exactDate);
    temperateField.innerText = temperate;
    cityField.innerText = city;


    //console.log(exactTime);


    //console.log(getDayName(exactDay));

    dateField.innerText = `${exactTime} ${getDayName(exactDay)} ${exactDate}`;
    emojiField.src = emoji
    weatherField.innerText = text
}

fetchData(target);


// function to search location
const search = (e) => {
    e.preventDefault();
    target = searchField.value;
    //console.log(target);
    fetchData(target)
}
form.addEventListener('submit', search)


//function to get name of Day
function getDayName(num) {
    switch (num) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
            return "Friday"
            break;
        case 6:
            return "Saturday"
            break;
        default:
            return " There is error";

    }
}



