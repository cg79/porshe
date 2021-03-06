import cookie from "cookie";

export default (req: any, res:any) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("porsche_user", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
