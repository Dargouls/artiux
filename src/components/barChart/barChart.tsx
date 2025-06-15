'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BarChart({ ...props }: BarChartProps) {
	const dataBar = [
		{ name: 'Seg', valor: 12 },
		{ name: 'Ter', valor: 18 },
		{ name: 'Qua', valor: 32 },
		{ name: 'Qui', valor: 22 },
		{ name: 'Sex', valor: 27 },
	];
	return (
		<>
			{/* Bar Chart */}
			<div className='shadow-retro w-min min-w-64 rounded-md border-2 border-black bg-[#f1faee] p-4'>
				<h2 className='mb-2 font-mono text-sm text-gray-800'>Gráfico de Barras</h2>
				<div className='drop-shadow-[1px_1px_0_#333] filter'>
					<ResponsiveContainer width='100%' height={220}>
						<RechartsBarChart data={dataBar}>
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
								contentStyle={{ backgroundColor: '#f1faee', border: '2px solid #000', borderRadius: 0 }}
							/>
							<Bar dataKey='valor' fill='#E76F51' radius={[0, 0, 0, 0]} stroke='#000' strokeWidth={2} />
						</RechartsBarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
}
