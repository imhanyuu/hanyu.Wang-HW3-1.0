mapboxgl.accessToken = 'pk.eyJ1IjoiaHczNTkyIiwiYSI6ImNsdXVhbmlzMzA3dzYyam11MXBtOHZ0bDIifQ.fCVVfhCEeFhzqIdOmcz1CQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.0060, 40.7128],
    zoom: 3 
});

const sisterCities = [
    {
        city: 'New York City',
        coordinates: [-74.0060, 40.7128],
        intro: 'New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world\'s largest natural harbors.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Central_Park_-_The_Pond_%2848377220157%29.jpg/440px-Central_Park_-_The_Pond_%2848377220157%29.jpg'
    },
    {
        city: 'Beijing',
        coordinates: [116.4074, 39.9042],
        intro: 'Beijing, alternatively romanized as Peking, is the capital of China. With about 22 million residents, Beijing is the world\'s most populous national capital city.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Parkview_Green_and_CBD_skyline_%2820210927131419%29.jpg/440px-Parkview_Green_and_CBD_skyline_%2820210927131419%29.jpg'
    },
    {
        city: 'Budapest',
        coordinates: [19.0402, 47.4979],
        intro: 'Budapest is the capital and most populous city of Hungary. It is the ninth-largest city in the European Union by population within city limits.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Budapest_Hungarian_Parliament_%2831363963556%29.jpg/536px-Budapest_Hungarian_Parliament_%2831363963556%29.jpg'
    },
    {
        city: 'Cairo',
        coordinates: [31.2357, 30.0444],
        intro: 'Cairo is the capital of Egypt and the city-state Cairo Governorate, and is the country\'s largest city, home to 10 million people.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Cairo_From_Tower_%28cropped%29.jpg/556px-Cairo_From_Tower_%28cropped%29.jpg'
    },
    {
        city: 'Jerusalem',
        coordinates: [35.2137, 31.7683],
        intro: 'Jerusalem is a city in West Asia, on a plateau in the Judaean Mountains between the Mediterranean and the Dead Sea.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Jerusalem-1712855.jpg/556px-Jerusalem-1712855.jpg'
    },
    {
        city: 'Johannesburg',
        coordinates: [28.0473, -26.2041],
        intro: 'Johannesburg is the most populous city in South Africa with 4,803,262 people, and is classified as a megacity.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Johannesburg_CBD_%28cropped%29.jpg/556px-Johannesburg_CBD_%28cropped%29.jpg'
    },
    {
        city: 'London',
        coordinates: [-0.1276, 51.5074],
        intro: 'London is the capital and largest city of England, and the United Kingdom, with a population of around 8.8 million.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/556px-London_Skyline_%28125508655%29.jpeg'
    },
    {
        city: 'Madrid',
        coordinates: [-3.7038, 40.4168],
        intro: 'Madrid is the capital and most populous city of Spain. The city has almost 3.4 million inhabitants.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg/536px-Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg'
    },
    {
        city: 'Rome',
        coordinates: [12.4964, 41.9028],
        intro: 'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome Capital.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Rome_skyline_panorama.jpg/556px-Rome_skyline_panorama.jpg'
    },
    {
        city: 'Santo Domingo',
        coordinates: [-69.9312, 18.4861],
        intro: 'Santo Domingo, once known as Santo Domingo de Guzmán, is the capital and largest city of the Dominican Republic.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Santo_Domingo_montage.JPG'
    },
    {
        city: 'Tokyo',
        coordinates: [139.6917, 35.6895],
        intro: 'Tokyo, officially the Tokyo Metropolis, is the capital of Japan and one of the most populous cities in the world.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/576px-Skyscrapers_of_Shinjuku_2009_January.jpg'
    },


];

map.on('load', function () {
    sisterCities.forEach(city => {
        // Define source and layer for lines
        map.addSource(`${city.city}-line`, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [-74.0060, 40.7128], // New York City coordinates
                        city.coordinates // Sister city coordinates
                    ]
                }
            }
        });

        map.addLayer({
            'id': `${city.city}-line`,
            'type': 'line',
            'source': `${city.city}-line`,
            'layout': {},
            'paint': {
                'line-width': 2,
                'line-color': '#FF5733'
            }
        });

        // Add markers and popups for each city
        const popupContent = `
        <div class="popup-content">
            <h3>${city.city}</h3>
            <p>${city.intro}</p>
            <img src="${city.pic}" alt="Image of ${city.city}">
        </div>
    `;

        new mapboxgl.Marker()
            .setLngLat(city.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(popupContent))
            .addTo(map);
    });
});