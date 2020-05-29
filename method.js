$(document).ready(function(){

   $("#btnGeneruj").click(function(){
    generateRadnomCode();
   });

   $('#btnKoduj').click(function(){
        let dane = $('#inputDane').val();
        var metoda;
       if(checkAmount(dane)){

        dane= stringToArray(dane);
        $('.asd a').each(function(){
            if($(this).hasClass('active'))
            metoda=$(this).attr('id');
        });
        switch(metoda) {
            case 'kontrola':
                kontrolaParzystosci(dane)
              break;
            case 'hamming':
                kodowanieHamminga(dane)
              break;
            case 'crc12':
                var crc_12 = new Crc('12');
                crc_12.crc(dane)
              break;
            case 'crc16':
                var crc_16 = new Crc('16');
                crc_16.crc(dane)
              break;
            case 'crc32':
                var crc_32 = new Crc('32');
                crc_32.crc(dane)
              break;
            case 'crcSDLC':
                var crc_sdlc = new Crc('SDLC');
                crc_sdlc.crc(dane)
              break;
            default:
              // code block
          }
       }
   });

   $('#btnDekoduj').click(function(){

    let dane = $('#inputDane').val();
    let daneZakodowane = $('#daneZakodowane').text();

        var metoda;
       if($('#daneZakodowane').text()!=''){

            daneZakodowane=stringToArray(daneZakodowane);
            dane= stringToArray(dane);
            $('.asd a').each(function(){
                if($(this).hasClass('active'))
                metoda=$(this).attr('id');
            });
            switch(metoda) {
                case 'kontrola':
                    fixKontrolaParzystosci(daneZakodowane)
                break;
                case 'hamming':
                    fixKodowanieHamminga(daneZakodowane)
                break;
                case 'crc12':
                    var crc_12 = new Crc('12');
                    crc_12.fixCRC(daneZakodowane)
                    break;
                case 'crc16':
                    var crc_16 = new Crc('16');
                    crc_16.fixCRC(daneZakodowane)
                    break;
                case 'crc32':
                    var crc_32 = new Crc('32');
                    crc_32.fixCRC(daneZakodowane)
                    break;
                case 'crcSDLC':
                    var crc_sdlc = new Crc('SDLC');
                    crc_sdlc.fixCRC(daneZakodowane)
                default:
                // code block
            }

            switch(metoda) {
                case 'kontrola':
                    dekodujKontrolaParzystosci(daneZakodowane)
                break;
                case 'hamming':
                    dekodujKodowanieHamminga(daneZakodowane)
                break;
                case 'crc12':
                    var crc_12 = new Crc('12');
                    crc_12.decodeCRC(daneZakodowane)
                    break;
                case 'crc16':
                    var crc_16 = new Crc('16');
                    crc_16.decodeCRC(daneZakodowane)
                    break;
                case 'crc32':
                    var crc_32 = new Crc('32');
                    crc_32.decodeCRC(daneZakodowane)
                    break;
                case 'crcSDLC':
                    var crc_sdlc = new Crc('SDLC');
                    crc_sdlc.decodeCRC(daneZakodowane)
                break;
                default:
                // code block
            }
       }
   });

   $('#btnZak').click(function(){
     let ileZaklocen = $('#inputZak').val();
     let dane = $('#daneZakodowane1').text();

     dane = stringToArray(dane);
     dane2 = stringToArray(dane);
     ile=0;
     while(ile<ileZaklocen){
        position = Math.floor((Math.random() * dane.length));
        if(dane[position]===dane2[position]){
            if(dane[position]===1){
                dane[position]=0;
            }else{
                dane[position]=1;
            }
            ile++;
            //console.log(ile)
        }
     }

     $('#daneZakodowane').text(dane.join(''));
     $('#danePoKorekcji').text('');
     $('#daneWyjściowe').text('');
   })

   /*Funkcja generuję ranodomowy ciąg bitów i wpisuje do inputa*/
    function generateRadnomCode(){
        let amount = $('#inputIle').val();
        let string ='';
        for(let i=0; i<amount; i++){
            string += Math.round(Math.random());
        }
        $('#inputDane').val(string);
    }

     /*Funkcja sprawdza czy wpisano  0 lub 1 do inputa oraz czy ilość bitów jest podzielna przez 8*/
    function checkAmount(dane){
        dane=[...dane];
        dane.forEach(element => {
            if(element != '0' && element != '1' ){
                alert("Wprowadz 0 lub 1")
                return false;
            }
        });
        if( !Number.isInteger(dane.length/8)){
            alert("Liczba powinna być podzielna przez 8")
            return false;
        }
        return true;
    }

    /*Zamaina stringów na tablice int*/
    function stringToArray(string) {
        var dane = new Array(string.length);

        for(var i=0; i<string.length; i++) {
            dane[i] = parseInt(string[i]);
        }

        return dane;
    }

})