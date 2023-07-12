import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { roleSelectList } from 'src/views/settings/settingsHelpers';
import { LoadingButton } from '@mui/lab';

const StatusList = [
  {
    label: 'Active',
    id: 1,
  },
  {
    label: 'Inactive',
    id: 0,
  },
];

const Filters = ({
  selectedRoleFilterValue,
  selectedStatusFilterValue,
  setSelectedRoleFilter,
  setSelectedRoleFilterValue,
  setSelectedStatusFilter,
  setSelectedStatusFilterValue,
  applyFilter,
  cancelFilter,
}) => {
  useEffect(() => {
    const getRoles = async () => await roleSelectList();
    getRoles();
  }, []);
  const roles = useSelector((state) => state.User.userRoles);
  const loader = useSelector((state) => state.User.loading);
  return (
    <Box
      component={'form'}
      display={'flex'}
      justifyContent={'space-between'}
      onSubmit={applyFilter}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              options={roles ?? []}
              value={selectedRoleFilterValue}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSelectedRoleFilterValue(newValue);
                  setSelectedRoleFilter(newValue.id);
                } else {
                  setSelectedRoleFilterValue(null);
                  setSelectedRoleFilter(null);
                }
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Roles" />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              options={StatusList}
              value={selectedStatusFilterValue}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSelectedStatusFilterValue(newValue);
                  setSelectedStatusFilter(newValue.id);
                } else {
                  setSelectedStatusFilterValue(null);
                  setSelectedStatusFilter(null);
                }
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ color: '#000000', mr: 1 }}
          onClick={cancelFilter}
          disabled={loader}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loader}
          loadingIndicator="Loading…"
          variant="contained"
          type="submit"
          onClick={applyFilter}
        >
          Apply Filter
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default memo(Filters);
