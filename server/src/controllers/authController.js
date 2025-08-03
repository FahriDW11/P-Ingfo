import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function getUserToken(req, res) {
  const user = await User.findOne({ nim: req.body.username });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, "SECRET_KEY");
  res.json({ token, userStatus: user.status });
}

export async function addUser(req, res) {
  try {
    const { name, nim, email, phone, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      nim,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
}
