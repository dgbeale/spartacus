import { Injectable } from '@angular/core';
import {
  B2BUser,
  B2BUserService,
  EntitiesModel,
  OrgUnitService,
} from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class UnitAssignRolesService extends BaseOrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.UNIT_ASSIGN_ROLES;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService,
    protected b2bUsersService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string,
    roleId: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.orgUnitService.getUsers(code, roleId, structure.pagination);
  }

  toggleAssign(
    customerId: string,
    userRoles: string[],
    role: string,
    assign = true
  ) {
    if (assign) {
      this.b2bUsersService.update(customerId, {
        roles: [...userRoles, role],
      });
    } else {
      this.b2bUsersService.update(customerId, {
        roles: userRoles.filter((r) => r !== role),
      });
    }
  }
}
