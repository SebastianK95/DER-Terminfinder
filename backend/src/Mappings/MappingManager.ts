import { FinderMappings } from '../Mappings/Finder';
import { GroupMappings } from '../Mappings/Group';
import { MeetingChoiceMappings } from '../Mappings/MeetingChoice';
import { SessionMappings } from '../Mappings/Session';
import { TokenMappings } from '../Mappings/Token';
import { UserMappings } from '../Mappings/User';
import { VotesMappings } from '../Mappings/Votes';

export class MappingManager {
  
  public static mappings = {
    'Finder': FinderMappings,
    'Group': GroupMappings,
    'MeetingChoice': MeetingChoiceMappings,
    'Session': SessionMappings,
    'Token': TokenMappings,
    'User': UserMappings,
    'Votes': VotesMappings
  };
  
  public static getMappings(table) {
    var tableConfig = new this.mappings[table]();
    return (typeof tableConfig !== 'undefined' && typeof tableConfig.joins !== 'undefined') ?
      tableConfig.joins : false;
  }
}