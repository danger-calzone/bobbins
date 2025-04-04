/*
 * Dashboard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useAuth } from 'utils/useAuth';
import { createStructuredSelector } from 'reselect';

import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

import FormWrapper from './FormWrapper';

import { fetchUserRoles, onChange, registerUser, resetErrors } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectPassword,
  makeSelectRoles,
  makeSelectUsername,
} from './selectors';

const key = 'usersManagement';

const UsersManagement = ({
  dispatchCreateUser,
  dispatchFetchUserRoles,
  dispatchOnChange,
  dispatchResetErrors,
  password,
  roles,
  username,
}) => {
  console.log('IN CONTAINER', roles);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    dispatchFetchUserRoles();
  }, []);

  const isAuthenticated = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = React.useState('');

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleSelectChange = event => {
    setRole(event.target.value);
  };

  if (isAuthenticated) {
    return (
      <FormWrapper>
        <br />
        {/* {error && (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: '1rem' }}>
          {success}
        </Alert>
      )} */}
        <FormControl>
          <InputLabel htmlFor="filled-adornment-Username">Username</InputLabel>
          <OutlinedInput
            id="login-username"
            label="Username"
            onChange={e =>
              dispatchOnChange({ input: 'username', value: e.target.value })
            }
            onFocus={dispatchResetErrors}
            placeholder="required"
            value={username}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="filled-adornment-Password">Password</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="login-password"
            label="Password"
            onChange={e =>
              dispatchOnChange({ input: 'password', value: e.target.value })
            }
            onFocus={dispatchResetErrors}
            placeholder="required"
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleSelectChange}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>Artist</MenuItem>
            <MenuItem value={3}>User</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          loading={false}
          onClick={() =>
            dispatchCreateUser({
              password: 'test',
              role: 3,
              username: 'testUser1',
            })
          }
        >
          <span>Create User</span>
        </LoadingButton>
      </FormWrapper>
    );
  }

  return <>public view</>;
};

UsersManagement.propTypes = {
  dispatchCreateUser: PropTypes.func.isRequired,
  dispatchFetchUserRoles: PropTypes.func.isRequired,
  dispatchOnChange: PropTypes.func.isRequired,
  dispatchResetErrors: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  roles: makeSelectRoles(),
  username: makeSelectUsername(),
});

const mapDispatchToProps = dispatch => ({
  dispatchCreateUser: ({ password, role, username }) =>
    dispatch(registerUser({ password, role, username })),
  dispatchFetchUserRoles: () => dispatch(fetchUserRoles()),
  dispatchOnChange: ({ input, value }) => dispatch(onChange({ input, value })),
  dispatchResetErrors: () => dispatch(resetErrors()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UsersManagement);
