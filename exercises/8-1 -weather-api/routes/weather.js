export default async function router(req, res, next) {
  const city = req.query.city || 'Not specified';
  res.json({message: city});
}
