import express from "express";
import connection from "../models/index.js";
import userModel from "../models/userModel.js";
import { Op } from "sequelize";

const route = express.Router();

// insert user to the database(CREATE)
route.post("/add", async (req, res) => {
    // const { username, location } = req.body;

    // const [rows, fields] = await connection.query(`INSERT INTO users (username, location) VALUES(?,?)`, 
    // [username, location]);
    // res.status(200).json(rows);

    // try {
        const data = await userModel.create(req.body);

        console.log(data);
        res.status(200).json(data);
    // } catch (err) {
    //     console.log(err);
    // }

});

// read user from database(READ)
route.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        // connection.query(`SELECT * FROM users WHERE id=?`, [id], (err, results, fields) => {
        //     console.log(results);
        //     res.json(...results)
        // })
        const data = await userModel.findByPk(id);
        console.log(data);
        if (data) {
            res.json(data);
        } else res.json([]);
    } else {
        res.json({ success: false, message: "User ID not provided" });
    }
});

// update users(UPDATE)
route.put("/update/:id", async(req, res) => {
    const { id } = req.params;

    if (id) {
        const { username, location } = req.body;
        // connection.query(`UPDATE users SET username=?, location= ? WHERE id = ?`, [username, location, id],
        //     (err, results, fields) => {
        //         console.log(results);
        //         if (results.affectedRows === 1) {
        //             res.status(200).json({ success: true, message: "User Updated" });
        //         } else {
        //             res.status(200).json({ success: false, message: "Unable to update the user" });
        //         }
        //     });
        const data = await userModel.update({
            username, location
        },{
            where: {
                id,
            }
        });
        console.log(data);
        if (data[0]) res.json({success: true, message: "User Updated"});
        else res.json({success: false, message: "Unable to update user"})
    } else {
        res.json({ success: false, message: "User ID not provided" });
    }
});

// Delete user(DELETE)
route.delete("/delete/:id", async(req, res) => {
    const { id } = req.params;
    if (id) {
        // connection.query(`DELETE FROM users WHERE id = ?`, [id], (err, results, fields) => {
        //     console.log(results);
        //     if (results.affectedRows) {
        //         res.status(200).json({ success: true, message: "User deleted successfully!!!" });
        //     } else {
        //         res.status(200).json({ success: false, message: "Cannot delete the user" });
        //     }
        // })
        const data = await userModel.destroy({
            where:{
                id,
            }
        });
        console.log(data);
        if (data) res.json({success: true, message: "User deleted successfully"});
        else res.json({success: false, message: "User cannot delete"});
    } else {
        res.status(403).json({ success: false, message: "User ID not provided" });
    }
});

// localhost:8000/user/search/by?location=ktm
route.get("/search/by", async(req,res) =>{
    const { location } = req.query;
    const data = await userModel.findAll({
        where:{
            location:{
                [Op.like]: `%${location}%`
            }
        }
    });
    console.log(data);
});

export default route;