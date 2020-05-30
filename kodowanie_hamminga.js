function kodowanieHamminga(dane){
    var bits_number = dane.length;
    var i = 0, redundancy = 0, sum = 0;
    console.log(dane);
    while(i < bits_number) {
        if(Math.pow(2,redundancy) - 1 == sum)
            redundancy++;
        else
            i++;
        sum++;
    }
    
    coded_data = new Array(sum);
    type = new Array(sum);
    
    var mask = 0;
    redundancy = 0;
    var d = 0;
    i = 0;
    sum = 0;
    
    while (i < bits_number) {
        if (Math.pow(2,redundancy) - 1 == sum) 
            redundancy++;
        else {
            coded_data[sum]=dane[i];
            if (dane[i]==1) mask ^= sum+1;
            i++;
        }
        sum++;
    }
    
    redundancy = 0;
    for (var i = 0; i < sum; i++) {
        if (Math.pow(2,redundancy) - 1 == i) {
                if ((mask & (1 << redundancy))==0) 
                    coded_data[i]=0;
                else 
                    coded_data[i]=1;
                redundancy++;
        }
    }
    console.log(coded_data);
    viewCode(coded_data);
    return coded_data;
    
}

function dekodujKodowanieHamminga(coded_data){
    var n = coded_data.length;
    var d = 0;
    var redundancy = 0;
   
    for (var i = 0; i < n; i++)	
    {
        if (Math.pow(2,redundancy) - 1 != i) 
            d++;
        else 
            redundancy++;
    }
    
    dane = new Array(d);
    d = 0;
    redundancy = 0;
    
    for (var i=0; i < n; i++)
    {
        if (Math.pow(2,redundancy) - 1 != i)
        {
                dane[d] = coded_data[i];
                d++;
        }
        else redundancy++;
    }
    $('#daneWyjściowe').text(dane.join(''));
}

function fixKodowanieHamminga(coded_data){
    var n = coded_data.length;
    decoded_data = new Array(n);
    var d = 0;
    var redundancy = 0;
    errors = 0;
    
    
    decoded_data = coded_data.slice(); // oddziel dwa źródła danych
    for (var i = 0; i < n; i++)
    {
        if (Math.pow(2,redundancy)-1 != i) 
            d++;
        else 
            redundancy++;
    }
    
    dane = new Array(d);
		
    var mask = 0;
    d = 0;
    redundancy = 0;
    
    for (var i = 0; i < n; i++) {
        // kontrola poprawności
        if (decoded_data[i] == 1) 
            mask ^= i+1;

        // określanie typu bitów
        if (Math.pow(2,redundancy)-1 != i)
        {
            d++;
            type[i]=0;
        }
        else
        {
            type[i]=3;
            redundancy++;
        }
    }
    
    if (mask != 0)  // wystąpił błąd
    {
        errors++;
        var nr = mask - 1;

        if (nr < decoded_data.length)
        {
                if (type[nr]==0) 
                    type[nr]=1;	// korekcja
                else if (type[nr]==3) 
                    type[nr]=4;	// korekcja

                if (decoded_data[nr]==1) 
                    decoded_data[nr]=0;
                else 
                    decoded_data[nr]=1;
        }
    }
    $('#danePoKorekcji').text(decoded_data.join(''));

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
    $('#bledyWykryteBity').text(errors)
    $('#bledyniewykryte').text(nZamienionych-errors)
    var fixed = 0;
    for (var i = 0; i < type.length; i++)
    {
            if (type[i]===1 || type[i]===4) fixed++;
    }
    $('#bledyskorygowane').text(fixed)
}


function viewCode(code){
    
    let strign ='';
    for(let i=0; i<code.length;i++){
        strign +=code[i];
    }
    $('#daneZakodowane').text(strign);
    $('#daneZakodowane1').text(strign);
}