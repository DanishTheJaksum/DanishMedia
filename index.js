// Imports
const axios = require("axios").default;
const cheerio = require("cheerio");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
// Setting PORT to the .env PORT if available, if not then 3000
const PORT = process.env.PORT || 3000;
// Setting Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "\\public"));
// Using BodyParser to retrieve info from post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// make the public folder public/static
app.use(express.static(__dirname + "/public"));
// Options to get request
const options = {
  method: "GET",
  url: "",
  headers: {
    "Content-Type": "application/json",
  },
};

// endpoints

app.get("/", (req, res) => {
  options.url = "https://indianexpress.com/section/political-pulse/";
  res.render("index", { endpoint: "/getHomePage", title: "Politics" });
});

app.get("/whoami", (req, res) => {
  res.render("whoami");
});

app.get("/getSportsPage", (req, res) => {
  options.url = "https://indianexpress.com/section/sports/";
  res.render("index", { endpoint: "/getHomePage", title: "Sports" });
});

app.get("/getBusinessPage", (req, res) => {
  options.url = "https://indianexpress.com/section/business/";
  res.render("index", { endpoint: "/getHomePage", title: "Business" });
});

app.get("/getEntertainPage", (req, res) => {
  options.url = "https://indianexpress.com/section/entertainment/";
  res.render("index", { endpoint: "/getHomePage", title: "Entertainment" });
});

app.get("/getInternationalPage", (req, res) => {
  options.url = "https://indianexpress.com/section/world/";
  res.render("index", {
    endpoint: "/getInternationalNews",
    title: "International",
  });
});

app.get("/getHomePage", (req, res) => {
  axios
    .request(options)
    .then(function (response) {
      const page = response.data;
      const $ = cheerio.load(page);

      const hrefs = new Set();
      const images = [];
      const texts = [];

      $("div.articles a").each(function (index, element) {
        hrefs.add($(element).attr("href"));
      });

      $("div.articles img").each(function (index, element) {
        images.push($(element).attr("src"));
      });

      $("div.articles .title").each(function (index, element) {
        texts.push($(element).text());
      });
      const jsonObjects = {
        Hrefs: Array.from(hrefs),
        Images: images,
        Texts: texts,
      };

      res.json(jsonObjects);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

app.post("/article", (req, res) => {
  const options = {
    method: "GET",
    url: req.body.url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const page = response.data;
      const $ = cheerio.load(page);

      const text = $("div.full-details div#pcl-full-content");
      res.render("readnews", {
        content: text
          .text()
          .replace("Advertisement", "")
          .replace("Indian Express", "DanishMedia"),
        article_image: req.body.image_url,
      });
    })
    .catch(function (error) {
      res.send(400).send(error);
    });
});

app.get("/getInternationalNews", (req, res) => {
  axios
    .request(options)
    .then(function (response) {
      const page = response.data;
      const $ = cheerio.load(page);

      const hrefs = [];
      const images = [];
      const texts = [];

      $(
        "div.north-east-wrap.m-premium div.north-east-grid.explained-section-grid ul li"
      ).each(function (index, element) {
        const href = $(element).find("a").attr("href");
        const img = $(element).find("a figure img").attr("src");
        const text = $(element)
          .find("h3 a")
          .text()
          .replace("Advertisement", "")
          .replace("Indian Express", "DanishMedia");

        hrefs.push(href);
        images.push(img);
        texts.push(text);
      });

      const jsonObjects = {
        Hrefs: hrefs,
        Images: images,
        Texts: texts,
      };

      res.json(jsonObjects);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

// Starting Server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
