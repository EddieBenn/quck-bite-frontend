/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Logout from './Logout';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "#141414",
    '&.Mui-selected': {
        color: "#0c828f",
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#30c1d1',
    },
}));

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function List() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <StyledTab label="Profile" {...a11yProps(0)} />
                    <StyledTab label="Change Password" {...a11yProps(1)} />
                    <StyledTab label="Logout" {...a11yProps(2)} />
                </StyledTabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Profile />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ChangePassword />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Logout />
            </CustomTabPanel>
        </Box>
    );
}