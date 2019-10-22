export class GroupMappings {
  
  public joins = {
    benutzernamen: {
      join: 'LEFT JOIN `User` AS `Us1` ON LIKE("%" || `Us1`.`id` || "%", ALIAS.memberIds) OR `Us1`.`id` = ALIAS.userId',
      select: '("NAME_ID:" || `Us1`.`id` || "NAME_NAME:" || `Us1`.`name`)'
    },
    finderNames: {
      join: 'LEFT JOIN `Finder` AS `Fi1` ON LIKE("%" || `Fi1`.`id` || "%", ALIAS.`finderIds`)',
      select: '("NAME_NAME:" || `Fi1`.`name` || "NAME_ID:" || `Fi1`.`id`)'
    }
  }
}