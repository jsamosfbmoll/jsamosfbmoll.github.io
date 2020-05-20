function pintarTablaCanal(feed) {
    var taulaCanal = $("#taula-canal");
    taulaCanal.append(
        "<td>" + feed.title + "</td>" +
        "<td>" + feed.description + "</td>" +
        "<td><a href='" + feed.link + "' class='badge badge-success' target='_blank'>El País</a></td>"
    );
}

function pintarTablaItems(items) {
    var contenido = "";
    $.each(items, function(index, item) {
        contenido += "<tr><td>" + item.title + "</td>" +
                     "<td>" + item.content + "</td>" +
                     "<td><img src='" + item.enclosure.link + "' width='100%' heigth='100%' alt='No hi ha Imatge'/></td>" +
                     "<td>" + item.pubDate + "</td>" +
                     "<td><a href='" + item.link + "' class='badge badge-info'>Aqui</a></td></tr>";
    });

    $("#taula-noticia").append(contenido);
}

function pintarTablas(data) {
    pintarTablaCanal(data.feed);
    pintarTablaItems(data.items);
}

function hacerPeticionRSS() {
    $.ajax({
        url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.elpais.com%2Fmrss-s%2Fpages%2Fep%2Fsite%2Felpais.com%2Fportada", success: pintarTablas
    });
}


$(document).ready(hacerPeticionRSS);