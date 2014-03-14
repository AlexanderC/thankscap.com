$().ready(function(){
    var cont = $(".main");

    cont.onepage_scroll({
        sectionContainer: "section",
        responsiveFallback: 600,
        loop: true
    });

    var author = $(".author-details > a");
    var hash = window.location.hash || false;
    var plainUrl = hash ? document.URL.replace(/#.*$/, "") : document.URL;

    if(hash) {
        hash = hash.replace("#", "");

        try {
            var data = JSON.parse($.base64.decode(hash));
        } catch(e){
            var data = false;
        }

        if(data && data.name && data.email) {
            fillAuthor(author, data);
        }
    }

    // bind form submit
    $("form.personalize-form").unbind("submit");
    $("form.personalize-form").submit(function(e) {
        e.preventDefault();

        var form = $(this);

        var data = {
            name: form.find("input[name='name']").val(),
            email: form.find("input[name='email']").val()
        };

        var newHash = $.base64.encode(JSON.stringify(data));
        var newUrl = plainUrl + "#" + newHash;

        window.history.replaceState('Object', 'Title', newUrl);

        fillAuthor(author, data);

        // move to first page
        cont.moveTo(1);

        // show arrow that indicated to the status bar
        var arrow = $("div.arrow");
        arrow.fadeIn("slow", function() {
            $(this).delay(5400).fadeOut("fast");
        });

        return false;
    });
});

/* some additional functionality */

function fillAuthor(author, data)
{
    author.attr("href", "mailto:" + data.email + "?body=[Referred%20from%20" + (encodeURIComponent(document.referrer) || "UNKNOWN") + "]&subject=Hi%20" + encodeURIComponent(data.name) + ",%20Captain%20Obvious%20is%20mailing%20you!");
    author.text(data.name);
}