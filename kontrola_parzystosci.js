function kontrolaParzystosci(dane){
    $("#btnZakloc").click(function(){
        distorion();
       });
    var liczba_bitow = dane.length;
    var stringZakodowany="";
    var liczba_bajtow = liczba_bitow/8;
    liczba_bitow += 1;

    zakodowane = new Array(liczba_bitow);
    typ = new Array(liczba_bitow);
    initTypes();

    var ileJedynek;

    for(var i=0; i<liczba_bajtow; i++) {
        ileJedynek=0;
        for (var j=0; j<8; j++)
        {
            zakodowane[i*9+j+1]=dane[i*8+j];
            ileJedynek+=dane[i*8+j];         
        }
        if (ileJedynek%2===1) zakodowane[i*9]=1; 
        else zakodowane[i*9]=0;
    }
    $.each( zakodowane, function( key, value ) {
        
        stringZakodowany+=value
      });
    $('#daneZakodowane').text(stringZakodowany)
    $('#daneZakodowane1').text(stringZakodowany)

}
function initTypes() {
    for(var i = 0; i < typ.length; i++)
        typ[i] = 0;
}
