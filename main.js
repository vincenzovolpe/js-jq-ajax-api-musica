$(document).ready(function(){
  // Recupero l'html del template quadratino
  var template_html = $('#template-disco').html();
  // Compilo l'html con la funzione di handlebars
  var template_function = Handlebars.compile(template_html);
  // Chiamata ajax per recuperare i dischi da visualizzare
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/array/music',
        method: 'GET',
        success: function(data) {
            // Recupero l'array che contiene tutti i dischi
            var dischi = data.response;
            // Ciclo tutti i dischi
            for (var i = 0; i < dischi.length; i++) {
                // Per ogni disco, recupero le informazioni e le metto nelle variabili di handlebars
                var variabili = {
                    genere: dischi[i].genre,
                    copertina: dischi[i].poster,
                    titolo: dischi[i].title,
                    artista: dischi[i].author,
                    anno: dischi[i].year
                }
                // Creo il template
                var html = template_function(variabili);
                // Lo appendo al contenitore dei dischi
                $('#dischi').append(html);
                // Altezza div immagine imgcopertina
                // Setto l'altezza del div immagine copertina uguale alla larghezza
                  var altezzacopertina = $('.imgcopertina').width();
                  console.log(altezzacopertina);
                  $('.imgcopertina').height(altezzacopertina);

            }
        },
        error: function() {
            alert('Error')
        }
    });

    // BONUS:Tendina per selezionareil genere
    $('#scelta-genere').change(function(){
        // Recupero il genere selezionato dall'utente
        var genere_selezionato = $('#scelta-genere').val();
        if (genere_selezionato == '') {
            $('.disco').fadeIn();
        } else {
            // Per ogni disco verifico se il suo genere corrispnde al genere genere_selezionato
            $('.disco').each(function() {
                var genere_disco = $(this).attr('data-genere');
                // Se il genere del disco è uguale  al genere selezionato lo mostro
                if (genere_disco.toLowerCase()  == genere_selezionato.toLowerCase()) {
                    $(this).fadeIn();
                } else {
                    $(this).fadeOut();
                }
            });
        }
    });
});
