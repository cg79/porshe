import cookie from "cookie";

export default (req: any, res: any) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("porsche_user", req.body.porsche_user, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
