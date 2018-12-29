import { userConstants } from '../api/auth/constants';

export function failureAlertHide() {
  return { type: userConstants.HIDE_FAILURE_MESSAGE };
}