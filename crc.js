class Crc {
    constructor(algorithm) {
        switch (algorithm) {
            case '12':
                this.klucz = 0x18005;
                this.keyLength = 12;
            break;
            case '16':
                this.klucz = 0x18005;
                this.keyLength = 16;
            break;
            case '32':
                this.klucz = 0x104C11DB7;
                this.keyLength = 32;
            break;
            case 'SDLC':
                this.klucz = 0x18005;
                this.keyLength = 16;
            break;
        }
    }

    // XOR
    xor(a, b) {
        if (a == b)
            return 0;
        else
            return 1;
    }

    // funkcja pomocnicza - inicjowanie tablicy zerami
    initTable(table) {
        for (var i = 0; i < table.length; i++)
            table[i] = 0;
        return table;
    }

    /*
     * kopiowanie fragmentu tablicy do innej tablicy
     * parametry:
     * src_table: tablica, z której kopiujemy
     * src_start: pierwszy kopiowany element
     * dest_table: tablica, do której kopiujemy
     * dest_start: indeks 1-wszego skopiowanego elementu
     * length: liczba kopiowanych elementów
     */
    arrayCopy(src_table, src_start, dest_table, dest_start, length) {
        for (var i = 0; i < length; i++) {
            dest_table[dest_start + i] = src_table[src_start + i];
        }

        return dest_table;
    }

    /* policz kod CRC */
    countCRC(bits) {
        var n = bits.length;
        var debug = '';
        var crc = new Array(this.keyLength);
        var temp = new Array(n + this.keyLength);
        this.initTable(temp);
        this.initTable(crc);
        temp = this.arrayCopy(bits, 0, temp, this.keyLength, n);
        var tklucz = new Array(this.keyLength + 1);
        for (var i = 0; i < this.keyLength + 1; i++) {
            debug += this.klucz & (1 << i) + '\n';
            if ((this.klucz & (1 << i)) == 0) tklucz[i] = 0; // ok
            else tklucz[i] = 1;
        }

        // liczenie CRC
        for (var start = n + this.keyLength - 1; start > this.keyLength - 1; start--) {
            if (temp[start] == 1) {
                for (var i = 0; i < this.keyLength + 1; i++) {
                    temp[start - i] = this.xor(temp[start - i], tklucz[this.keyLength - i]);
                }
            }
        }

        crc = this.arrayCopy(temp, 0, crc, 0, this.keyLength);

        return crc;
    }

    /* kodowanie */
    crc(random_data) {
        var n = random_data.length;
        var l = n + this.keyLength;
        var coded_data = new Array(l);
        var type = new Array(l);
        coded_data = this.initTable(coded_data);
        coded_data = this.arrayCopy(random_data, 0, coded_data, this.keyLength, n);
        var crc = this.countCRC(random_data);
        this.arrayCopy(crc, 0, coded_data, 0, this.keyLength);
        for (var i = 0; i < this.keyLength; i++) type[i] = 3;
        for (var i = this.keyLength; i < l; i++) type[i] = 0;
        viewCode(coded_data);
        return coded_data;
    }

    /* dekodowanie */
    decodeCRC(coded_data) {
        var l = coded_data.length;
        var n = l - this.keyLength;
        let dane = new Array(n);
        for (var i = 0; i < n; i++) dane[i] = coded_data[i + this.keyLength];
    }

    /* korekcja */
    fixCRC(coded_data) {
        let errors = 0;
        var l = coded_data.length;
        let type = new Array(l);
        var crc = this.countCRC(coded_data);
        var ok = true;
        for (var i = 0; i < this.keyLength && ok; i++) if (crc[i] != 0) ok = false;
        if (ok) {
            for (var i = 0; i < this.keyLength; i++) type[i] = 3;
            for (var i = this.keyLength; i < l; i++) type[i] = 0;
        }
        else {
            errors++;
            for (var i = 0; i < this.keyLength; i++) type[i] = 5;
            for (var i = this.keyLength; i < l; i++) type[i] = 2;
        }
        $('#bledyniewykryte').text(nZamienionych-errors)
        $('#bledyWykryteBity').text(errors)
    }

}
