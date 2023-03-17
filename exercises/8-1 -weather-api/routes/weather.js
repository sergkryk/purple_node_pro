import axios from "axios";

export default async function router(req, res, next) {
  const city = req.query.city;
  console.log(city);
  if (!city) {
    res.json({message: "Укажите город в запросе"});
  }
  const cityInfo = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.WEATHER_API_KEY}`);
  console.log(cityInfo);
  res.json({ message: city });
}
