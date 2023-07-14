import express from "express";
import connection from "../config/connection.js";

const route = express.Router();

// insert user to the database(CREATE)
route.post("/add", async (req, res) => {
    const { username, location } = req.body;

    const [rows, fields] = await connection.query(`INSERT INTO users (username, location) VALUES(?,?)`, 
    [username, location]);
    res.status(200).json(rows);

});

// read user from database(READ)
route.get("/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
        connection.query(`SELECT * FROM users WHERE id=?`, [id], (err, results, fields) => {
            console.log(results);
            res.json(...results)
        })
    } else {
        res.json({ success: false, message: "User ID not provided" });
    }
});

// update users(UPDATE)
route.put("/update/:id", (req, res) => {
    const { id } = req.params;

    if (id) {
        const { username, location } = req.body;
        connection.query(`UPDATE users SET username=?, location= ? WHERE id = ?`, [username, location, id],
            (err, results, fields) => {
                console.log(results);
                if (results.affectedRows === 1) {
                    res.status(200).json({ success: true, message: "User Updated" });
                } else {
                    res.status(200).json({ success: false, message: "Unable to update the user" });
                }
            });
    } else {
        res.json({ success: false, message: "User ID not provided" });
    }
});

// Delete user(DELETE)
route.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
        connection.query(`DELETE FROM users WHERE id = ?`, [id], (err, results, fields) => {
            console.log(results);
            if (results.affectedRows) {
                res.status(200).json({ success: true, message: "User deleted successfully!!!" });
            } else {
                res.status(200).json({ success: false, message: "Cannot delete the user" });
            }
        })
    } else {
        res.status(403).json({ success: false, message: "User ID not provided" });
    }
});

export default route;