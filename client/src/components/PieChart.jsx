import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const PieChart = ({ data }) => {

    const chartData = data.map((item) => ({
        ...item,
        total: Number(item.total)
    }));

    const COLORS = [
        "#0f766e",
        "#facc15",
        "#fb923c",
        "#60a5fa"
    ];

    return (
        <RechartsPieChart width={300} height={250}>

            <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={55}
            >

                {chartData.map((entry, index) => (
                    <Cell
                        key={entry.category}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}

            </Pie>

            <Tooltip />
            <Legend />

        </RechartsPieChart>
    );
};

export default PieChart;