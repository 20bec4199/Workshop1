
import React from 'react';
import ReactECharts from 'echarts-for-react';
// import echarts from 'echarts';


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
const CampusSelection = ({ onSelectCampus }) => {

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

      console.log(params.data.name);
    }
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '100%', width: '100%' }}
      onEvents={{
        click: onChartClick,
      }}
      theme='my_theme'
    />
  );
};

export default CampusSelection;








