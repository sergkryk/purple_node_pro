import axios from "axios";

export default async function router(req, res, next) {
  try {
    const city = req.query.city;
    if (!city) {
      throw new Error("Укажите город в запросе");
    }
    const { data: coordinates } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.WEATHER_API_KEY}`
    );
    if (!coordinates[0]?.lat || !coordinates[0]?.lon) {
      throw new Error("Не удалось найти указанный город");
    }
    const { data: weather } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]?.lat}&lon=${coordinates[0]?.lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    if (!weather?.cod === 200) {
      throw new Error("Что-то пошло не так. Повторите запрос.");
    }
    res.json(weather);
  } catch (error) {
    res.json({ message: error.message });
  }
}
