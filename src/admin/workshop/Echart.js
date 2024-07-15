import { useState } from "react";
import ReactECharts from 'echarts-for-react';
import { Design } from '../../layout/design';
import WorkshopDetails from "./WorkshopDetails";


const campuses = [
  {
    name: 'KTR',
    value: 2,
  },
  {
    name: 'RMP',
    value: 2,
  },
  {
    name: 'VDP',
    value: 2,
  },
  {
    name: 'NCR',
    value: 2,
  },
  {
    name: 'TPJ',
    value: 2,
  },
];

const data = {
  name: 'Campuses',
  children: campuses,
};

export const Echart = () => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const options = {
    color: ['#0e7490', '#0e7490', '#0e7490', '#0e7490', '#0e7490'],
    series: {
      type: 'sunburst',
      data: [data],
      radius: [0, '90%'],
      label: {
        rotate: 'radial',
      },
    },
  };

  const onChartClick = (params) => {
    if (params.data && params.data.name) {
      setSelectedCampus(params.data.name);
      console.log(params.data.name);
    }
  };

  return <Design>
    {selectedCampus ? <WorkshopDetails selectedCampus={selectedCampus} setSelectedCampus={setSelectedCampus} /> :
      <div className='flex justify-center items-center h-screen mx-auto '>

        <ReactECharts
          option={options}
          style={{ height: '80%', width: '70%' }}
          onEvents={{
            click: onChartClick,
          }}
          theme='my_theme'
        />
      </div>
    }
  </Design>
}
