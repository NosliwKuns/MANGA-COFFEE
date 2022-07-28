import { Router } from "express";
import passport from "passport";
import User from "../../../models/Users/User.js";
import ReadTokenData from "../../../controles/Token/ReadTokenData/index";
const router = Router();

router.put("/state", passport.authenticate("jwt", { session: false }), async (req, res, next) =>{
    const { authorization } = req.headers;
    try {
      const data = ReadTokenData(authorization);
      await User.findByIdAndUpdate(data.id, { status: false });
      res.status(200).send("Accaunt deleted Successfully");
    } catch (err) {
      next(err);
    }
  }
);

export default router;
