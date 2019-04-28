import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export const IntensityGraph = ({ data }) => (
    <ResponsiveLine
        data={data}
        margin={{
            "top": 20,
            "right": 20,
            "bottom": 50,
            "left": 25
        }}
        xScale={{
            "type": "point"
        }}
        yScale={{
            "type": "linear",
            "stacked": false,
            "min": 0,
            "max": 350
        }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            "orient": "top",
            "tickSize": 0,
            "tickPadding": 0,
            "tickRotation": -90,
            "fontSize": 50
            // "legend": "Time",
            // "legendOffset": 70,
            // "legendPosition": "middle"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 1,
            "tickPadding": 5,
            "tickRotation": 0,
            // "legend": "Carbon Intensity",
            // "legendOffset": -40,
            // "legendColor": "gray",
            // "legendPosition": "middle"
        }}
        enableGridY={false}
        enableGridX={true}
        colors={'#61993b'}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "darkGray"
              },
              text: {
                fill: "gray"
              }
            }
          },
          grid: {
            line: {
              stroke: "#E0E0E0",
              strokeWidth: 0.5,
            }
          },
        }}
        lineWidth={0.5}
        enableDots={false}
        dotSize={10}
        dotColor={{
            "theme": "background"
        }}
        dotBorderWidth={2}
        dotBorderColor={{
            "from": "color"
        }}
        enableDotLabel={true}
        areaBaselineValue="0"
        dotLabel="y"
        dotLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.5}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)