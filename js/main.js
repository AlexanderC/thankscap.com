$().ready(function(){
    $(".main").onepage_scroll({
        sectionContainer: "section",
        responsiveFallback: 600,
        loop: true
    });

    var author = $(".author-details > a");

    var authorName = getParameterByName("n");
    var authorEmail = getParameterByName("e");

    if(authorEmail && authorName) {
        author.attr("href", "mailto:" + authorEmail + "?subject=Hi%20" + encodeURIComponent(authorName) + ",%20Captain%20Obvious%20is%20mailing%20you!");
        author.text(authorName);
    }
});

/* some additional functionality */

function getParameterByName(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}