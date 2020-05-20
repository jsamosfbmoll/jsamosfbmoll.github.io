function pintarTablaCanal(feed) {
    var taulaCanal = $("#taula-canal");
    taulaCanal.append(
        "<td>" + feed.title + "</td>" +
        "<td>" + feed.description + "</td>" +
        "<td>" + feed.link + "</td>"
    );
}

function pintarTablas(data) {
    pintarTablaCanal(data.feed);
}

function hacerPeticionRSS() {
    $.ajax({
        url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.elpais.com%2Fmrss-s%2Fpages%2Fep%2Fsite%2Felpais.com%2Fportada", success: pintarTablas
    });
}


$(document).ready(hacerPeticionRSS);