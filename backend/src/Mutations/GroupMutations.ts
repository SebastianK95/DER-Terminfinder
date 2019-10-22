import {GraphQLBoolean, GraphQLID, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {GeneralRepository} from '../Repository/Repositories';

const generalRepository = new GeneralRepository(DB);

export const GroupMutations = {
    addMembers: {
        type: GraphQLBoolean,
        description: 'This Endpoint add some users to a given group and the finders.',
        args: {
          memberIds: {type: GraphQLString},
          groupId: {type: GraphQLID}
        },
        resolve(request, args) {
            var groupData, i, userToAddList, userToAdd = '', updateValue = '', finderData, finderMembers, groupMembers, j, update;
            
            groupData = generalRepository.dynamicSelect(
              'Group',
              ['id', 'memberIds', 'userId', 'finderIds'],
              {
                operator: 'OR',
                id: args.groupId
              }
            );
            groupData.then(function(data) {
              data.forEach(function(item) {
                groupMembers = (item.memberIds.indexOf(',') > -1) ? item.memberIds.split(',') : [item.memberIds];
                userToAddList = (args.memberIds.indexOf(',') > -1) ? args.memberIds.split(',') : [args.memberIds];
                
                // Pruefe, ob die neuen User noch nicht als Mitglied oder Admin existieren.
                for(j = 0; j < userToAddList.length; j++) {
                  if((groupMembers.indexOf(userToAddList[j]) <= -1) && parseInt(userToAddList[j], 10) !== item.userId) {
                    userToAdd+= (userToAdd !== '' ? ',' : '') + userToAddList[j];
                  }
                }
                
                // Updatestring erstellen
                updateValue = groupMembers.filter(function(item) {
                  return (typeof item !== 'undefined' && item !== '')
                }).join(',');
                updateValue+= (updateValue !== '' ? ',' : '') + userToAdd;
                
                // Gruppe aktualisieren
                update = generalRepository.dynamicUpdate(
                  'Group',
                  {
                    memberIds: updateValue
                  }, {
                    id: args.groupId
                  }
                );
                
                /**
                 * Alle Finder aktualisieren zu denen die Gruppenmitglieder zugeordnet sind.
                 */
                update.then(function() {
                    if(item.finderIds !== null) {
                      finderData = generalRepository.dynamicSelect(
                        'Finder',
                        ['id', 'memberIds', 'userId'],
                        {
                          operator: 'OR',
                          id: item.finderIds
                        }
                      );
                      finderData.then(function(data) {
                        data.forEach(function(item) {
                          finderMembers = (item.memberIds.indexOf(',') > -1) ? item.memberIds.split(',') : [item.memberIds];
                          userToAddList = (updateValue.indexOf(',') > -1) ? updateValue.split(',') : [updateValue];
                          userToAdd = '';
                          
                          // Pruefe, ob die neuen User noch nicht als Mitglied oder Admin existieren.
                          for(j = 0; j < userToAddList.length; j++) {
                            if((finderMembers.indexOf(userToAddList[j]) <= -1) && parseInt(userToAddList[j], 10) !== item.userId) {
                              userToAdd+= (userToAdd !== '' ? ',' : '') + userToAddList[j];
                            }
                          }
                        
                          // Updatestring erstellen 
                          updateValue = finderMembers.filter(function(item) {
                            return (typeof item !== 'undefined' && item !== '');
                          }).join(',');
                          updateValue+= (updateValue !== '' ? ',' : '') + userToAdd;
                          
                          update = generalRepository.dynamicUpdate(
                            'Finder',
                            {
                              memberIds: updateValue
                            }, {
                              id: item.id
                            }
                          );
                        });
                      });
                    }
                });
              });
            });
        }
    },
    deleteMembers: {
        type: GraphQLBoolean,
        description: 'This Endpoint removes from given group, but the user is still in his references',
        args: {
          userRemoveId: {type: GraphQLID},
          groupId: {type: GraphQLID}
        },
        resolve(request, args) {
            var groupData, i, updateValue = '', finderData, finderMembers, groupMembers, j, update;
            
            groupData = generalRepository.dynamicSelect(
              'Group',
              ['id', 'memberIds', 'userId', 'finderIds'],
              {
                operator: 'OR',
                id: args.groupId
              }
            );
            groupData.then(function(data) {
              data.forEach(function(item) {
                groupMembers = (item.memberIds.indexOf(',') > -1) ? item.memberIds.split(',') : [item.memberIds];
                
                // Pruefe, ob die neuen User noch nicht als Mitglied oder Admin existieren.
                for(j = 0; j < groupMembers.length; j++) {
                  if(groupMembers[j] !== (args.userRemoveId).toString()) {
                    updateValue+= (updateValue !== '' ? ',' : '') + groupMembers[j];
                  }
                }
                
                // Gruppe aktualisieren
                update = generalRepository.dynamicUpdate(
                  'Group',
                  {
                    memberIds: updateValue
                  }, {
                    id: args.groupId
                  }
                );
              });
            });
        }
    },
    addToFinder: {
      type: GraphQLBoolean,
        description: 'This Endpoint add users from a group to a finder.',
        args: {
          groupId: {type: GraphQLID},
          finderId: {type: GraphQLID}
        },
        resolve(request, args) {
          var groupData, i, updateValue = '', finderData, finderMembers, groupMembers = '', j, update, groupMembersList = [], userToAdd = '', finderIds;
            
          groupData = generalRepository.dynamicSelect(
            'Group',
            ['id', 'memberIds', 'userId', 'finderIds'],
            {
              operator: 'OR',
              id: args.groupId
            }
          );
          groupData.then(function(data) {
            if(data.length > 0) {
              if(data[0].finderIds !== null) {
                finderIds = data[0].finderIds;
                var tmp  = (data[0].finderIds.indexOf(',') > -1) ? data[0].finderIds.split(',') : [data[0].finderIds];
                if(tmp.indexOf(args.finderId) <= -1) {
                    finderIds = (finderIds.indexOf(',') > -1 ? ',' : '') + args.finderId;
                }
              } else {
                finderIds = (args.finderId).toString();
              }
              if(data[0].memberIds !== null) {
                groupMembers+= data[0].memberIds;
              }
              groupMembers+= (groupMembers !== '' ? ',' : '') + data[0].userId;
              finderData = generalRepository.dynamicSelect(
                'Finder',
                ['id', 'memberIds', 'userId'],
                {
                  operator: 'OR',
                  id: args.finderId
                }
              );
              finderData.then(function(data) {
                if(data.length > 0) {
                    groupMembersList = (groupMembers.indexOf(',') > -1) ? groupMembers.split(',') : [groupMembers];
                    
                    if(data[0].memberIds !== null) {
                        finderMembers = (data[0].memberIds.indexOf(',') > -1) ? data[0].memberIds.split(',') : [data[0].memberIds];
                        for(j = 0; j < groupMembersList.length; j++) {
                          if((finderMembers.indexOf(groupMembersList[j]) <= -1) && parseInt(groupMembersList[j], 10) !== data[0].userId) {
                            userToAdd+= (userToAdd !== '' ? ',' : '') + groupMembersList[j];
                          }
                        }
                        updateValue = finderMembers.filter(function(item) {
                            return (typeof item !== 'undefined' && item !== '')
                        }).join(',');
                    } else {
                        for(j = 0; j < groupMembersList.length; j++) {
                          if(parseInt(groupMembersList[j], 10) !== data[0].userId) {
                            userToAdd+= (userToAdd !== '' ? ',' : '') + groupMembersList[j];
                          }
                        }
                    }
                    updateValue+= (updateValue !== '' ? ',' : '') + userToAdd;
                    
                    update = generalRepository.dynamicUpdate(
                      'Finder',
                      {
                        memberIds: updateValue
                      }, {
                        id: args.finderId
                      }
                    );
                    update.then(function() {
                      
                      update = generalRepository.dynamicUpdate(
                        'Group',
                        {
                          finderIds: finderIds
                        }, {
                          id: args.groupId
                        }
                      );
                    });
                }
              });
            }
          });
        }
    },
    removeFromFinder: {
      type: GraphQLBoolean,
        description: 'This Endpoint remove users from a group from a finder.',
        args: {
          groupId: {type: GraphQLID},
          finderId: {type: GraphQLID}
        },
        resolve(request, args) {
          var groupData, i, updateValue = '', finderData, finderMembers, groupMembers = '', j, update, groupMembersList = [], userToAdd = '', finderIds = '';
            
          groupData = generalRepository.dynamicSelect(
            'Group',
            ['id', 'memberIds', 'userId', 'finderIds'],
            {
              operator: 'OR',
              id: args.groupId
            }
          );
          groupData.then(function(data) {
            if(data.length > 0) {
              if(data[0].finderIds !== null) {
                var tmp  = (data[0].finderIds.indexOf(',') > -1) ? data[0].finderIds.split(',') : [data[0].finderIds];
                for(i = 0; i < tmp.length; i++) {
                    if(tmp[i] !== (args.finderId).toString()) {
                        finderIds+= (finderIds.indexOf(',') > -1 ? ',' : '') + tmp[i];
                    }
                }
              }
              if(data[0].memberIds !== null) {
                groupMembers+= data[0].memberIds;
              }
              finderData = generalRepository.dynamicSelect(
                'Finder',
                ['id', 'memberIds', 'userId'],
                {
                  operator: 'OR',
                  id: args.finderId
                }
              );
              finderData.then(function(data) {
                if(data.length > 0) {
                    groupMembersList = (groupMembers.indexOf(',') > -1) ? groupMembers.split(',') : [groupMembers];
                    
                    if(data[0].memberIds !== null) {
                        finderMembers = (data[0].memberIds.indexOf(',') > -1) ? data[0].memberIds.split(',') : [data[0].memberIds];
                        for(j = 0; j < finderMembers.length; j++) {
                          if(groupMembersList.indexOf(finderMembers[j]) <= -1) {
                            updateValue+= (updateValue !== '' ? ',' : '') + finderMembers[j];
                          }
                        }
                    }
                    update = generalRepository.dynamicUpdate(
                      'Finder',
                      {
                        memberIds: updateValue
                      }, {
                        id: args.finderId
                      }
                    );
                    update.then(function() {
                      
                      update = generalRepository.dynamicUpdate(
                        'Group',
                        {
                          finderIds: finderIds
                        }, {
                          id: args.groupId
                        }
                      );
                    });
                }
              });
            }
          });
        }
    }
    
};