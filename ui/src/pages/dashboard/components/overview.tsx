import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

// Updated data to represent Weekly downloads of Revit families
const data = [
  {
    name: 'W1',
    downloads: 14,
  },
  {
    name: 'W2',
    downloads: 8,
  },
  {
    name: 'W3',
    downloads: 17,
  },
  {
    name: 'W4',
    downloads: 8,
  },
  {
    name: 'W5',
    downloads: 16,
  },
  {
    name: 'W6',
    downloads: 11,
  },
  {
    name: 'W7',
    downloads: 7,
  },
  {
    name: 'W8',
    downloads: 12,
  }
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '6px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}
          cursor={{ opacity: 0.5 }}
          formatter={(value) => [`${value} downloads`, 'Downloads']}
        />
        <Bar
          dataKey='downloads'
          fill='#000000'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
