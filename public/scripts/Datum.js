function Datum(date) {

    var myDate = date;

    this.toDateString = function () {
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return (new Intl.DateTimeFormat('de-DE', options)).format(myDate);
    }

    this.fromDateString = function (dateString) {
        var regEx = /(\d{2})\.(\d{2})\.(\d{4})/;
        var dateElements = regEx.exec(dateString);
        myDate = new Date(
            (+dateElements[3]),
            (+dateElements[2]) - 1,// Vorsicht, Monat startet bei 0!
            (+dateElements[1]));
        return this;
    }

    this.dateString = function (newDateString) {
        if (newDateString)
            this.fromDateString(newDateString);
        return this.toDateString();
    }

    this.date = function (newDate) {
        if (newDate)
            myDate = newDate;
        return myDate;
    }
}

