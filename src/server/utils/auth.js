const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.json({ data: "Account created" });
  } catch (e) {
    console.error(e);

    res.json({ error: "Unable to process account request", data: "" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const confirmedUser = await prisma.user.findUser({
    where: {
      username,
    },
  });

  if (!confirmedUser) {
    return res.status(401).json({ error: "Invalid usename or password", data: null });
  }

  const passwordsMatch = await bcrypt.compare(password, confirmedUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid usename or password", data: null });
  }
  
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  
  res.json({ data: token })
};
module.exports = {
    register,
    login
};
