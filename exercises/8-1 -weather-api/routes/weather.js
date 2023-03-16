export default async function router(req, res, next) {
  console.log(req);
  res.json({message: "Hello"});
}
