'use client';

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LineChart({ ...props }: LineChartProps) {
	const dataLine = [
		{ name: 'Jan', value: 30 },
		{ name: 'Feb', value: 45 },
		{ name: 'Mar', value: 32 },
		{ name: 'Apr', value: 70 },
		{ name: 'May', value: 55 },
	];

	return (
		<>
			{/* Line Chart */}
			<div className='shadow-retro relative w-min min-w-64 rounded-md border-2 border-black bg-[#fffaf0] p-4'>
				<div className='absolute -top-1 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-black bg-red-600 shadow-[2px_2px_0_#333]' />

				<h2 className='mb-2 font-mono text-sm text-gray-800'>Gráfico de Linha</h2>
				<div className='drop-shadow-[1px_1px_0_#333] filter'>
					<ResponsiveContainer width='100%' height={220}>
						<RechartsLineChart data={dataLine}>
							<XAxis
								dataKey='name'
								axisLine={{ stroke: '#000', strokeWidth: 2 }}
								tickLine={{ stroke: '#000', strokeWidth: 2 }}
								tick={{ fontSize: 12, fill: '#000', fontFamily: 'monospace' }}
							/>
							<YAxis
								axisLine={{ stroke: '#000', strokeWidth: 2 }}
								tickLine={{ stroke: '#000', strokeWidth: 2 }}
								tick={{ fontSize: 12, fill: '#000', fontFamily: 'monospace' }}
							/>
							<Tooltip
								wrapperStyle={{ border: '2px solid #000', borderRadius: 0 }}
								contentStyle={{ backgroundColor: '#fffaf0', border: '2px solid #000', borderRadius: 0 }}
							/>
							<Line
								type='linear'
								dataKey='value'
								stroke='#264653'
								strokeWidth={3}
								dot={{
									r: 4,
									stroke: '#000',
									strokeWidth: 2,
									fill: '#E9C46A',
								}}
							/>
						</RechartsLineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
}
