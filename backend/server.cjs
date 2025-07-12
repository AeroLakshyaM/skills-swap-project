const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./localdb.sqlite");

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY,
    name TEXT,
    title TEXT,
    location TEXT,
    email TEXT,
    phone TEXT,
    joinDate TEXT,
    bio TEXT,
    avatar TEXT,
    coverImage TEXT,
    stats TEXT,
    skills TEXT,
    experience TEXT,
    projects TEXT,
    achievements TEXT,
    socialLinks TEXT
  )`);
  db.get("SELECT COUNT(*) as count FROM profile", (err, row) => {
    if (row.count === 0) {
      db.run(
        `INSERT INTO profile (
        id, name, title, location, email, phone, joinDate, bio, avatar, coverImage, stats, skills, experience, projects, achievements, socialLinks
      ) VALUES (
        1, "Your Name", "Your Title", "Your Location", "your@email.com", "1234567890", "2023", "Your bio", "", "", ?, ?, ?, ?, ?, ?
      )`,
        [
          JSON.stringify({ projects: 0, followers: 0, following: 0, likes: 0 }),
          JSON.stringify({ design: [], development: [] }),
          JSON.stringify([]),
          JSON.stringify([]),
          JSON.stringify([]),
          JSON.stringify({
            github: "",
            linkedin: "",
            twitter: "",
            website: "",
          }),
        ]
      );
    }
  });
});

app.get("/", (req, res) => {
  res.send("Local database server is running!");
});

app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email });
    }
  );
});

app.get("/api/profile", (req, res) => {
  db.get("SELECT * FROM profile WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      row.stats = row.stats ? JSON.parse(row.stats) : {};
      row.skills = row.skills ? JSON.parse(row.skills) : {};
      row.experience = row.experience ? JSON.parse(row.experience) : [];
      row.projects = row.projects ? JSON.parse(row.projects) : [];
      row.achievements = row.achievements ? JSON.parse(row.achievements) : [];
      row.socialLinks = row.socialLinks ? JSON.parse(row.socialLinks) : {};
    }
    res.json(row);
  });
});

app.put("/api/profile", (req, res) => {
  const {
    name,
    title,
    location,
    email,
    phone,
    joinDate,
    bio,
    avatar,
    coverImage,
    stats,
    skills,
    experience,
    projects,
    achievements,
    socialLinks,
  } = req.body;
  db.run(
    `UPDATE profile SET name=?, title=?, location=?, email=?, phone=?, joinDate=?, bio=?, avatar=?, coverImage=?, stats=?, skills=?, experience=?, projects=?, achievements=?, socialLinks=? WHERE id=1`,
    [
      name,
      title,
      location,
      email,
      phone,
      joinDate,
      bio,
      avatar,
      coverImage,
      JSON.stringify(stats),
      JSON.stringify(skills),
      JSON.stringify(experience),
      JSON.stringify(projects),
      JSON.stringify(achievements),
      JSON.stringify(socialLinks),
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
