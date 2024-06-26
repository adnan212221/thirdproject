import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs,
                  CategoryScale,
                LinearScale,
            PointElement,
        LineElement,
    Title,
Tooltip,
Legend } from 'chart.js';


Chartjs.register( CategoryScale,
    LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend

)

const Chart = ({arr = [], currency, days}) => {
  console.log(arr);

    const price = [];
    const date = [];
    const data = {};

    for (let i = 0; i < arr.length; i++) {
      if(days === '24h')
      date.push(new Date(arr[i][0]).toLocaleTimeString());
      else
      date.push(new Date(arr[i][0]).toLocaleDateString());
      price.push(arr[i][1]);

      
    }

    // console.log(date);

  return (
    
    <Line options={{responsive: true}} data={{labels: date,
                                              datasets: [
                                                {
                                                    label: `price in ${currency}`,
                                                    data : price,
                                                    borderColor: 'rbg(255,99,132)',
                                                    backgroundColor: 'rgba(255,99,132,0.5)'
                                                },
                                              ] }} />
  )
}

export default Chart