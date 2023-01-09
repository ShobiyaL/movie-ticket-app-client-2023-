import Api from "../../common/apis/Api";

export async function getAllCities(setCities) {
    console.log('city 1');
    
    let data = await Api.get(`/public/cinema/filter/cities`);
    console.log(data.data);
    let cityArray = data.data.cities;
    console.log(cityArray);
    let cities = [''];

    for(let i=0;i<cityArray.length;i++) {
        if(!cities.includes(cityArray[i]['city'])) {
            cities.push(cityArray[i]['city']);
        }
   }
   console.log('city 2', cities);
   setCities(cities)
   return (cities);

}