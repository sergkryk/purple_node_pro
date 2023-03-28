import { Router } from "express"

const router = Router()

router.get("/", (req, res, next) => {
  console.log(req);
  next();
});

export default router;
