function kontrolaParzystosci(dane){

    var liczba_bitow = dane.length;
    var stringZakodowany="";
    var liczba_bajtow = liczba_bitow/8;
    liczba_bitow += 1;

    zakodowane = new Array(liczba_bitow);
    type = new Array(liczba_bitow);
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


function dekodujKontrolaParzystosci(coded_data) {
    var n = coded_data.length;
    var bytes = n/9;
    dane = new Array(bytes*8);
    var ileJedynek;
    errors=0;
    for (var i=0; i<bytes; i++) {
        ileJedynek=0;
        for (var j=0; j<8; j++) {
            dane[i*8+j] = coded_data[i*9+j+1];
            ileJedynek+=coded_data[i*9+j+1];
        }
        ileJedynek+=coded_data[i*9];	// bit parzystości
        if (ileJedynek%2==0) {	// nie wykryto błędów
            type[i*9]=3;				// zaznacz poprawny bit kontrolny
            for (var j=1; j<9; j++) type[i*9+j]=0;	// zaznacz poprawne bity danych
        }
        else	// wystąpiły błędy
        {
            errors++;
            type[i*9]=5;    // zaznacz niepewny bit kontrolny
            for (var j=1; j<9; j++) type[i*9+j]=2;	// zaznacz niepewne bity danych
        }
    }
    console.log(dane);
    $('#daneWyjściowe').text(dane.join(''));
    $('#bledyWykryteBity').text(errors)
    $('#bledyniewykryte').text(nZamienionych-errors)
    var fixed = 0;
    for (var i = 0; i < type.length; i++)
    {
            if (type[i]===1 || type[i]===4) fixed++;
    }
    $('#bledyskorygowane').text(fixed)
}

function fixKontrolaParzystosci(decoded_data) {
    var n = decoded_data.length;
    initTypes(); // zainicjuj tablicę rodzajów bitów
    var bytes = n/9;
    errors = 0;
    var ileJedynek;
    
    for (var i = 0; i < bytes; i++) {
        ileJedynek = 0;
        
        for(var j = 0; j < 8; j++) {
            ileJedynek += decoded_data[i*9+j+1];  // policz "1"
        }
        ileJedynek+=decoded_data[i*9];	// bit parzystości
        if (ileJedynek%2===0)	// nie wykryto błędów
        {
                type[i*9]=3;				// zaznacz poprawny bit kontrolny
                for (var j=1; j<9; j++) type[i*9+j]=0;	// zaznacz poprawne bity danych
        }
        else	// wystąpiły błędy
        {
                errors++;
                type[i*9]=5;				// zaznacz niepewny bit kontrolny
                for (var j=1; j<9; j++) type[i*9+j]=2;	// zaznacz niepewne bity danych
        }
    }
    let html=''
    for(let i =0;i<decoded_data.length;i++){
        if(type[i]===0){
            html+='<span class="bg-success">'+decoded_data[i]+'</span>';
        }else if(type[i]===1){
            html+='<span class="bg-danger">'+decoded_data[i]+'</span>';
        }else if(type[i]===2){
            html+='<span class="bg-warning">'+decoded_data[i]+'</span>';
        }
        else if(type[i]===3){
            html+='<span class="bg-primary">'+decoded_data[i]+'</span>';
        }else if(type[i]===4){
            html+='<span class="bg-dark">'+decoded_data[i]+'</span>';
        }else if(type[i]===5){
            html+='<span class="bg-secondary">'+decoded_data[i]+'</span>';
        }

    }
    $('#danePoKorekcji').html(html);
    $('#przeslaneBity').text($('#inputDane').val().length)
}
function initTypes() {
    for(var i = 0; i < type.length; i++)
        type[i] = 0;
}