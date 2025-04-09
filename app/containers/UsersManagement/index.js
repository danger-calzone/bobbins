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
import capitalize from 'lodash/capitalize';

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

import AsyncRender from '../../components/AsyncRender';
import FormWrapper from './FormWrapper';

import { fetchUserRoles, onChange, registerUser, resetErrors } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectPassword,
  makeSelectRoles,
  makeSelectStatus,
  makeSelectSuccessMessage,
  makeSelectUsername,
} from './selectors';

const key = 'usersManagement';

const UsersManagement = ({
  dispatchCreateUser,
  dispatchFetchUserRoles,
  dispatchOnChange,
  dispatchResetErrors,
  error,
  errorMessage,
  password,
  roles,
  status,
  successMessage,
  username,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    dispatchFetchUserRoles();
  }, []);

  const isAuthenticated = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = React.useState('');

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleSelectChange = event => {
    setSelectedRole(event.target.value);
  };

  const hasBannerError = status === 'rejected' && errorMessage;
  const hasBannerSuccess = status === 'resolved' && successMessage;

  if (isAuthenticated) {
    return (
      <AsyncRender
        Component={
          <FormWrapper>
            <br />
            {hasBannerError && (
              <Alert severity="error" sx={{ marginBottom: '1rem' }}>
                {errorMessage}
              </Alert>
            )}
            {hasBannerSuccess && (
              <Alert severity="success" sx={{ marginBottom: '1rem' }}>
                {successMessage}
              </Alert>
            )}
            <FormControl>
              <InputLabel htmlFor="filled-adornment-Username">
                Username
              </InputLabel>
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
              <InputLabel htmlFor="filled-adornment-Password">
                Password
              </InputLabel>
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
                value={selectedRole}
                label="Role"
                onChange={handleSelectChange}
              >
                {roles.map(({ id, role }) => (
                  <MenuItem value={id}>{capitalize(role)}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <LoadingButton
              loading={false}
              onClick={() =>
                dispatchCreateUser({
                  password,
                  role: selectedRole,
                  username,
                })
              }
            >
              <span>Create User</span>
            </LoadingButton>
          </FormWrapper>
        }
        error={error}
        isError={!!error}
        isLoading={status === 'loading' || status === 'idle'}
      />
    );
  }

  return <>public view</>;
};

UsersManagement.propTypes = {
  dispatchCreateUser: PropTypes.func.isRequired,
  dispatchFetchUserRoles: PropTypes.func.isRequired,
  dispatchOnChange: PropTypes.func.isRequired,
  dispatchResetErrors: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  password: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  errorMessage: makeSelectErrorMessage(),
  password: makeSelectPassword(),
  roles: makeSelectRoles(),
  status: makeSelectStatus(),
  successMessage: makeSelectSuccessMessage(),
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
