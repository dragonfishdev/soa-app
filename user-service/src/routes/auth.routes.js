const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const { User } = require("../models");

const router = Router();

router.post(
  "/register",
  [
    check("userName", "Имя пользователя не должно быть пустым").not().isEmpty(),
    check("email").isEmail(),
  ],
  async (req, res) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          errors: validationErrors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { userName, email } = req.body;

      const candidate = await User.findOne({
        where: {
          [Op.or]: {
            email,
            userName,
          },
        },
      });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      const password = "test";

      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({ userName, email, password: hashedPassword });

      await fetch("https://jjx8dy-5001.preview.csb.app/mail/send", {
        method: "POST",
        body: {
          to: email,
          subject: "Вам предоставлен доступк системе MyTasks",
          body: {
            html: `Ваши учетные данные были зарегистированы в системе MyTasks.\n
            Для входа используйте следующий пароль: ${password}`,
          },
        },
      });

      res.status(201).json({
        message: `Пользователь создан, данные для входа были высланы по адресу ${email}`,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Неверный логин").isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" });
      }

      const { id, userName, role } = user;

      const token = jwt.sign(
        { user: { id, userName, role } },
        process.env.JWT_SECRET
      );

      res.json({ token, user: { id, userName, role } });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
