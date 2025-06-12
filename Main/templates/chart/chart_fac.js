fetch('/API/Report/Alumni/fac/')
    .then(response => response.json())
    .then(data => {
        Highcharts.chart('gra-faculdade', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total Alumni  Fakuldade'
            },
            xAxis: {
                categories: data.label,
                title: {
                    text: 'Fakuldade'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Alumni'
                }
            },
            series: [{
                name: 'Alumni',
                data: data.obj
            }]
        });
    });