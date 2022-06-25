/* eslint-disable react-func/max-lines-per-function */
import { useMemo } from 'react';

import { Action, AsyncThunkAction } from '@reduxjs/toolkit';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';

import { ToastStatus, useToast } from 'src/components/dls/Toast/Toast';
import { addOrUpdateUserPreference } from 'src/utils/auth/api';
import { isLoggedIn } from 'src/utils/auth/login';
import PreferenceGroup from 'types/auth/PreferenceGroup';

type ActionOrThunkAction = Action | AsyncThunkAction<any, any, any>;
type Value = string | number | boolean | Record<string, any>;

type Actions = {
  onSettingsChangeWithoutDispatch: (
    key: string,
    value: Value,
    preferenceGroup: PreferenceGroup,
    callback: () => void,
  ) => void;
  onSettingsChange: (
    key: string,
    value: Value,
    action: ActionOrThunkAction,
    undoAction: ActionOrThunkAction,
    preferenceGroup: PreferenceGroup,
    successCallback?: () => void,
  ) => void;
};

/**
 * A hook that will be used to:
 * 1. If the user is logged in, we persist settings
 * to the DB then dispatch the redux action that
 * would apply the changes locally (and might also persist
 * it locally in the localStorage depending on the slice)
 * 2. If not, just dispatch the action.
 *
 * @returns {Record<string, any>}
 */
const usePersistPreferenceGroup = (): Actions => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation('common');

  const actions = useMemo(
    () => ({
      onSettingsChangeWithoutDispatch: (
        key: string,
        value: string | number | boolean | Record<string, any>,
        preferenceGroup: PreferenceGroup,
        callback: () => void,
      ) => {
        if (isLoggedIn()) {
          addOrUpdateUserPreference(key, value, preferenceGroup).then(() => {
            callback();
          });
        } else {
          callback();
        }
      },
      onSettingsChange: (
        key: string,
        value: string | number | boolean | Record<string, any>,
        action: ActionOrThunkAction,
        undoAction: ActionOrThunkAction,
        preferenceGroup: PreferenceGroup,
        successCallback?: () => void,
      ) => {
        if (isLoggedIn()) {
          // 1. dispatch the action first
          dispatch(action);
          addOrUpdateUserPreference(key, value, preferenceGroup)
            .then(() => {
              if (successCallback) {
                successCallback();
              }
            })
            .catch(() => {
              toast(t('error.pref-persist-fail'), {
                status: ToastStatus.Warning,
                actions: [
                  {
                    text: t('undo'),
                    primary: true,
                    onClick: () => {
                      dispatch(undoAction);
                    },
                  },
                  {
                    text: t('continue'),
                    primary: false,
                    onClick: () => {
                      if (successCallback) {
                        successCallback();
                      }
                    },
                  },
                ],
              });
            });
        } else {
          dispatch(action);
        }
      },
    }),
    [dispatch, t, toast],
  );

  return actions;
};

export default usePersistPreferenceGroup;