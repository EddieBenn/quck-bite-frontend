import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPopularFoods } from '../../slices/vendorPopularFoodsSlice';

export default function AccordionDash() {
    const dispatch = useAppDispatch();
    const { vendorPopularFoods, isLoading } = useAppSelector((state) => state.vendorPopularFood)

    console.log('accordian', vendorPopularFoods, isLoading)
    useEffect(() => {
        dispatch(getPopularFoods())
    }, [dispatch])
    // console.log('vendorPopularFoods', vendorPopularFoods)
    const popularFoods = vendorPopularFoods?.map((food) => food);
// const foodName = vendorPopularFoods?.map((item) => item.name)
// console.log('food ',foodName)
    return (
        <div>
            {popularFoods.length > 0 ? (
                popularFoods?.map((food, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography>{food.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {food.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography>No popular food with order count greater than 10 available.</Typography>
            )}
        </div>
    );
}
