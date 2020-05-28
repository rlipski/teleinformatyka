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
            case 'crc':
                crc(dane)
              break;
            default:
              // code block
          }
       } 
   });

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