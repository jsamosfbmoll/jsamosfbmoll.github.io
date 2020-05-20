function pintarTablaCanal(feed) {
    var taulaCanal = $("#taula-canal");
    taulaCanal.append(
        "<td>" + feed.title + "</td>" +
        "<td>" + feed.description + "</td>" +
        "<td><a href='" + feed.link + "' class='badge badge-success' target='_blank'>El País</a></td>"
    );
}

function anadirMultimedia(contenido, tipo) {
    var resultado = "<td>";
    if (tipo.substr(0, 5) === "video") {
        resultado += "<video width='320' height='240' controls>" +
        "<source src='" + contenido + "' type='" + tipo + "'>El teu navegador no soporta video</video>"
    } else if (tipo.substr(0, 5) === "image") {
        resultado += "<img src='" + contenido + "' width='100%' heigth='100%' alt='Imatge no disponible'/>"
    }
    resultado += "</td>"
    return resultado;
}

function pintarTablaItems(items) {
    var contenido = "";
    $.each(items, function(index, item) {
        contenido += "<tr><td>" + item.title + "</td>" +
                     "<td>" + item.content + "</td>" +
                     anadirMultimedia(item.enclosure.link, item.enclosure.type) +
                     "<td>" + item.pubDate + "</td>" +
                     "<td><a href='" + item.link + "' class='badge badge-info'>Notícia</a></td></tr>";
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