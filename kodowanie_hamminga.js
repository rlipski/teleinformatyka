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

function viewCode(code){
    
    let strign ='';
    for(let i=0; i<code.length;i++){
        strign +=code[i];
    }
    $('#daneZakodowane').text(strign);
}