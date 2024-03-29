"use strict";
const HomeBtn = document.getElementById("home");
const briefBtn = document.getElementById("briefs");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("tech");
const scienceBtn = document.getElementById("science");
const healthBtn = document.getElementById("health");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

var newsDataArr = [];

const headlines = "https://saurav.tech/NewsAPI/everything/cnn.json";
const briefs = "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json";
const business = "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json";
const sports = "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json";
const entertainment = "https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json";
const tech = "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json";
const science = "https://saurav.tech/NewsAPI/top-headlines/category/science/in.json";
const health = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
const search = "https://newsapi.org/v2/everything?q=";
const key = "fce439fa9fed46748e51e2640efd0e20"

window.onload = function() {
    newsType.innerHTML="<h4><span class = text-warning>Headlines Today</span></h4>";
    fetchHeadlines();
};


HomeBtn.addEventListener("click",function(){
    window.onload();
});


briefBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Briefs News</span></h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Business News</span></h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Sports</span></h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Entertainment</span></h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Technology</span></h4>";
    fetchTechnologyNews();
});

healthBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Health & Fitness</span></h4>";
    fetchHealthNews();
});
scienceBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Science News</span></h4>";
    fetchScienceNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4><span class = text-warning>Search result : "+newsQuery.value+"</span></h4>";
    fetchQueryNews();
});


const fetchSportsNews = async () => {
    const response = await fetch(sports);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(tech);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(search+encodeURIComponent(newsQuery.value)+"&apiKey="+key);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>Works only on localhost</h5>"
        return;
    }

    displayNews();
}

const fetchScienceNews = async () => {
    const response = await fetch(science);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchHealthNews = async () => {
    const response = await fetch(health);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","auto");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-danger";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-danger"
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="<span class = text-white>Read more</span>";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}