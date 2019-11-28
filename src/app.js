const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app =  express();
const port = process.env.PORT || 1557;

//Define paths for express config
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(public));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Angel Reyes"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Angel Reyes"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "This is an example message!",
        title: "Help page",
        name: "Angel Reyes"

    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
         if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error});
            }
            
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });    
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Angel Reyes",
        message: "Help article not found"     
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Angel Reyes",
        message: "Page not found"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});

