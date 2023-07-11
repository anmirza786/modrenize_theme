import { Button, Grid, TextField } from '@mui/material';
import { memo } from 'react';

const Filters = () => {
  //   const cityListing = useSelector((state) => state.MasterData.cityListing);

  //   const handleFilterValues = (name, value) => {
  //     let cloneFilter = cloneDeep(filterValues);
  //     cloneFilter[name] = value ?? '';
  //     setFilterValues(cloneFilter);
  //   };

  return (
    <Grid container sx={{ marginBottom: '20px' }} spacing={1}>
      <Grid item xs={12} sm={4} lg={2.5}>
        <TextField
          fullWidth
          //   value={filterValues.town ? filterValues.town : ''}
          name="town"
          placeholder="Search Name"
          size="small"
          //   onChange={(e) => handleFilterValues('town', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2.5}>
        {/* <Autocomplete
          name="city"
          id="cities"
        //   options={cityListing}
          isOptionEqualToValue={(option, value) => option.name === value}
          value={filterValues.city?.name ? filterValues.city.name : null}
          getOptionLabel={(option) => (option.name ? option.name : option)}
          onChange={(e, value) => {
            handleFilterValues('city', value);
          }}
          size="small"
          renderInput={(params) => <TextField label="Select City" {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2.5}>
        <Autocomplete
          name="type"
          id="types"
          options={typeListing}
          isOptionEqualToValue={(option, value) => option === value}
          value={filterValues.type ? filterValues.type : null}
          getOptionLabel={(option) => option}
          onChange={(e, value) => {
            handleFilterValues('type', value);
          }}
          size="small"
          renderInput={(params) => <TextField label="Select Type" {...params} />}
        />*/}
      </Grid>
      <Grid item xs={12} lg={4.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ mx: 2 }}
          //   onClick={handleClearFilter}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          //   disabled={!activate}
          size="small"
          //   onClick={handleFilter}
        >
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(Filters);
