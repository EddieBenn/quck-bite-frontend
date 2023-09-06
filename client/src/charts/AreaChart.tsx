import { Chart } from "react-google-charts";
import { getEarningRevenue } from "../slices/earningRevSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";

export const options = {
    title: "Vendor Performance",
    curveType: "function",
    legend: { position: "bottom" },
};

export default function AreaChart() {
    const dispatch = useAppDispatch();
    const { earningRevenue, isLoading } = useAppSelector((state) => state.earningRev)

    console.log('aracChart', earningRevenue)
    useEffect(() => {
        dispatch(getEarningRevenue())
    }, [dispatch])
   // console.log("earnings value ", earningRevenue)

    const earnings = earningRevenue?.map((item) =>
        [`${1}`, item.earnings, item.revenue]
    )

   // console.log('earnings', earnings)

    const data = [
        ["Days", "Earnings", "Revenue"],
        ...earnings,
        ["2", 1170, 460],
        ["3", 660, 1120],
        ["4", 1030, 540],
    ];

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
}
