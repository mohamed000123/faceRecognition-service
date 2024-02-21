import { User } from "../models/user.js";
import path from "path";
import { promises as fsPromises } from "fs";

export const addUser = async (req, res) => {
  try {
    const { name, job } = req.query;
    const pictures = req.files;
    // Create a new folder with the user's name
    const userFolderPath = path.join(process.cwd(), "public/uploads", name);
    await fsPromises.mkdir(userFolderPath, { recursive: true });
    // Process and save each uploaded file to the user's folder
    for (let i = 0; i < pictures.length; i++) {
      const newFilePath = path.join(userFolderPath, `${i + 1}.jpg`);
      await fsPromises.rename(pictures[i].path, newFilePath);
    }
    const user = await User.create({ name, job });
    user.picture1 = `/uploads/${name}/1.jpg`;
    user.picture2 = `/uploads/${name}/2.jpg`;
    user.picture3 = `/uploads/${name}/3.jpg`;
    await user.save();
    res
      .status(200)
      .json({ message: "user was added successfully", success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal setver error", success: false });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch {
    res.status(500).json("internal Server Error");
  }
};
