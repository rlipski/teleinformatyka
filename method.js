$(document).ready(function(){
    
   $("#btnGeneruj").click(function(){
    generateRadnomCode();
   });

   $('#btnKoduj').click(function(){
        let dane = $('#inputDane').val();
       if(checkAmount(dane)){
        //    console.log('dobre dane');
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
})