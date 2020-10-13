import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "a",
    email: "a@a.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "b",
    email: "b@b.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
