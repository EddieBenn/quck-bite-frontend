import { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPopularFoods } from '../slices/vendorPopularFoodsSlice';

export default function PieChart() {
    const dispatch = useAppDispatch();
    const { vendorPopularFoods, isLoading } = useAppSelector((state) => state.vendorPopularFood)
    useEffect(() => {
        dispatch(getPopularFoods())
    }, [dispatch])
    const popularFoods = vendorPopularFoods?.filter((food) => food.order_count !== undefined && food.order_count >= 1);
    const formatDataForChart = () => {
        const chartData = [
            ['Product', 'Popularity'],
            ...popularFoods.map((product) => [product.name, product.order_count]),
        ];
        return chartData;
    };

    const options = {
        title: 'Popular Foods',
        pieHole: 0.4,
        is3D: false,
        colors: ['#4285F4', '#0F9D58', '#F4B400', '#DB4437', '#9E69AF'],
    };

    return (
        <div>
            {popularFoods && popularFoods.length > 0 ? (
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="270px"
                    data={formatDataForChart()}
                    options={options}
                />
            ) : (
                <p>No popular products available.</p>
            )}
        </div>
    );
}
