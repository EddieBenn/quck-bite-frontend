import { Chart } from "react-google-charts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getGeoProfile } from '../slices/geoProfileSlice';
import { useEffect } from 'react';

export default function GeoChart() {
    const dispatch = useAppDispatch();

    const { vendorProfile, isLoading } = useAppSelector((state) => state.geoProfile);

    useEffect(() => {
        dispatch(getGeoProfile());
    }, [dispatch]);

    // console.log('vendor', vendorProfile)
    const vendorInfoAvailable:any = vendorProfile?.map((a)=>a.cover_image);
    return (
        // <Chart
        //     chartEvents={[
        //         {
        //             eventName: "select",
        //             callback: ({ chartWrapper }) => {
        //                 const chart = chartWrapper.getChart();
        //                 const selection = chart.getSelection();
        //                 if (selection.length === 0) return;
        //             },
        //         },
        //     ]}
        //     chartType="GeoChart"
        //     width="100%"
        //     height="300px"
        //     data={data}
        // />

        <>
            <h2>Vendor Cover Image</h2>
            <img src={vendorInfoAvailable} alt="" />
        </>
    );
}
