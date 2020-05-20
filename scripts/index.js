/*
Esta función añade las columnas a la tabla que contiene información sobre el canal RSS
*/
function pintarTablaCanal(feed) {
    var taulaCanal = $("#taula-canal");
    taulaCanal.append(
        "<td>" + feed.title + "</td>" +
        "<td>" + feed.description + "</td>" +
        "<td><a href='" + feed.link + "' class='badge badge-success' target='_blank'>El País</a></td>"
    );
}

/*
Esta función comprueba si el contenido multimedia es
un video o una imagen si le aplica la etiqueta que
corresponda
*/
function anadirMultimedia(contenido, tipo) {
    var resultado = "<td>";

    /*
    Tipo contiene este tipo de valores video/mp4 o image/jpg
    de manera que las primeras 5 letras indican el tipo
    */
    if (tipo.substr(0, 5) === "video") {
        resultado += "<video width='320' height='240' controls>" +
            "<source src='" + contenido + "' type='" + tipo + "'>El teu navegador no soporta video</video>"
    } else if (tipo.substr(0, 5) === "image") {
        resultado += "<img src='" + contenido + "' width='100%' heigth='100%' alt='Imatge no disponible'/>"
    }
    resultado += "</td>"
    return resultado;
}

/*
Esta función añade las noticias a la tabla de noticias
parseando el json con el contenido
*/
function pintarTablaItems(items) {
    var contenido = "";
    $.each(items, function (index, item) {
        contenido += "<tr><td>" + item.title + "</td>" +
            "<td>" + item.content + "</td>" +
            anadirMultimedia(item.enclosure.link, item.enclosure.type) +
            "<td>" + item.pubDate + "</td>" +
            "<td><a href='" + item.link + "' class='badge badge-info'>Notícia</a></td></tr>";
    });

    $("#taula-noticia").append(contenido);
}

/*
Esta función llama a las funciones que dibujan las tablas
para poder separar las responsabilidades
*/
function pintarTablas(data) {
    pintarTablaCanal(data.feed);
    pintarTablaItems(data.items);
}

/*
Esta función hace la petición ajax a una api que convierte los xml
de los canales RSS en json para que asi sea más fácil de trabajar con el,
aunque solo permite hasta 10 items del canal RSS, por eso solo se muestran
10 noticias máximo

Este es el canal RSS original: https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada
*/
function hacerPeticionRSS() {
    $.ajax({
        url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.elpais.com%2Fmrss-s%2Fpages%2Fep%2Fsite%2Felpais.com%2Fportada", success: pintarTablas
    });
}

//Esta linia llama a la función cuando la página ha cargado completamente
$(document).ready(hacerPeticionRSS);