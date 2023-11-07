import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://icanhazdadjoke.com/";

const config = {
    headers: {
        Accept: "application/json",
    }
};

let score1 = 0, score2 = 0;

function resetScore() {
    score1 = 0;
    score2 = 0;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get ("/", async (req, res)=>{

    const resp1 = await axios.get (API_URL, config);
    const resp2 = await axios.get (API_URL, config);

    res.render("index.ejs", {dadjoke1: resp1.data.joke, dadjoke2 :resp2.data.joke, dad1score: score1, dad2score: score2});
});

app.post ("/game", async (req,res) => {

    const {winner} = req.body;

    if (winner === "dad1") {
        score1++;
    } else if (winner === "dad2") {
        score2++;
    }

    if(score1 == 5) {
        resetScore ();
        res.render("winner.ejs", {winner: "dad1"});
    } else if (score2 == 5) {
        resetScore ();
        res.render("winner.ejs", {winner: "dad2"});
    }else {
        res.redirect("/");
    }
});

app.listen (port, ()=>{
    console.log("Listening on port "+port);
});