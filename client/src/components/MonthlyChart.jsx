import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const MonthlyChart = ({ data }) => {

    const chartData = data.map((item) => {

        const date = new Date(item.month);

        return {
            month: date.toLocaleString("en-US", {
                month: "short"
            }),
            total: Number(item.total)
        };

    });

    return (
        <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="total"
                    name="Expenses"
                    radius={[6, 6, 0, 0]}
                />

            </BarChart>

        </ResponsiveContainer>
    );
};

export default MonthlyChart;