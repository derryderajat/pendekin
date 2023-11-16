const { ResponseTemplate } = require("../helper/Response.template");
const { findByusername } = require("../user/user.service");
const { verifyToken } = require("../utils/jwt");

const isAuthenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json(
        ResponseTemplate(null, "Unauthorized", "You're not authorized", false)
      );
  }

  // Using Bearer token, e.g., 'Bearer th1sIsatOKEN213'
  const token = authorization.slice(7);

  try {
    const verifiedToken = await verifyToken(token);
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(ResponseTemplate(null, "Unauthorized", "Invalid token", false));
  }
};

const isAuthorize = async (req, res, next) => {
  // take from auth
  const { username } = await req.user;
  // take from path

  const isUsernameSame = username === req.params.username;
  if (!isUsernameSame) {
    res
      .status(401)
      .json(
        ResponseTemplate(
          null,
          "Unauthorized",
          "you're not authenticated",
          false
        )
      );
    return;
  }
  next();
};
const isUserAvail = async (req, res, next) => {
  const isUserExist = await findByusername(req.params.username);

  if (!isUserExist) {
    res
      .status(404)
      .json(ResponseTemplate(null, "Not Found", "user is not found", false));
    return;
  }
  next();
};

//   const isCurrentPassCorrect = async (req, res, next) => {
//     //
//     const { current_password } = req.body;
//     const saltRounds = SALT_ROUNDS;

//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(current_password, salt);

//     const user = await prisma.users.findUnique({
//       where: { username: req.params.username },
//     });
//     let isPasswordCorrect = await bcrypt.compare(current_password, user.password);
//     console.log(isPasswordCorrect);
//     if (!isPasswordCorrect) {
//       res
//         .status(400)
//         .json(
//           ResponseTemplate(null, "Bad Request", "Password is incorrect", false)
//         );
//       return;
//     }
//     next();
//   };
module.exports = {
  isAuthenticate,
  isAuthorize,
  isUserAvail,
  // isCurrentPassCorrect,
};
