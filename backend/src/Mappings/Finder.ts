export class FinderMappings {
  
  public joins = {
    benutzernamen: {
      join: 'LEFT JOIN `User` AS `Us1` ON LIKE("%" || `Us1`.`id` || "%", ALIAS.memberIds) OR `Us1`.`id` = ALIAS.userId',
      select: '("NAME_ID:" || `Us1`.`id` || "NAME_NAME:" || `Us1`.`name`)'
    },
    terminDaten: {
      join: 'LEFT JOIN `MeetingChoice` as `Me1` ON `Me1`.`finderId` = ALIAS.`id` ',
      select: '("NAME_DATE:" || `Me1`.`date` || "NAME_TIME:" || `Me1`.`time` || "NAME_ID:" || `Me1`.`id`)'
    },
    votes: {
      join: 'LEFT JOIN `Votes` as `Vo1` ON `Vo1`.`finderId` = ALIAS.`id` ',
      select: '("NAME_USERID:" || `Vo1`.`userId` || "NAME_TERMINID:" || `Vo1`.`terminId` || "NAME_STATUS:" || `Vo1`.`status`)'
    }
  }
}