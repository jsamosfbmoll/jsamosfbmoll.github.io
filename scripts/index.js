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
        let multimedia = "<td><p>No hi ha multimedia</p></td>";
        if (typeof item.media != "undefined") {
            multimedia = anadirMultimedia(item.media.link, item.media.type);
        }
        contenido += "<tr><td>" + item.title + "</td>" +
            "<td>" + item.content + "</td>" +
            multimedia +
            "<td>" + item.pubDate + "</td>" +
            "<td><a href='" + item.link + "' class='badge badge-info'>Notícia</a></td></tr>";
    });

    $("#taula-noticia").append(contenido);
}

/*
Aquesta funció crea un JSON amb els valors amb la informació del canal RSS
*/
function crearJsonCanal(data) {
    let channel = data.getElementsByTagName("channel")[0];
    console.log(channel.getElementsByTagName("title")[0].childNodes[0].nodeValue);
    let feed = {
        "title": channel.getElementsByTagName("title")[0].childNodes[0].nodeValue,
        "description": channel.getElementsByTagName("description")[0].childNodes[0].nodeValue,
        "link": channel.getElementsByTagName("link")[0].childNodes[0].nodeValue
    };

    return feed;
}

/*
Aquesta funció crea un JSON amb els valors de items del XML
*/
function crearJsonItems(data) {
    let channel = data.getElementsByTagName("channel")[0];
    let items = [];
    let itemsXML = channel.getElementsByTagName("item");
    $.each(itemsXML, function(index, item) {
        let itemObjeto = {};
        itemObjeto.title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        itemObjeto.link = item.getElementsByTagName("link")[0].childNodes[0].nodeValue;
        itemObjeto.content = item.getElementsByTagName("content:encoded")[0].childNodes[0].nodeValue;
        itemObjeto.pubDate = item.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
        if (typeof item.getElementsByTagName("media:content")[0] != "undefined") {
            itemObjeto.media = {
                "link": item.getElementsByTagName("media:content")[0].getAttribute("url"),
                "type": item.getElementsByTagName("media:content")[0].getAttribute("type")
            };
        }

        items.push(itemObjeto);
    });
    console.log(items[1]);
    return items;
}

/*
Esta función llama a las funciones que dibujan las tablas
para poder separar las responsabilidades
*/
function pintarTablas(data) {
    let feed = crearJsonCanal(data);
    let items = crearJsonItems(data);

    pintarTablaCanal(feed);
    pintarTablaItems(items);
}

/*
Esta función hace la petición ajax a una api que convierte los xml
de los canales RSS en json para que asi sea más fácil de trabajar con el,
aunque solo permite hasta 10 items del canal RSS, por eso solo se muestran
10 noticias máximo

Este es el canal RSS original: https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada
*/
function hacerPeticionRSS() {
    /*$.ajax({
        url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.elpais.com%2Fmrss-s%2Fpages%2Fep%2Fsite%2Felpais.com%2Fportada", success: pintarTablas
    });*/

    $.ajax({
        url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada", success: pintarTablas
    });
}

//Esta linia llama a la función cuando la página ha cargado completamente
$(document).ready(hacerPeticionRSS);