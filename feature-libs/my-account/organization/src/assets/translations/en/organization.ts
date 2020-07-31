import { costCenter, costCenterAssignBudgets } from './cost-center.i18n';
import {
  userGroup,
  userGroupAssignUsers,
  userGroupAssignPermissions,
} from './user-group.i18n';
import { permission } from './permission.i18n';

/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */
const breadcrumbs = {
  organization: 'Organization',
};

export const organization = {
  organization: {
    enabled: 'Enabled',
    disabled: 'Disabled',
    enable: 'Enable',
    disable: 'Disable',

    name: 'Name',
    code: 'Code',

    back: '',
    close: '',
    cancel: 'Cancel',

    create: 'Create {{name}}',
    edit: 'Edit details',
    save: 'Save {{name}}',

    manage: 'Manage',

    active: 'Active',
    status: 'Status',

    messages: {
      emptyList: 'The list is empty',
    },
  },

  // sub feature labels are added below
  breadcrumbs,
  costCenter,
  costCenterAssignBudgets,
  userGroup,
  userGroupAssignUsers,
  userGroupAssignPermissions,
  permission,
};
