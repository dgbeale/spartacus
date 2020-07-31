export const user = {
  header: 'Users',
  disabled: '(disabled)',
  uid: 'Code',
  name: 'Name',
  orgUnit: 'Parent Unit',
  roles: 'Roles',

  messages: {
    enabled:
      'When you disable the user, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled User.',
    deactivate: 'Are you sure you want to disable this user?',
    deactivateHeader: 'Disable User',
  },

  approver: {
    link: 'Approvers',
    header: 'Approvers in {{code}}',
    assign: 'Assign Approvers',
    assignHeader: 'Assign Approvers in {{code}}',
    back: 'Back',
    new: 'New approver',
    instructions: {
      check: "To assign an approver to this unit, select the user's check box.",
      uncheck: "To remove aa approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
  },

  userGroup: {
    link: 'User groups',
    header: 'User groups in {{code}}',
    assign: 'Assign user groups',
    assignHeader: 'Assign user groups in {{code}}',
  },

  permission: {
    link: 'Purchase limits',
    header: 'Purchase limits in {{code}}',
    assign: 'Assign purchase limits',
    assignHeader: 'Assign purchase limits in {{code}}',
    back: 'Back',
    instructions: {
      check:
        'To assign a purchase limits to this user group, select its check box.',
      uncheck: 'To unassign a purchase limits, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
    per: {
      undefined: '',
      MONTH: 'per Month',
      YEAR: 'per Year',
      WEEK: 'per Week',
      QUARTER: 'per Quarter',
    },
  },
};

export const userAssignApprovers = {
  name: 'Name',
  email: 'Email',
  roles: 'Roles',
  orgUnit: 'Unit',
};

export const userAssignPermissions = {
  name: 'Code',
  limit: 'Limit',
  orgUnit: 'Unit',
};

export const userAssignUserGroups = {
  name: 'Code',
  orgUnit: 'Unit',
};
