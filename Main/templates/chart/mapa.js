fetch('/API/Report/Alumni/mun/')
    .then(response => response.json())
    .then(result => {
        const labelToCode = {
            "AILEU": "tl-al",
            "AINARO": "tl-an",
            "BAUCAU": "tl-bc",
            "BOBONARO": "tl-bb",
            "COVALIMA": "tl-cl",
            "ATAURO": "tl-at",
            "DILI": "tl-dl",
            "ERMERA": "tl-er",
            "LIQUISA": "tl-lq",
            "MANATUTO": "tl-mt",
            "MANUFAHI": "tl-mf",
            "OE-CUSSE": "tl-am",
            "LAUTEM": "tl-bt",
            "VIQUEQUE": "tl-vq"
        };
        const data = result.label.map((label, i) => [labelToCode[label], result.obj[i]]);
        Highcharts.mapChart('container-map', {
            chart: { map: 'countries/tl/tl-all' },
            title: { text: 'Total Dadus Alumni Kada Munisipiu' },
            mapNavigation: { enabled: true, buttonOptions: { verticalAlign: 'bottom' } },
            colorAxis: { min: 0 },
            series: [{
                data: data,
                name: 'Total Alumni',
                states: { hover: { color: '#BADA55' } },
                dataLabels: { enabled: true, format: '{point.name}' },
                tooltip: { pointFormatter: function() { return `<b>${this.name}</b><br/>Total Alumni: ${this.value}`; } }
            }]
        });
    })
